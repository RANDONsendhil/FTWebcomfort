import template from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { FTLoupeService } from "./service/index";

/** Configuration for the Epilepsie component */
export class FTLoupeConfig {
	readonly name = "Loupe";
	active = false;
	readonly description = "Permet d'agrandir une partie ou la totalité de l'écran afin d'améliorer la visibilité du texte et des images..";
	readonly template = template;
}

/** Epilepsie component extending the plain TypeScript base */
export class FTLoupe extends FTWebconfortBaseComponent<FTLoupeConfig> {
	private readonly ftLoupeService: FTLoupeService;
	private zoomButton: HTMLButtonElement | null = null;
	private lensButton: HTMLButtonElement | null = null;
	private zoomSlider: HTMLInputElement | null = null;
	private zoomDisplay: HTMLElement | null = null;
	private currentMode: 'zoom' | 'lens' = 'zoom';

	constructor(container: HTMLElement) {
		super(container, new FTLoupeConfig());
		this.ftLoupeService = new FTLoupeService(container);
		this.initializeControls();
		console.log("FTLoupe component initialized");
	}

	private initializeControls(): void {
		this.zoomButton = this.$container.querySelector('#zoomButton');
		this.lensButton = this.$container.querySelector('#lensButton');
		this.zoomSlider = this.$container.querySelector('#zoomSlider');
		this.zoomDisplay = this.$container.querySelector('#zoomDisplay');
		
		// Add event listeners
		this.zoomButton?.addEventListener('click', () => this.handleModeChange('zoom'));
		this.lensButton?.addEventListener('click', () => this.handleModeChange('lens'));
		this.zoomSlider?.addEventListener('input', (e) => this.handleZoomChange((e.target as HTMLInputElement).value));
	}

	private handleModeChange(mode: 'zoom' | 'lens'): void {
		if (!this.active) return;
		
		// If switching modes, first disable the current mode
		if (this.currentMode !== mode) {
			if (this.currentMode === 'zoom') {
				this.ftLoupeService.disableZoom();
			} else {
				this.ftLoupeService.disableLens();
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
		this.handleZoomChange(this.zoomSlider?.value || '1.5');
	}

	private handleZoomChange(value: string): void {
		if (!this.active) return;
		
		const zoomValue = parseFloat(value);
		
		// Update display
		if (this.zoomDisplay) {
			this.zoomDisplay.textContent = `${zoomValue.toFixed(1)}x`;
		}
		
		// Apply zoom based on current mode
		if (this.currentMode === 'zoom') {
			this.ftLoupeService.applyZoom(value);
		} else {
			this.ftLoupeService.applyLens(value);
		}
	}

	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.updateText();
			
			// Initialize with default mode
			this.handleModeChange(this.currentMode);
			
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
			this.ftLoupeService.disableLoupe();
			return success;
		}
		return false;
	}

	protected override updateText(): void {
		if (!this.$textStatus) return;
		this.$textStatus.textContent = this.active ? "Loupe: Activée" : "Loupe: Desactivée";
	}



}
//
