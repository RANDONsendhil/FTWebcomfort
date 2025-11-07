import template from "./template/index.html";
import { disableArthrose, enableArthrose } from "./service/index";
import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";

/** Configuration for the Arthrose component */
export class FTArthroseConfig {
  name = "Arthrose";
  active: boolean = true;
}

/** Arthrose component extending the plain TypeScript base */
export class FTArthrose extends FTWebconfortBaseComponent<FTArthroseConfig> {
  constructor(container: HTMLElement) {
    super("Arthrose", template, new FTArthroseConfig(), container);
    console.log("FTArthrose module initialized");
  }

  protected override onActivate(): void {
    console.log("on activate ==> Arthrose activated - enlarging clickable zones");
    enableArthrose();
  }

  protected override onDeactivate(): void {
    console.log("on deactivate ==> Arthrose deactivated - restoring normal zones");
    disableArthrose();
  }

  protected override updateText(): void {
    if (!this.$textStatus) return;
    this.$textStatus.textContent = this.active ? "Zones tactiles: Agrandies" : "Zones tactiles: Normales";
  }
}
