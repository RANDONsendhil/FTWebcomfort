import template from "./template/index.html";
import { disableAnimations, enableAnimations } from "./service/index";
import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";

/** Configuration for the Epilepsie component */
export class FTEpilepsieConfig {
  name = "Epilepsie";
  active: boolean = true;
}

/** Epilepsie component extending the plain TypeScript base */
export class FTEpilepsie extends FTWebconfortBaseComponent<FTEpilepsieConfig> {
  constructor(container: HTMLElement) {
    super("Epilepsie", template, new FTEpilepsieConfig(), container);
    console.log("FTEpilepsie component initialized");
  }

  protected override onActivate(): void {
    console.log("on activate ==> animations deactivated");
    disableAnimations();
  }

  protected override onDeactivate(): void {
    enableAnimations();
    console.log("on deactivate ==> animations activated");
  }

  protected override updateText(): void {
    if (!this.$textStatus) return;
    this.$textStatus.textContent = this.active ? "Animation: Désactivée" : "Animation: Activée";
  }
}
