/**
 * Service/Configuration class for Text Personalization component
 * This acts as a configuration provider and service layer
 */



export class FTGuideReaderService {

	private container?: HTMLElement;

	constructor(container?: HTMLElement) {
		this.container = container;
	}

	public getContainer(): HTMLElement | null {
		return this.container || null;
	}

	/**
	 * Enables the reading guide functionality
	 * @param value The type of guide reader to enable: 'simple', 'grayscale', or 'invert'
	 */
	public enableGuideReader(value: string, element: HTMLElement ): void {
		console.log("ENABLE enableGuideReader with value:", value);
		this.updateGuideReaderParams(value, element);
		// Remove any existing guide first
		this.removeExistingGuide();
		
		
	}

	public updateGuideReaderParams(value: string, element: HTMLElement): void {
		 
		
		// switch (value) {
		// 	case 'simple':
		// 		this.simpleGuideReader();
		// 		break;
			
		// 	case 'grayscale':
		// 		this.grayScaleGuideReader();
		// 		break;
			
		// 	case 'invert':
		// 		this.invertColorsGuideReader();
		// 		break;
		
		// 	default:
		// 		console.warn(`Unknown guide reader type: ${value}. Defaulting to simple guide.`);
		// 		this.simpleGuideReader();
		// 		break;
		// }
	}



	
	public updateRulerGuideReader(value: string, element: HTMLElement): void {
		console.log("Updating ruler type to:", value);
		
		// Find existing guide to extract current settings
		const existingGuide = element.ownerDocument?.getElementById('ft-reading-guide');
		let currentSize = '3';
		let currentOpacity = '0.7';
		let currentColor: string | undefined = undefined;
		
		if (existingGuide) {
			// Extract current settings only if staying in the same mode
			if (existingGuide.className === 'ft-reading-guide-grayscale' && value === 'focus') {
				const topOverlay = existingGuide.children[0] as HTMLElement;
				if (topOverlay) {
					const rgb = this.extractRgbFromGuide(topOverlay);
					currentColor = this.rgbToHex(rgb.r, rgb.g, rgb.b);
					currentOpacity = this.extractOpacityFromGrayscale(existingGuide).toString();
				}
				// For grayscale, size is the reading area height
				const readingArea = existingGuide.querySelector('.ft-reading-area') as HTMLElement;
				if (readingArea) {
					currentSize = readingArea.style.height?.replace('px', '') || '50';
				}
			} else if (existingGuide.className === 'ft-reading-guide' && value === 'ligne') {
				// For simple guide
				const rgb = this.extractRgbFromGuide(existingGuide);
				currentColor = this.rgbToHex(rgb.r, rgb.g, rgb.b);
				currentOpacity = this.extractOpacityFromSimple(existingGuide).toString();
				currentSize = this.extractThicknessFromGuide(existingGuide);
			} else {
				// Switching modes - extract only size and opacity, let color use default
				currentOpacity = existingGuide.className === 'ft-reading-guide-grayscale' 
					? this.extractOpacityFromGrayscale(existingGuide).toString()
					: this.extractOpacityFromSimple(existingGuide).toString();
					
				if (existingGuide.className === 'ft-reading-guide-grayscale') {
					const readingArea = existingGuide.querySelector('.ft-reading-area') as HTMLElement;
					if (readingArea) {
						currentSize = readingArea.style.height?.replace('px', '') || '50';
					}
				} else {
					currentSize = this.extractThicknessFromGuide(existingGuide);
				}
			}
		}
		
		if (value === 'ligne') {
			// Use current settings for line guide (default red if no color)
			this.simpleGuideReader(currentSize, currentOpacity, currentColor);
		} else if (value === 'focus') {
			// Use current settings for grayscale guide (default gray if no color)
			this.grayScaleGuideReader(currentSize, currentOpacity, currentColor);
		} else {
			console.warn(`Unknown ruler type: ${value}`);
		}
	}

