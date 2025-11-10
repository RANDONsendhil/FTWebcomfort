import { template } from "./template/index.html";
import { disableArthrose, enableArthrose } from "./service/index";
import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";
import { FTArthroseStructure } from "./service/structure";

/** Configuration for the Arthrose component */
export class FTArthroseConfig {
	readonly name = "Arthrose";
	active = false;
	readonly description = "Enlarge clickable zones for easier interaction";
	readonly template = template;
}

/** Arthrose component extending the plain TypeScript base */
export class FTArthrose extends FTWebconfortBaseComponent<FTArthroseConfig> {
	private readonly ftArthroseStructure: FTArthroseStructure;
	constructor(container: HTMLElement) {
		super(container, new FTArthroseConfig());
		this.ftArthroseStructure = new FTArthroseStructure(container);
		console.log("FTArthrose module initialized");
	}

	protected override onActivate(): boolean {
		console.log("on activate ==> Arthrose activated - enlarging clickable zones");
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.updateText();
			this.ftArthroseStructure.enableArthrose(true);
			return success;
		}
		return false;
	}

	protected override onDeactivate(): boolean {
		console.info(`[${this.config.name}] Deactivated`);
		const success = (super.onDeactivate?.() ?? true) as boolean;

		if (success) {
			this.config.active = true;
			this.ftArthroseStructure.enableArthrose(false);
			this.updateText();
			return success;
		}
		return false;
	}

	protected override updateText(): void {
		if (!this.$textStatus) return;
		this.$textStatus.textContent = this.active ? "Zones tactiles: Agrandies" : "Zones tactiles: Normales";
	}
}
