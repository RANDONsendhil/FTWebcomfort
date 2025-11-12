import { GuideStructure } from "./structure";

export class FTGuideReaderService {
	private structure: GuideStructure;

	constructor(container?: HTMLElement) {
		this.structure = new GuideStructure(container);
	}

	/** Extracts guide properties (color, opacity, size) */
	private getGuideProperties(guide: HTMLElement | null) {
		return this.structure.extractGuideProperties(guide);
	}

	private hexToRgb(hex: string): { r: number; g: number; b: number } {
		return this.structure.hexToRgb(hex);
	}

	/** Detects the type of guide from the existing guide element */
	private detectGuideType(guideElement: HTMLElement | null | undefined): "ligne" | "focus" | "invert" {
		return this.structure.detectGuideType(guideElement);
	}

	/** Centralized guide creation */
	private createGuide(mode: "ligne" | "focus" | "invert", opts: { size?: string; opacity?: string; color?: string }) {
		const { r, g, b } = this.hexToRgb(opts.color || (mode === "focus" ? "#808080" : "#3a3a3a"));
		const opacity = parseFloat(opts.opacity || "0.7");
		const size = opts.size || (mode === "focus" ? "20" : "3");

		this.structure.createGuideElement(mode, { r, g, b, opacity, size });
	}

	// ---- Public methods ---- //

	public enableGuideReader(
		type: "ligne" | "focus" | "invert",
		element: HTMLElement,
		uiElements?: {
			colorPicker: HTMLInputElement | null;
			colorPreview: HTMLElement | null;
			sizeSlider: HTMLInputElement | null;
			sizeDisplay: HTMLElement | null;
			opacitySlider: HTMLInputElement | null;
			opacityDisplay: HTMLElement | null;
		}
	): void {
		// Default colors based on type
		const defaultColor = type === "focus" ? "#808080" : "#3a3a3a";
		const defaultSize = type === "focus" ? "20" : "3";
		const defaultOpacity = "0.7";

		this.createGuide(type, {
			color: defaultColor,
			size: defaultSize,
			opacity: defaultOpacity,
		});

		// Sync UI elements with default values
		if (uiElements) {
			if (uiElements.colorPicker) {
				uiElements.colorPicker.value = defaultColor;
			}
			if (uiElements.colorPreview) {
				uiElements.colorPreview.style.backgroundColor = defaultColor;
			}
			if (uiElements.sizeSlider) {
				uiElements.sizeSlider.value = defaultSize;
			}
			if (uiElements.sizeDisplay) {
				uiElements.sizeDisplay.textContent = `${defaultSize}px`;
			}
			if (uiElements.opacitySlider) {
				uiElements.opacitySlider.value = defaultOpacity;
			}
			if (uiElements.opacityDisplay) {
				uiElements.opacityDisplay.textContent = `${Math.round(parseFloat(defaultOpacity) * 100)}%`;
			}
		}
	}

	public disableGuideReader(): void {
		this.structure.removeGuide();
	}

	public updateGuide(
		type: "ligne" | "focus" | "invert",
		element: HTMLElement,
		updates: Partial<{ size: string; opacity: string; color: string }>
	): void {
		const existing = element.ownerDocument?.getElementById("ft-reading-guide") as HTMLElement | null;
		const current = this.getGuideProperties(existing);
		this.createGuide(type, {
			size: updates.size || current.size,
			opacity: updates.opacity || current.opacity.toString(),
			color: updates.color || current.color,
		});
	}

	// --- Legacy-compatible wrappers for existing UI code ---

	public handleGuideTypeChange(
		type: "ligne" | "focus",
		element: HTMLElement,
		options: {
			isActive: boolean;
			sizeSlider: HTMLInputElement | null;
			sizeDisplay: HTMLElement | null;
			ligneButton: HTMLButtonElement | null;
			focusButton: HTMLButtonElement | null;
		}
	): void {
		const { isActive, sizeSlider, sizeDisplay, ligneButton, focusButton } = options;

		// Toggle active button classes
		ligneButton?.classList.toggle("active", type === "ligne");
		focusButton?.classList.toggle("active", type === "focus");

		// Update slider min/defaults
		if (sizeSlider) {
			const min = type === "ligne" ? 1 : 10;
			const def = type === "ligne" ? 3 : 20;
			sizeSlider.min = String(min);
			if (+sizeSlider.value < min) sizeSlider.value = String(def);
			sizeDisplay && (sizeDisplay.textContent = `${sizeSlider.value}px`);
		}

		// If active, re-render guide with updated size
		if (isActive) {
			this.updateGuide(type, element, { size: sizeSlider?.value });
		}
	}

	public handleColorChange(color: string, element: HTMLElement, colorPreview: HTMLElement | null): void {
		const existing = element.ownerDocument?.getElementById("ft-reading-guide");
		const currentType = this.detectGuideType(existing);
		this.updateGuide(currentType, element, { color });
		if (colorPreview) colorPreview.style.backgroundColor = color;
	}

	public handleSizeChange(size: string, element: HTMLElement, sizeDisplay: HTMLElement | null): void {
		const existing = element.ownerDocument?.getElementById("ft-reading-guide");
		const currentType = this.detectGuideType(existing);
		this.updateGuide(currentType, element, { size });
		if (sizeDisplay) sizeDisplay.textContent = `${size}px`;
	}

	public handleOpacityChange(opacity: string, element: HTMLElement, opacityDisplay: HTMLElement | null): void {
		const existing = element.ownerDocument?.getElementById("ft-reading-guide");
		const currentType = this.detectGuideType(existing);
		this.updateGuide(currentType, element, { opacity });
		if (opacityDisplay) {
			opacityDisplay.textContent = `${Math.round(+opacity * 100)}%`;
		}
	}
}
