/**
 * Service/Configuration class for Loupe component
 * This acts as a configuration provider and service layer
 */

import { enableLoupe, disableLoupe, createLens, applyPageZoom, removeLens, removePageZoom } from "./structure";

export type LoupeMode = 'zoom' | 'lens';

export class FTLoupeService {
	private container?: HTMLElement;
	private currentMode: LoupeMode = 'zoom';
	private zoomButton: HTMLButtonElement | null = null;
	private lensButton: HTMLButtonElement | null = null;
	private zoomSlider: HTMLInputElement | null = null;
	private zoomDisplay: HTMLElement | null = null;

	constructor(container?: HTMLElement) {
		this.container = container;
		if (container) {
			this.initializeControls();
		}
	}

	private initializeControls(): void {
		if (!this.container) return;
		
		this.zoomButton = this.container.querySelector('#zoomButton');
		this.lensButton = this.container.querySelector('#lensButton');
		this.zoomSlider = this.container.querySelector('#zoomSlider');
		this.zoomDisplay = this.container.querySelector('#zoomDisplay');
	}

	public setupEventListeners(
		onModeChange: (mode: LoupeMode) => void,
		onZoomChange: (value: string) => void
	): void {
		this.zoomButton?.addEventListener('click', () => onModeChange('zoom'));
		this.lensButton?.addEventListener('click', () => onModeChange('lens'));
		this.zoomSlider?.addEventListener('input', (e) => onZoomChange((e.target as HTMLInputElement).value));
	}

	public handleModeChange(mode: LoupeMode, isActive: boolean): void {
		if (!isActive) return;
		
		// If switching modes, first disable the current mode
		if (this.currentMode !== mode) {
			if (this.currentMode === 'zoom') {
				this.disableZoom();
			} else {
				this.disableLens();
			}
		}
		
		this.currentMode = mode;
		
		// Toggle button active state
		this.zoomButton?.classList.toggle('active', mode === 'zoom');
		this.lensButton?.classList.toggle('active', mode === 'lens');
		
		// Update slider range based on mode
		if (this.zoomSlider) {
			if (mode === 'zoom') {
				this.zoomSlider.min = '1';
				this.zoomSlider.max = '5';
				this.zoomSlider.step = '0.1';
				this.zoomSlider.value = '1.5';
			} else {
				this.zoomSlider.min = '1.5';
				this.zoomSlider.max = '4';
				this.zoomSlider.step = '0.1';
				this.zoomSlider.value = '2';
			}
		}
		
		// Apply the mode with current slider value
		this.handleZoomChange(this.zoomSlider?.value || '1.5', isActive);
	}

	public handleZoomChange(value: string, isActive: boolean): void {
		if (!isActive) return;
		
		const zoomValue = parseFloat(value);
		
		// Update display
		if (this.zoomDisplay) {
			this.zoomDisplay.textContent = `${zoomValue.toFixed(1)}x`;
		}
		
		// Apply zoom based on current mode
		if (this.currentMode === 'zoom') {
			this.applyZoom(value);
		} else {
			this.applyLens(value);
		}
	}

	public getCurrentMode(): LoupeMode {
		return this.currentMode;
	}

	public getSliderValue(): string {
		return this.zoomSlider?.value || '1.5';
	}

	public enableLoupe(): void {
		enableLoupe();
	}

	public disableLoupe(): void {
		disableLoupe();
	}

	public disableZoom(): void {
		removePageZoom();
	}

	public disableLens(): void {
		removeLens();
	}

	public getContainer(): HTMLElement | null {
		return this.container || null;
	}

	public applyZoom(range: string): void {
		const zoomLevel = parseFloat(range) || 1.5;
		applyPageZoom(zoomLevel);
	}

	public applyLens(range: string): void {
		const zoomLevel = parseFloat(range) || 2;
		createLens(zoomLevel);
	}
}




