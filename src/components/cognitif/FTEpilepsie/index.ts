import template from "./template/index.html";

import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";
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

  protected override onActivate(): void {
    console.log("on activate ==> animations deactivated");
   console.log("[FTPersonalisationText] Deactivated");
    super.onActivate();
    this.config.active = false;
  }

  protected override onDeactivate(): void {
 
  console.log("[FTPersonalisationText] Deactivated");
    super.onDeactivate();
    this.config.active = false;
  }

  protected override updateText(): void {
    if (!this.$textStatus) return;
    this.$textStatus.textContent = this.active ? "Animation: Désactivée" : "Animation: Activée";
  }

 }

//

