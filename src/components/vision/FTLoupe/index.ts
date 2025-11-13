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

/** Loupe component extending the plain TypeScript base */
export class FTLoupe extends FTWebconfortBaseComponent<FTLoupeConfig> {
	private readonly ftLoupeService: FTLoupeService;

	constructor(container: HTMLElement) {
		super(container, new FTLoupeConfig());
		this.ftLoupeService = new FTLoupeService(container);
		this.setupEventListeners();
		console.log("FTLoupe component initialized");
	}

	private setupEventListeners(): void {
		this.ftLoupeService.setupEventListeners(
			(mode) => this.ftLoupeService.handleModeChange(mode, this.active),
			(value) => this.ftLoupeService.handleZoomChange(value, this.active)
		);
	}

	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.updateText();
			this.ftLoupeService.handleModeChange(this.ftLoupeService.getCurrentMode(), this.active);
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
