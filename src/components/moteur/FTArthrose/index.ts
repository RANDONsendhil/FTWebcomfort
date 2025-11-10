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

  protected override onActivate(): void {
    console.log("on activate ==> Arthrose activated - enlarging clickable zones");
    super.onActivate();
    this.config.active = true;
    this.ftArthroseStructure.enableArthrose(true);
  }

  protected override onDeactivate(): void {
    console.log("on deactivate ==> Arthrose deactivated - restoring normal zones");
    super.onDeactivate();
    this.config.active = true;
    this.ftArthroseStructure.enableArthrose(false);
  }

  protected override updateText(): void {
    if (!this.$textStatus) return;
    this.$textStatus.textContent = this.active ? "Zones tactiles: Agrandies" : "Zones tactiles: Normales";
  }
}
