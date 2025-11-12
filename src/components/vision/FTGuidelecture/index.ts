import { template } from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { FTGuideReaderService } from "./service/index";

/** Configuration for the Guide Lecture component */
export class FTGuideLectureConfig {
	readonly name = "Guide de lecture";
	active = false;
	readonly description = "Guide lecture pour une meilleure lisibilité.";
	readonly template = template;
}

/** Guide Lecture component extending the base component */
export class FTGuideLecture extends FTWebconfortBaseComponent<FTGuideLectureConfig> {
	private readonly ftGuideReaderService: FTGuideReaderService;
	private guideLigneButton: HTMLButtonElement | null = null;
	private guideFocusButton: HTMLButtonElement | null = null;
	private guideColorPicker: HTMLInputElement | null = null;
	private colorPreview: HTMLElement | null = null;
	private guideSizeSlider: HTMLInputElement | null = null;
	private sizeValueDisplay: HTMLElement | null = null;
	private guideOpacitySlider: HTMLInputElement | null = null;
	private opacityValueDisplay: HTMLElement | null = null;
	private statusText: HTMLElement | null = null;

	constructor(container: HTMLElement) {
		super(container, new FTGuideLectureConfig());
		this.ftGuideReaderService = new FTGuideReaderService(container);
		console.log("FTGuideLecture component initialized");
		this.onInit();
	}

	protected onInit(): void {
		console.log("Initializing Guide Lecture controls...");
		this.initializeElements();
		this.setupEventListeners();
		this.applyGuideReaderSettings();
	}

	private initializeElements(): void {
		this.guideLigneButton = this.$container?.querySelector('#guideLigne') as HTMLButtonElement;
		this.guideFocusButton = this.$container?.querySelector('#guideFocus') as HTMLButtonElement;
		this.guideColorPicker = this.$container?.querySelector('#guideColor') as HTMLInputElement;
		this.colorPreview = this.$container?.querySelector('.color-preview') as HTMLElement;
		this.guideSizeSlider = this.$container?.querySelector('#guideSize') as HTMLInputElement;
		this.sizeValueDisplay = this.$container?.querySelector('.size-value') as HTMLElement;
		this.guideOpacitySlider = this.$container?.querySelector('#guideOpacity') as HTMLInputElement;
		this.opacityValueDisplay = this.$container?.querySelector('.opacity-value') as HTMLElement;
		this.statusText = this.$container?.querySelector('#statusText') as HTMLElement;
		
		// Initialize color preview with color picker's default value
		if (this.colorPreview && this.guideColorPicker) {
			this.colorPreview.style.backgroundColor = this.guideColorPicker.value;
		}
	}

	private setupEventListeners(): void {
		const elements = [
			{ element: this.guideLigneButton, type: 'guideLigne', event: 'click' },
			{ element: this.guideFocusButton, type: 'guideFocus', event: 'click' },
			{ element: this.guideColorPicker, type: 'guideColor', event: 'input' },
			{ element: this.guideSizeSlider, type: 'guideRulerSize', event: 'input' },
			{ element: this.guideOpacitySlider, type: 'guideOpacity', event: 'input' }
		];

		elements.forEach(({ element, type, event }) => {
			if (element) {
				element.addEventListener(event, (eventObj) => {
					this.handleElementEvent(type, eventObj, element);
				});
			}
		});
	}

	private handleElementEvent(elementType: string, event: Event, element: HTMLElement): void {
		const target = event.target as HTMLInputElement | HTMLButtonElement;
		const value = (target as HTMLInputElement).value || (target as HTMLButtonElement).dataset.value || '';
		
		const guideTypeOptions = {
			isActive: this.config.active,
			sizeSlider: this.guideSizeSlider,
			sizeDisplay: this.sizeValueDisplay,
			ligneButton: this.guideLigneButton,
			focusButton: this.guideFocusButton
		};
		
		switch (elementType) {
			case 'guideLigne':
				this.ftGuideReaderService.handleGuideTypeChange('ligne', element, guideTypeOptions);
				break;

			case 'guideFocus':
				this.ftGuideReaderService.handleGuideTypeChange('focus', element, guideTypeOptions);
				break;

			case 'guideColor':
				this.ftGuideReaderService.handleColorChange(value, element, this.colorPreview);
				break;

			case 'guideRulerSize':
				this.ftGuideReaderService.handleSizeChange(value, element, this.sizeValueDisplay);
				break;

			case 'guideOpacity':
				this.ftGuideReaderService.handleOpacityChange(value, element, this.opacityValueDisplay);
				break;

			default:
				console.warn(`Unknown element type: ${elementType}`);
				break;
		}
	}

	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.updateText();

			const defaultType = this.guideLigneButton?.classList.contains('active') ? 'ligne' : 'focus';
			if (this.$container) {
				this.ftGuideReaderService.enableGuideReader(defaultType, this.$container, {
					colorPicker: this.guideColorPicker,
					colorPreview: this.colorPreview,
					sizeSlider: this.guideSizeSlider,
					sizeDisplay: this.sizeValueDisplay,
					opacitySlider: this.guideOpacitySlider,
					opacityDisplay: this.opacityValueDisplay
				});
			}
			return success;
		}
		return false;
	}

	protected override onDeactivate(): boolean {
		console.info(`[${this.config.name}] Deactivated`);
		const success = (super.onDeactivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = false;
			this.updateText();
			this.ftGuideReaderService.disableGuideReader();
			return success;
		}
		return false;
	}

	protected override updateText(): void {
		if (!this.$textStatus) return;
		this.$textStatus.textContent = this.active ? "Désactivation: Désactivée" : "Désactivation: Activée";
	}

	private applyGuideReaderSettings(): void {}
}
