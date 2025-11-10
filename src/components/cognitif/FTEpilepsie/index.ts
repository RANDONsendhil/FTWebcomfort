import template from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { FTEpilepsieStructure } from "./service/structure";

/** Configuration for the Epilepsie component */
export class FTEpilepsieConfig {
	readonly name = "Epilepsie";
	active = false;
	readonly description = "Personnalisez le texte pour une meilleure lisibilité.";
	readonly template = template;
}

/** Epilepsie component extending the plain TypeScript base */
export class FTEpilepsie extends FTWebconfortBaseComponent<FTEpilepsieConfig> {
	private readonly ftEpilepsieStructure: FTEpilepsieStructure;

	constructor(container: HTMLElement) {
		super(container, new FTEpilepsieConfig());
		this.ftEpilepsieStructure = new FTEpilepsieStructure(container);
		console.log("FTEpilepsie component initialized");
	}

	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.config.active = false;
			this.updateText();
			this.ftEpilepsieStructure.disableAnimations();
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
			this.ftEpilepsieStructure.enableAnimations();
			return success;
		}
		return false;
	}

	protected override updateText(): void {
		if (!this.$textStatus) return;
		this.$textStatus.textContent = this.active ? "Desactivation: Désactivée" : "Desactivation: Activée";
	}
}

//
