import { template } from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";
import { FTPersonalisationTextStructure } from "./service/structure";

/** Configuration for the Text Personalization component */
export class FTPersonalisationTextConfig {
	readonly name = "Personnalisation du texte";
	readonly description = "Personnalisez le texte pour une meilleure lisibilité.";
	readonly template = template;
	active = false;
}

/**
 * Text Personalization component — handles toggle behavior
 * and delegates text settings management to its service.
 */
export class FTPersonalisationText extends FTWebconfortBaseComponent<FTPersonalisationTextConfig> {
	private readonly service: FTPersonalisationTextStructure;

	constructor(container: HTMLElement) {
		// Respect base class constructor signature
		super(container, new FTPersonalisationTextConfig());
		this.service = new FTPersonalisationTextStructure(container);
		console.info(`[${this.config.name}] Component initialized`);
	}

	/** Called when the component is activated */
	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.applyTextSettings();
			this.updateText();
			return success;
		}
		return false;
	}

	/** Called when the component is deactivated */
	protected override onDeactivate(): boolean {
		console.info(`[${this.config.name}] Deactivated`);
		const success = (super.onDeactivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = false;
			this.service.resetTextSettings();
			this.updateText();
			return success;
		}
		return false;
	}

	/** Updates displayed status text */
	protected override updateText(): void {
		super.updateText();
	}

	/** Applies text settings via the service */
	private applyTextSettings(): void {
		try {
			const settings = this.service.setTextSettings({});
			console.debug(`[${this.config.name}] Applied text settings`, settings);
		} catch (error) {
			console.error(`[${this.config.name}] Failed to apply text settings`, error);
		}
	}
}
