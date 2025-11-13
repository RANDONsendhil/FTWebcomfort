/**
 * Service/Configuration class for Mode Affichage component
 * This acts as a configuration provider and service layer
 */

import { 
	applyDarkMode,
	applyHighContrastMode,
	applySoftenMode,
	applyNormalMode
} from "./structure";

export type ScreenDisplayMode = 'normal' | 'darkMode' | 'modeHighContrast' | 'modeSoften';

export class FTModeAffichageService {
	private container?: HTMLElement;
	private currentMode: ScreenDisplayMode = 'normal';
 
	private normalBtn: HTMLInputElement | null = null;
	private darkModeBtn: HTMLInputElement | null = null;
	private modeHighContrastBtn: HTMLInputElement | null = null;
	private modeSoftenBtn: HTMLInputElement | null = null;

	constructor(container?: HTMLElement) {
		this.container = container;
		if (container) {
			this.initializeControls();
		}
	}

	private initializeControls(): void {
		if (!this.container) return;
		
		this.normalBtn = this.container.querySelector('#normalBtn');
		this.darkModeBtn = this.container.querySelector('#darkModeBtn');
		this.modeHighContrastBtn = this.container.querySelector('#modeHighContrastBtn');
		this.modeSoftenBtn = this.container.querySelector('#modeSoftenBtn');
	}

	public setupEventListeners(
		onModeChange: (mode: ScreenDisplayMode) => void
	): void {
		this.normalBtn?.addEventListener('change', () => onModeChange('normal'));
		this.darkModeBtn?.addEventListener('change', () => onModeChange('darkMode'));
		this.modeHighContrastBtn?.addEventListener('change', () => onModeChange('modeHighContrast'));
		this.modeSoftenBtn?.addEventListener('change', () => onModeChange('modeSoften'));
	}

	public getContainer(): HTMLElement | null {
		return this.container || null;
	}

	public getCurrentMode(): ScreenDisplayMode {
		return this.currentMode;
	}

	public handleModeChange(mode: ScreenDisplayMode, isActive: boolean): void {
		if (!isActive) return;
		
		this.currentMode = mode;
		
		// Apply the selected display mode
		switch (mode) {
			case 'normal':
				applyNormalMode();
				break;
			case 'darkMode':
				applyDarkMode();
				break;
			case 'modeHighContrast':
				applyHighContrastMode();
				break;
			case 'modeSoften':
				applySoftenMode();
				break;
		}
	}

	public disableAllModes(): void {
		applyNormalMode();
	}
}





