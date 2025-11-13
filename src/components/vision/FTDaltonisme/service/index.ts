/**
 * Service/Configuration class for Text Personalization component
 * This acts as a configuration provider and service layer
 */

import { 
	disableAnimations, 
	enableAnimations,
	applyDarkMode,
	applyColorBlindMode,
	applyReduceBlueMode,
	applyHighContrastMode,
	applySoftenMode,
	applyNormalMode
} from "./structure";

export type ScreenDisplayMode = 'normal' | 'darkMode' | 'coulorBlindess' | 'reducerColorBlueBtn' |'modeHighContrast' | 'modeSoften';

export class FTModeAffichageService {
	private container?: HTMLElement;
	private currentMode: ScreenDisplayMode = 'normal';
 
	private normalBtn: HTMLInputElement | null = null;
	private darkModeBtn: HTMLInputElement | null = null;
	private colorBlindessBtn: HTMLInputElement | null = null;
	private reducerColorBlueBtn: HTMLInputElement | null = null;
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
		this.colorBlindessBtn = this.container.querySelector('#colorBlindessBtn');
		this.reducerColorBlueBtn = this.container.querySelector('#reducerColorBlueBtn');
		this.modeHighContrastBtn = this.container.querySelector('#modeHighContrastBtn');
		this.modeSoftenBtn = this.container.querySelector('#modeSoftenBtn');
	}

	public setupEventListeners(
		onModeChange: (mode: ScreenDisplayMode) => void
	): void {
		this.normalBtn?.addEventListener('change', () => onModeChange('normal'));
		this.darkModeBtn?.addEventListener('change', () => onModeChange('darkMode'));
		this.colorBlindessBtn?.addEventListener('change', () => onModeChange('coulorBlindess'));
		this.reducerColorBlueBtn?.addEventListener('change', () => onModeChange('reducerColorBlueBtn'));
		this.modeHighContrastBtn?.addEventListener('change', () => onModeChange('modeHighContrast'));
		this.modeSoftenBtn?.addEventListener('change', () => onModeChange('modeSoften'));
	}

	public enableAnimations(): void {

		enableAnimations()
	}

	public disableAnimations(): void {

		disableAnimations()
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
			case 'coulorBlindess':
				applyColorBlindMode();
				break;
			case 'reducerColorBlueBtn':
				applyReduceBlueMode();
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





