import { template, dropDown } from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { FTDyslexiqueService } from "./service/index"

/** Configuration for Dyslexie component */
export class FTDysConfig {
	readonly name = "Dyslexie";
	active = false;
	readonly description = "Enable dyslexie-friendly fonts to improve readability.";
	readonly template = template;
}

/** Dyslexie component as a plain TypeScript module */
export class FTDyslexie extends FTWebconfortBaseComponent<FTDysConfig> {

	private readonly ftDyslexieService: FTDyslexiqueService;
	constructor(container: HTMLElement) {
		super(container, new FTDysConfig());
		this.ftDyslexieService = new FTDyslexiqueService(container)

	}

	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.ftDyslexieService.enableDyslexique();
			this.updateText();
			return success;
		}
		return false;
	}

	protected override onDeactivate(): boolean {
		console.info(`[${this.config.name}] Deactivated`);
		const success = (super.onDeactivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = false;
			this.ftDyslexieService.disableDyslexique();
			this.updateText();
			return success;
		}
		return false;
	}
	
	protected override updateText(): void {
		if (!this.$textStatus) return;
		this.$textStatus.textContent = this.active ? "Dyslexie: Activée" : "Dyslexie: Désactivée";
	}

}
