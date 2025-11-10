import { template } from "./template/index.html";
import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";
import { FTPersonalisationTextStructure } from "./service/structure";

/** Configuration for the Text Personalization component */
export class FTPersonalisationTextConfig {
  readonly name = "Personnalisation du texte";
  active = false;
  readonly description = "Personnalisez le texte pour une meilleure lisibilité.";
  readonly template = template;
}

/**
 * Text Personalization component — handles toggle behavior
 * and delegates text settings management to its service.
 */
export class FTPersonalisationText extends FTWebconfortBaseComponent<FTPersonalisationTextConfig> {
  private readonly ftPersonalisationTextService: FTPersonalisationTextStructure;

  constructor(container: HTMLElement) {
    super(container, new FTPersonalisationTextConfig());
    this.ftPersonalisationTextService = new FTPersonalisationTextStructure(container);

    console.log("[FTPersonalisationText] component initialized");
  }

  /** Called when the component is activated */
  protected override onActivate(): void {
    console.log("[FTPersonalisationText] Activated");
    super.onActivate();
    this.config.active = true;
    this.applyTextSettings();
  }

  /** Called when the component is deactivated */
  protected override onDeactivate(): void {
    console.log("[FTPersonalisationText] Deactivated");
    super.onDeactivate();
    this.config.active = false;
    this.ftPersonalisationTextService.resetTextSettings();
  }

  /** Updates displayed status text */
  protected override updateText(): void {
    if (!this.$textStatus) return;

    this.$textStatus.textContent = this.config.active
      ? "Personnalisation : Activée"
      : "Personnalisation : Désactivée";
  }

  /** Applies text settings via the service */
  private applyTextSettings(): void {
    const settings = this.ftPersonalisationTextService.setTextSettings({});
    console.log("[FTPersonalisationText] Applied text settings", settings);
  }
}
