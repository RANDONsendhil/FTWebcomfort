import { template } from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../basecomponent/index";
import { FTPersonalisationTextService } from "./service/index";

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
	private readonly ftPersonalisationTextService: FTPersonalisationTextService;

	constructor(container: HTMLElement) {
		// Respect base class constructor signature
		super(container, new FTPersonalisationTextConfig());
		this.ftPersonalisationTextService = new FTPersonalisationTextService(container);
		console.info(`[${this.config.name}] Component initialized`);
	}

	/** Called when the component is activated */
	protected override onActivate(): boolean {
		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			// Enable personalization in the service
			this.ftPersonalisationTextService.enablePersonalisation(true);
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
			// Disable personalization in the service
			this.ftPersonalisationTextService.disablePersonalisation();
			this.updateText();
			return success;
		}
		return false;
	}

	protected override updateText(): void {
		super.updateText();
	}

	private applyTextSettings(): void {
		try {
			const settings = this.ftPersonalisationTextService.setTextSettings({});
			console.debug(`[${this.config.name}] Applied text settings`, settings);
		} catch (error) {
			console.error(`[${this.config.name}] Failed to apply text settings`, error);
		}
	}
}
