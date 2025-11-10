import { template, dropDown } from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { FTDyslexiqueStructure } from "./service/structure"

/** Configuration for Dyslexie component */
export class FTDysConfig {
	readonly name = "Dyslexie";
	active = false;
	readonly description = "Enable dyslexie-friendly fonts to improve readability.";
	readonly template = template;
}

/** Dyslexie component as a plain TypeScript module */
export class FTDyslexie extends FTWebconfortBaseComponent<FTDysConfig> {

	private readonly ftDyslexieStructure: FTDyslexiqueStructure;
	constructor(container: HTMLElement) {
		super(container, new FTDysConfig());
		this.ftDyslexieStructure = new FTDyslexiqueStructure(container)

	}

	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.ftDyslexieStructure.enableDyslexique();
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
			this.ftDyslexieStructure.disableDyslexique();
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
