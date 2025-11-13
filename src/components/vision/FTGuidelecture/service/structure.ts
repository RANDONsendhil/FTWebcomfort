/**
 * Guide structure and utility functions
 */
export class GuideStructure {
	private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

	constructor(private container?: HTMLElement) {}

	/** Get the target document */
	getDoc(): Document {
		return this.container?.ownerDocument || document;
	}

	/** Color conversion utilities */
	rgbToHex(r: number, g: number, b: number): string {
		return `#${[r, g, b].map(v => v.toString(16).padStart(2, '0')).join('')}`;
	}

	hexToRgb(hex: string): { r: number; g: number; b: number } {
		const h = hex.replace('#', '');
		const [r, g, b] = h.length === 3
			? h.split('').map(x => parseInt(x + x, 16))
			: [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16));
		return { r, g, b };
	}

	/** Extract guide properties from DOM element */
	extractGuideProperties(guide: HTMLElement | null): { color: string; opacity: number; size: string } {
		if (!guide) return { color: '#162252ff', opacity: 0.7, size: '3' };

		let colorSource: HTMLElement = guide;
		let sizeValue = '3';
		
		// For grayscale guide, get color from overlay children
		if (guide.className === 'ft-reading-guide-grayscale') {
			const overlay = guide.children[0] as HTMLElement;
			if (overlay) {
				colorSource = overlay;
			}
			// For grayscale, size is reading area height
			const readingArea = guide.querySelector('.ft-reading-area') as HTMLElement;
			sizeValue = readingArea?.style.height?.replace('px', '') || '20';
		} else {
			// For simple guide, size is height
			sizeValue = guide.style.height?.replace('px', '') || '3';
		}

		const colorMatch = colorSource.style.backgroundColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
		const opacityMatch = colorSource.style.backgroundColor.match(/rgba\(\d+,\s*\d+,\s*\d+,\s*([\d.]+)\)/);
		
		return {
			color: colorMatch ? this.rgbToHex(+colorMatch[1], +colorMatch[2], +colorMatch[3]) : '#3a3a3a',
			opacity: opacityMatch ? parseFloat(opacityMatch[1]) : 0.7,
			size: sizeValue
		};
	}

	/** Detect guide type from DOM element */
	detectGuideType(guideElement: HTMLElement | null | undefined): 'ligne' | 'focus' | 'invert' {
		if (!guideElement) return 'ligne';
		
		if (guideElement.className === 'ft-reading-guide-grayscale') {
			return 'focus';
		} else if (guideElement.className === 'ft-reading-guide-invert') {
			return 'invert';
		} else {
			return 'ligne';
		}
	}

	/** Remove any existing guide */
	removeGuide(): void {
		const guide = this.getDoc().getElementById('ft-reading-guide');
		if (guide) guide.remove();
		if (this.mouseMoveHandler) {
			this.getDoc().removeEventListener('mousemove', this.mouseMoveHandler);
			this.mouseMoveHandler = null;
		}
	}

	/** Create guide DOM elements */
	createGuideElement(
		mode: 'ligne' | 'focus' | 'invert',
		options: { r: number; g: number; b: number; opacity: number; size: string }
	): void {
		this.removeGuide();
		const doc = this.getDoc();
		const { r, g, b, opacity, size } = options;

		if (mode === 'invert') {
			const guide = doc.createElement('div');
			Object.assign(guide, { id: 'ft-reading-guide', className: 'ft-reading-guide-invert' });
			Object.assign(guide.style, {
				position: 'fixed',
				left: '0',
				right: '0',
				height: `${size}px`,
				backgroundColor: `rgba(${r},${g},${b},${opacity})`,
				filter: 'invert(1)',
				mixBlendMode: 'difference',
				top: '50%',
				pointerEvents: 'none',
				zIndex: '9999'
			});
			doc.body.appendChild(guide);
			this.setupMouseTracking('ligne', guide);
			return;
		}

		if (mode === 'ligne') {
			const guide = doc.createElement('div');
			Object.assign(guide, { id: 'ft-reading-guide', className: 'ft-reading-guide' });
			Object.assign(guide.style, {
				position: 'fixed',
				left: '0',
				right: '0',
				width: '100%',
				height: `${size}px`,
				backgroundColor: `rgba(${r},${g},${b},${opacity})`,
				zIndex: '9999',
				pointerEvents: 'none',
				top: '50%'
			});
			doc.body.appendChild(guide);
			this.setupMouseTracking('ligne', guide);
			return;
		}

		// focus (grayscale) mode
		const container = doc.createElement('div');
		container.id = 'ft-reading-guide';
		container.className = 'ft-reading-guide-grayscale';

		const overlayStyle = {
			position: 'fixed',
			left: '0',
			right: '0',
			backgroundColor: `rgba(${r},${g},${b},${opacity})`,
			zIndex: '9998',
			pointerEvents: 'none'
		};

		const top = doc.createElement('div');
		const bottom = doc.createElement('div');
		Object.assign(top.style, overlayStyle, { top: '0' });
		Object.assign(bottom.style, overlayStyle, { bottom: '0' });

		container.append(top, bottom);
		doc.body.appendChild(container);
		this.setupMouseTracking('focus', container, top, bottom, parseInt(size) * 2);
	}

	/** Setup mouse tracking for guide movement */
	private setupMouseTracking(
		mode: 'ligne' | 'focus',
		guide: HTMLElement,
		top?: HTMLElement,
		bottom?: HTMLElement,
		areaHeight = 40
	): void {
		const doc = this.getDoc();
		this.mouseMoveHandler = (e: MouseEvent) => {
			if (mode === 'ligne') {
				guide.style.top = `${e.clientY}px`;
			} else if (mode === 'focus' && top && bottom) {
				const mid = e.clientY;
				const half = areaHeight / 2;
				top.style.height = `${Math.max(0, mid - half)}px`;
				bottom.style.height = `${Math.max(0, window.innerHeight - mid - half)}px`;
			}
		};
		doc.addEventListener('mousemove', this.mouseMoveHandler);
	}
}
