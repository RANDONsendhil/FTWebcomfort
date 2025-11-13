import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { template } from "./template/index.html";
import { FTArthroseService } from "./service/index";


/** Configuration for the Arthrose component */
export class FTArthroseConfig {
	readonly name = "Arthrose";
	active = false;
	readonly description = "Enlarge clickable zones for easier interaction";
	readonly template = template;
}

/** Arthrose component extending the plain TypeScript base */
export class FTArthrose extends FTWebconfortBaseComponent<FTArthroseConfig> {
	private readonly ftArthroseService: FTArthroseService;
	
	constructor(container: HTMLElement) {
		super(container, new FTArthroseConfig());
		this.ftArthroseService = new FTArthroseService(container);
		this.setupEventListeners();
		console.log("FTArthrose module initialized");
	}

	private setupEventListeners(): void {
		this.ftArthroseService.setupEventListeners(
			(size) => this.ftArthroseService.handleSizeChange(size, this.active),
			(color) => this.ftArthroseService.handleColorChange(color, this.active)
		);
	}

	protected override onActivate(): boolean {
		console.log("on activate ==> Arthrose activated - enlarging clickable zones");
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.updateText();
			this.ftArthroseService.enableArthrose(true);
			return success;
		}
		return false;
	}

	protected override onDeactivate(): boolean {
		console.info(`[${this.config.name}] Deactivated`);
		const success = (super.onDeactivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = false;
			this.ftArthroseService.enableArthrose(false);
			this.ftArthroseService.disableAllCustomizations();
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
