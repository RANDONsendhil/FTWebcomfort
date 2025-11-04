import template from "./template/index.html";
import { disableAnimations, enableAnimations } from "./service/index";
import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";

export class FTEpilepsieConfig {
	name = "Epilepsie";
	active: boolean = true;
}

export class FTEpilepsie extends FTWebconfortBaseComponent<FTEpilepsieConfig> {
	constructor() {
		super("FTEpilepsie", template, new FTEpilepsieConfig());
		console.log("FTEpilepsie component initialized");
	}

	protected onActivate(event?: Event): void {
		console.log("on activate ==> animation deactivate");
		disableAnimations();
	}

	protected onDeactivate(event?: Event): void {
		enableAnimations();
		console.log("on deactivate ==> animation activated");
	}

	protected updateText(): void {
		if (!this.$textStatus) return;
		this.$textStatus.textContent = this.active ? "Animation: Activée" : "Animation: Désactivée";
	}
}

customElements.define("ft-epilepsie", FTEpilepsie);
