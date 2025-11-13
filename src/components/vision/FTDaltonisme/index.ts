import template from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { FTModeAffichageService } from "./service/index";

/** Configuration for the Epilepsie component */
export class FTModeAffichageConfig {
	readonly name = "Mode affichage";
	active = false;
	readonly description = "Mode sombre, mode lecture, mode clair, mode contraste élevé, mdoe lecture audio.";
	readonly template = template;
}

/** Epilepsie component extending the plain TypeScript base */
export class FTModeAffichage extends FTWebconfortBaseComponent<FTModeAffichageConfig> {
	private readonly ftModeAffichageService: FTModeAffichageService;

	constructor(container: HTMLElement) {
		super(container, new FTModeAffichageConfig());
		this.ftModeAffichageService = new FTModeAffichageService(container);
		this.setupEventListeners();
		console.log("FTEpilepsie component initialized");
	}

	private setupEventListeners(): void {
		this.ftModeAffichageService.setupEventListeners(
			(mode) => this.ftModeAffichageService.handleModeChange(mode, this.active)
		);
	}

	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.updateText();
			// Initialize with normal mode when activated
			this.ftModeAffichageService.handleModeChange(this.ftModeAffichageService.getCurrentMode(), this.active);
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
			// Reset to normal mode when deactivated
			this.ftModeAffichageService.disableAllModes();
			return success;
		}
		return false;
	}

	protected override updateText(): void {
		if (!this.$textStatus) return;
		const modeNames = {
			normal: 'Normal',
			darkMode: 'Mode sombre',
			coulorBlindess: 'Daltonisme',
			reducerColorBlueBtn: 'Réduction lumière bleue',
			modeHighContrast: 'Contraste élevé',
			modeSoften: 'Mode adouci'
		};
		const currentMode = this.ftModeAffichageService.getCurrentMode();
		const modeName = modeNames[currentMode] || 'Normal';
		this.$textStatus.textContent = this.active ? `Mode d'affichage: ${modeName}` : "Mode d'affichage: Désactivé";
	}

}