	public updateRulerGuideReaderWithSize(value: string, element: HTMLElement, size: string): void {
		console.log("Updating ruler type to:", value, "with size:", size);
		
		// Find existing guide to extract current settings
		const existingGuide = element.ownerDocument?.getElementById('ft-reading-guide');
		let currentOpacity = '0.7';
		let currentColor: string | undefined = undefined;
		
		if (existingGuide) {
			// Extract opacity and color if staying in same mode
			if (existingGuide.className === 'ft-reading-guide-grayscale' && value === 'focus') {
				const topOverlay = existingGuide.children[0] as HTMLElement;
				if (topOverlay) {
					const rgb = this.extractRgbFromGuide(topOverlay);
					currentColor = this.rgbToHex(rgb.r, rgb.g, rgb.b);
					currentOpacity = this.extractOpacityFromGrayscale(existingGuide).toString();
				}
			} else if (existingGuide.className === 'ft-reading-guide' && value === 'ligne') {
				const rgb = this.extractRgbFromGuide(existingGuide);
				currentColor = this.rgbToHex(rgb.r, rgb.g, rgb.b);
				currentOpacity = this.extractOpacityFromSimple(existingGuide).toString();
			} else {
				// Switching modes - extract only opacity, let color use default
				currentOpacity = existingGuide.className === 'ft-reading-guide-grayscale' 
					? this.extractOpacityFromGrayscale(existingGuide).toString()
					: this.extractOpacityFromSimple(existingGuide).toString();
			}
		}
		
		if (value === 'ligne') {
			// Use provided size for line guide (default red if no color)
			this.simpleGuideReader(size, currentOpacity, currentColor);
		} else if (value === 'focus') {
			// Use provided size for grayscale guide (default gray if no color)
			this.grayScaleGuideReader(size, currentOpacity, currentColor);
		} else {
			console.warn(`Unknown ruler type: ${value}`);
		}
	}

