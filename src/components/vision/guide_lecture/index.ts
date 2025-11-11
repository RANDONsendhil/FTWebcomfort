import {template} from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { FTGuideReaderService } from "./service/index";

/** Configuration for the Epilepsie component */
export class FTGuideLectureConfig {
	readonly name = "Guide de lecture";
	active = false;
	readonly description = "Guide lecture pour une meilleure lisibilité.";
	readonly template = template;
}

/** Epilepsie component extending the plain TypeScript base */
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
		
		// Récupération des éléments du template
		this.initializeElements();
		this.setupEventListeners();
		this.applyGuideReaderSettings();
	}

	private initializeElements(): void {
		console.log( " ====================================> "+this.$container);
		
		// Push buttons pour le type de règle
		this.guideLigneButton = this.$container?.querySelector('#guideLigne') as HTMLButtonElement;
		this.guideFocusButton = this.$container?.querySelector('#guideFocus') as HTMLButtonElement;
		
		// Contrôles de couleur
		this.guideColorPicker = this.$container?.querySelector('#guideColor') as HTMLInputElement;
		this.colorPreview = this.$container?.querySelector('.color-preview') as HTMLElement;
		
		// Contrôles de taille
		this.guideSizeSlider = this.$container?.querySelector('#guideSize') as HTMLInputElement;
		this.sizeValueDisplay = this.$container?.querySelector('.size-value') as HTMLElement;
		
		// Contrôles d'opacité
		this.guideOpacitySlider = this.$container?.querySelector('#guideOpacity') as HTMLInputElement;
		this.opacityValueDisplay = this.$container?.querySelector('.opacity-value') as HTMLElement;
		
		// Texte de statut
		this.statusText = this.$container?.querySelector('#statusText') as HTMLElement;
		
		console.log("Guide Lecture elements initialized:", {
			guideLigneButton: !!this.guideLigneButton,
			guideFocusButton: !!this.guideFocusButton,
			guideColorPicker: !!this.guideColorPicker,
			guideSizeSlider: !!this.guideSizeSlider,
			guideOpacitySlider: !!this.guideOpacitySlider
		});
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

		console.log("Guide Lecture event listeners configured");
	}

	private handleElementEvent(elementType: string, event: Event, element: HTMLElement): void {
		const target = event.target as HTMLInputElement | HTMLButtonElement;
		const value = (target as HTMLInputElement).value || (target as HTMLButtonElement).dataset.value || '';
		console.log(elementType);
		
		switch (elementType) {
			case 'guideLigne':
				// Toggle active class
				this.guideLigneButton?.classList.add('active');
				this.guideFocusButton?.classList.remove('active');
				
				// Update slider min value for ligne mode
				if (this.guideSizeSlider) {
					this.guideSizeSlider.min = '1';
					// Ensure current value is valid for ligne mode
					if (parseFloat(this.guideSizeSlider.value) < 1) {
						this.guideSizeSlider.value = '3';
					}
					// Always update display with current slider value
					if (this.sizeValueDisplay) {
						this.sizeValueDisplay.textContent = `${this.guideSizeSlider.value}px`;
					}
				}
				
				if (this.guideLigneButton && this.config.active) {
					const currentSize = this.guideSizeSlider?.value || '3';
					this.ftGuideReaderService.updateRulerGuideReaderWithSize('ligne', this.guideLigneButton, currentSize);
				}
				break;

			case 'guideFocus':
				// Toggle active class
				this.guideFocusButton?.classList.add('active');
				this.guideLigneButton?.classList.remove('active');
				
				// Update slider min value for focus mode
				if (this.guideSizeSlider) {
					this.guideSizeSlider.min = '10';
					// Ensure current value is valid for focus mode
					if (parseFloat(this.guideSizeSlider.value) < 10) {
						this.guideSizeSlider.value = '20';
					}
					// Always update display with current slider value
					if (this.sizeValueDisplay) {
						this.sizeValueDisplay.textContent = `${this.guideSizeSlider.value}px`;
					}
				}
				
				if (this.guideFocusButton && this.config.active) {
					const currentSize = this.guideSizeSlider?.value || '20';
					this.ftGuideReaderService.updateRulerGuideReaderWithSize('focus', this.guideFocusButton, currentSize);
				}
				break;

			case 'guideColor':
				if (this.guideColorPicker) {
					this.ftGuideReaderService.updatedRulerColorGuideReader(value, this.guideColorPicker);
				}
				if (this.colorPreview) {
					this.colorPreview.style.backgroundColor = value;
				}
				break;

			case 'guideRulerSize':
				if (this.guideSizeSlider) {
					this.ftGuideReaderService.updateRulerThicknessGuideReader(value, this.guideSizeSlider);
				}
				if (this.sizeValueDisplay) {
					this.sizeValueDisplay.textContent = `${value}px`;
				}
				break;

			case 'guideOpacity':
				if (this.guideOpacitySlider) {
					this.ftGuideReaderService.updateRulerOpacityGuideReader(value, this.guideOpacitySlider);
				}
				if (this.opacityValueDisplay) {
					this.opacityValueDisplay.textContent = `${Math.round(parseFloat(value) * 100)}%`;
				}
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
			// this.ftGuideReaderService.enableGuideReader();
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
		this.$textStatus.textContent = this.active ? "Desactivation: Désactivée" : "Desactivation: Activée";
	}

	private applyGuideReaderSettings(): void {}
 


	  
}

//