	public updatedRulerColorGuideReader(color: string, element: HTMLElement): void {
		console.log("Updating ruler color to:", color);
		
		// Find existing guide within the provided element's document context
		const existingGuide = element.ownerDocument?.getElementById('ft-reading-guide');
		if (existingGuide) {
			// Convert hex color to RGB values
			const rgb = this.hexToRgb(color);
			if (!rgb) {
				console.warn("Invalid color format:", color);
				return;
			}
			
			// Check if it's a grayscale guide (has child overlays)
			if (existingGuide.className === 'ft-reading-guide-grayscale') {
				const topOverlay = existingGuide.children[0] as HTMLElement;
				const bottomOverlay = existingGuide.children[1] as HTMLElement;
				if (topOverlay && bottomOverlay) {
					// Extract current opacity from grayscale overlays
					const currentOpacity = this.extractOpacityFromGrayscale(existingGuide);
					topOverlay.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentOpacity})`;
					bottomOverlay.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentOpacity})`;
				}
			} else if (existingGuide.className === 'ft-reading-guide-invert') {
				// For inverted guide, update the background color but keep invert filter
				const currentOpacity = this.extractOpacityFromSimple(existingGuide);
				existingGuide.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentOpacity})`;
			} else {
				// For simple guide, update the background color and box shadow
				const currentOpacity = this.extractOpacityFromSimple(existingGuide);
				const currentHeight = existingGuide.style.height.replace('px', '') || '3';
				
				existingGuide.style.backgroundColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentOpacity})`;
				existingGuide.style.boxShadow = `0 0 ${Math.max(2, parseInt(currentHeight) / 2)}px rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${currentOpacity * 0.8})`;
			}
			
			console.log("Updated existing guide color to:", color);
		} else {
			// Create new guide if none exists with the specified color
			this.simpleGuideReaderWithColor(color);
		}
	}

	public updateRulerOpacityGuideReader(opacity: string, element: HTMLElement): void {
		console.log("Updating ruler opacity to:", opacity);
		
		// Find existing guide within the provided element's document context
		const existingGuide = element.ownerDocument?.getElementById('ft-reading-guide');
		if (existingGuide) {
			// Update only the opacity of existing guide
			const opacityValue = parseFloat(opacity);
			
			// Check if it's a grayscale guide (has child overlays)
			if (existingGuide.className === 'ft-reading-guide-grayscale') {
				const topOverlay = existingGuide.children[0] as HTMLElement;
				const bottomOverlay = existingGuide.children[1] as HTMLElement;
				if (topOverlay && bottomOverlay) {
					// Extract current RGB color and only change opacity
					const currentColor = this.extractRgbFromGuide(topOverlay);
					topOverlay.style.backgroundColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${opacityValue})`;
					bottomOverlay.style.backgroundColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${opacityValue})`;
				}
			} else if (existingGuide.className === 'ft-reading-guide-invert') {
				// For inverted guide, update the background opacity while preserving color
				const currentColor = this.extractRgbFromGuide(existingGuide);
				existingGuide.style.backgroundColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${opacityValue})`;
			} else {
				// For simple guide, update the background color and box shadow opacity while preserving color
				const currentColor = this.extractRgbFromGuide(existingGuide);
				existingGuide.style.backgroundColor = `rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${opacityValue})`;
				const currentHeight = existingGuide.style.height.replace('px', '');
				existingGuide.style.boxShadow = `0 0 ${Math.max(2, parseInt(currentHeight) / 2)}px rgba(${currentColor.r}, ${currentColor.g}, ${currentColor.b}, ${opacityValue})`;
			}
			
			console.log("Updated existing guide opacity to:", opacity);
		} else {
			// Create new guide if none exists with the specified opacity
			this.simpleGuideReader(undefined, opacity);
		}
	}

	public updateRulerThicknessGuideReader(width: string, element: HTMLElement): void {
		console.log("Updating ruler thickness to:", width + 'px');
		
		// Find existing guide within the provided element's document context
		const existingGuide = element.ownerDocument?.getElementById('ft-reading-guide');
		if (existingGuide) {
			// Check if it's a grayscale guide
			if (existingGuide.className === 'ft-reading-guide-grayscale') {
				// For grayscale guide, we need to recreate it with new reading area height
				const currentOpacity = this.extractOpacityFromGrayscale(existingGuide);
				this.grayScaleGuideReader(width, currentOpacity.toString());
			} else {
				// For simple guide, update only the thickness
				existingGuide.style.height = width + 'px';
				existingGuide.style.boxShadow = `0 0 ${Math.max(2, parseInt(width) / 2)}px rgba(255, 0, 0, 0.5)`;
			}
			console.log("Updated existing guide thickness to:", width + 'px');
		} else {
			// Create new guide if none exists
			this.simpleGuideReader(width);
		}
	}

	/**
	 * Extracts opacity value from existing grayscale guide
	 */
	private extractOpacityFromGrayscale(guideContainer: HTMLElement): number {
		if (guideContainer.children.length > 0) {
			const overlay = guideContainer.children[0] as HTMLElement;
			const bgColor = overlay.style.backgroundColor;
			const match = bgColor.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
			return match ? parseFloat(match[1]) : 0.7;
		}
		return 0.7; // Default opacity
	}

	/**
	 * Extracts opacity value from existing simple guide
	 */
	private extractOpacityFromSimple(guide: HTMLElement): number {
		const bgColor = guide.style.backgroundColor;
		const match = bgColor.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
		return match ? parseFloat(match[1]) : 0.7;
	}

	/**
	 * Extracts RGB color values from existing guide
	 */
	private extractRgbFromGuide(element: HTMLElement): { r: number; g: number; b: number } {
		const bgColor = element.style.backgroundColor;
		const match = bgColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
		if (match) {
			return {
				r: parseInt(match[1]),
				g: parseInt(match[2]),
				b: parseInt(match[3])
			};
		}
		// Default to red if no color found
		return { r: 255, g: 0, b: 0 };
	}

	/**
	 * Extracts thickness/height from existing guide
	 */
	private extractThicknessFromGuide(guide: HTMLElement): string {
		const height = guide.style.height;
		return height ? height.replace('px', '') : '3';
	}

	/**
	 * Converts RGB to hex color
	 */
	private rgbToHex(r: number, g: number, b: number): string {
		return '#' + [r, g, b].map(x => {
			const hex = x.toString(16);
			return hex.length === 1 ? '0' + hex : hex;
		}).join('');
	}

	/**
	 * Converts hex color to RGB values
	 */
	private hexToRgb(hex: string): { r: number; g: number; b: number } | null {
		// Remove # if present
		hex = hex.replace('#', '');
		
		// Handle 3-digit hex codes
		if (hex.length === 3) {
			hex = hex.split('').map(char => char + char).join('');
		}
		
		if (hex.length !== 6) {
			return null;
		}
		
		const r = parseInt(hex.substring(0, 2), 16);
		const g = parseInt(hex.substring(2, 4), 16);
		const b = parseInt(hex.substring(4, 6), 16);
		
		return { r, g, b };
	}

	/**
	 * Creates a simple guide reader with custom color
	 */
	private simpleGuideReaderWithColor(color: string): void {
		const rgb = this.hexToRgb(color);
		if (!rgb) {
			console.warn("Invalid color, using default red");
			this.simpleGuideReader();
			return;
		}
		
		const doc = this.container?.ownerDocument || document;
		
		// Remove any existing guide
		this.removeExistingGuide(doc);

		// Create the reading guide element
		const guide = doc.createElement('div');
		guide.id = 'ft-reading-guide';
		guide.className = 'ft-reading-guide';
		
		// Apply styles for the reading guide with custom color
		Object.assign(guide.style, {
			position: 'fixed',
			left: '0',
			right: '0',
			width: '100%',
			height: '3px', // Default thickness
			backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.7)`,
			zIndex: '9999',
			pointerEvents: 'none',
			top: '50%'
		});

		// Add the guide to the body
		doc.body.appendChild(guide);

		// Track mouse movement to update guide position
		this.addMouseTracking(guide, doc);
		
		console.log("Simple reading guide activated with color:", color);
	}

	 
	/**
	 * Disables the reading guide functionality
	 */
	public disableGuideReader(): void {
		console.log("DISABLE disableGuideReader");
		this.removeExistingGuide();
	}

	/**
	 * Creates a simple reading guide that highlights the current line being read
	 * The guide follows the mouse cursor or can be positioned manually
	 */
	public simpleGuideReader(rulerSize?: string, opacity?: string, color?: string): void {
		const thickness = rulerSize || '3'; // Default to 3px if no size provided
		const opacityValue = opacity ? parseFloat(opacity) : 0.7; // Default opacity 0.7
		const rgb = color ? this.hexToRgb(color) : { r: 255, g: 0, b: 0 }; // Default to red
		const doc = this.container?.ownerDocument || document;
		
		if (!rgb) {
			console.warn("Invalid color format, using default red");
		}
		
		const colorRgb = rgb || { r: 255, g: 0, b: 0 };
		console.log("Creating simple guide with thickness:", thickness + 'px', "opacity:", opacityValue, "and color:", color || "red");
		
		// Remove any existing guide
		this.removeExistingGuide(doc);

		// Create the reading guide element
		const guide = doc.createElement('div');
		guide.id = 'ft-reading-guide';
		guide.className = 'ft-reading-guide';
		
		// Apply styles for the reading guide with exclusion for FTWebcomfort interface
		Object.assign(guide.style, {
			position: 'fixed',
			left: '0',
			right: '0',
			width: '100%', // Full width horizontally
			height: thickness + 'px', // Apply the ruler size to height (thickness)
			backgroundColor: `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${opacityValue})`,
			zIndex: '9999',
			pointerEvents: 'none',
			top: '50%',
			clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
		});

		// Apply CSS to exclude container-ftwebconfomt elements
		// Add the guide to the body
		doc.body.appendChild(guide);

		// Track mouse movement to update guide position
		this.addMouseTracking(guide, doc);
		
		console.log("Simple reading guide activated with thickness:", thickness + 'px', "opacity:", opacityValue, "and color:", color || "red");
	}

	/**
	 * Creates a grayscale reading guide that dims everything except the current line
	 */
	public grayScaleGuideReader(rulerSize?: string, opacity?: string, color?: string): void {
		const readingAreaHeight = rulerSize ? parseInt(rulerSize) * 2 : 25; // Default reading area height
		const opacityValue = opacity ? parseFloat(opacity) : 0.7; // Default opacity 0.7
		const rgb = color ? this.hexToRgb(color) : { r: 128, g: 128, b: 128 }; // Default to gray
		const doc = this.container?.ownerDocument || document;
		
		if (!rgb) {
			console.warn("Invalid color format, using default gray");
		}
		
		const colorRgb = rgb || { r: 128, g: 128, b: 128 };
		console.log("Creating grayscale guide with reading area height:", readingAreaHeight + 'px', "opacity:", opacityValue, "and color:", color || "gray");
		
		// Remove any existing guide
		this.removeExistingGuide(doc);

		// Create overlay elements for top and bottom parts
		const topOverlay = doc.createElement('div');
		const bottomOverlay = doc.createElement('div');
		const guideContainer = doc.createElement('div');
		
		guideContainer.id = 'ft-reading-guide';
		guideContainer.className = 'ft-reading-guide-grayscale';
		
		// Style the overlays with configurable opacity and color
		const overlayStyle = {
			position: 'fixed',
			left: '0',
			right: '0',
			backgroundColor: `rgba(${colorRgb.r}, ${colorRgb.g}, ${colorRgb.b}, ${opacityValue})`,
			zIndex: '9998',
			pointerEvents: 'none',
			transition: 'height 0.1s ease-out'
		};
		
		Object.assign(topOverlay.style, overlayStyle, { top: '0' });
		Object.assign(bottomOverlay.style, overlayStyle, { bottom: '0' });
		
		guideContainer.appendChild(topOverlay);
		guideContainer.appendChild(bottomOverlay);
		doc.body.appendChild(guideContainer);

		// Track mouse movement for grayscale guide with configurable reading area
		this.addGrayscaleTracking(topOverlay, bottomOverlay, readingAreaHeight, doc);
		
		console.log("Grayscale reading guide activated with reading area:", readingAreaHeight + 'px', "opacity:", opacityValue, "and color:", color || "gray");
	}

	/**
	 * Creates an inverted colors reading guide
	 */
	public invertColorsGuideReader(): void {
		const doc = this.container?.ownerDocument || document;
		
		// Remove any existing guide
		this.removeExistingGuide(doc);

		// Create the reading guide with inverted colors
		const guide = doc.createElement('div');
		guide.id = 'ft-reading-guide';
		guide.className = 'ft-reading-guide-invert';
		
		// Apply styles for the inverted guide
		Object.assign(guide.style, {
			position: 'fixed',
			left: '0',
			right: '0',
			height: '25px',
			backgroundColor: 'rgba(0, 0, 0, 0.9)',
			zIndex: '9999',
			pointerEvents: 'none',
			transition: 'top 0.1s ease-out',
			filter: 'invert(1)',
			mixBlendMode: 'difference',
			top: '50%'
		});

		doc.body.appendChild(guide);
		this.addMouseTracking(guide, doc);
		
		console.log("Inverted colors reading guide activated");
	}

	/**
	 * Removes any existing reading guide from the page
	 */
	private removeExistingGuide(documentContext?: Document): void {
		const doc = documentContext || (this.container?.ownerDocument || document);
		const existingGuide = doc.getElementById('ft-reading-guide');
		if (existingGuide) {
			existingGuide.remove();
		}
		
		// Also remove any existing event listeners
		this.removeMouseTracking();
	}

	/**
	 * Adds mouse tracking to update the reading guide position
	 */
	private addMouseTracking(guide: HTMLElement, documentContext?: Document): void {
		const doc = documentContext || document;
		
		this.mouseMoveHandler = (event: MouseEvent) => {
			// Position the guide horizontally at the mouse cursor's Y position
			guide.style.top = `${event.clientY}px`;
		};

		doc.addEventListener('mousemove', this.mouseMoveHandler);
	}

	/**
	 * Adds mouse tracking for grayscale overlays
	 */
	private addGrayscaleTracking(topOverlay: HTMLElement, bottomOverlay: HTMLElement, readingAreaHeight?: number, documentContext?: Document): void {
		const guideHeight = readingAreaHeight || 25; // Height of the reading area
		const doc = documentContext || document;
		
		this.mouseMoveHandler = (event: MouseEvent) => {
			const mouseY = event.clientY;
			const halfGuide = guideHeight / 2;
			
			// Update top overlay to cover everything above the reading line
			topOverlay.style.height = `${Math.max(0, mouseY - halfGuide)}px`;
			
			// Update bottom overlay to cover everything below the reading line
			bottomOverlay.style.height = `${Math.max(0, window.innerHeight - mouseY - halfGuide)}px`;
		};

		doc.addEventListener('mousemove', this.mouseMoveHandler);
	}

	/**
	 * Removes mouse tracking event listeners
	 */
	private removeMouseTracking(): void {
		if (this.mouseMoveHandler) {
			document.removeEventListener('mousemove', this.mouseMoveHandler);
			this.mouseMoveHandler = null;
		}
	}

	private mouseMoveHandler: ((event: MouseEvent) => void) | null = null;

}




