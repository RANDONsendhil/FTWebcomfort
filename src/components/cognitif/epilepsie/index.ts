import { log } from "console";
import { template } from "./template/index.html";

export class FTEpilepsie extends HTMLElement {
	$trigger?: boolean | false;
	$textToggle?: HTMLElement | null;
	$btnToggle?: HTMLButtonElement | null;
	$btnEpilepsie?: HTMLButtonElement | null;
	$textStatus?: HTMLSpanElement | null;

	constructor() {
		console.log("FTEpilepsie component initialized");
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = template;
		this._initializeDOMReferences();
	}

	connectedCallback() {
		this.$btnEpilepsie!.addEventListener("click", this.epilepsieBtnTrigger);
	}

	get active(): boolean {
		return this.$trigger === false;
	}

	// Setter (triggers when you assign a new value)
	set active(value: boolean) {
		this.$trigger = value;

		this.updateText(); // trigger DOM update
	}
	/** Suppression des évènements quand le composant est détruit, tous les évènements doivent être supprimés. */

	private _initializeDOMReferences(): void {
		this.$btnEpilepsie = this.shadowRoot!.querySelector("#btn-epilepsie")!;
		this.$btnToggle = this.shadowRoot!.querySelector(".toggle-btn")!;
		this.$textStatus = this.shadowRoot!.querySelector("#statusText")!;
		this.$textToggle = this.shadowRoot!.querySelector(".toggle-text")!;

		this.updateText();
	}

	epilepsieBtnTrigger = (event: any) => {
		console.log(" animation ==> " + this.active);

		this._initializeDOMReferences();
		this.$trigger ? this.activate(event) : this.deactivate(event);
	};

	activate(event: any) {
		this.active = false;
		console.log("Event trigger activate animation");
		this.$btnToggle?.classList.remove("inactive");
		this.$btnToggle?.classList.add("active");
		this.updateText();
	}

	deactivate(event: any) {
		this.active = true;
		console.log("Event trigger deactivate animation");
		this.$btnToggle?.classList.remove("active");
		this.$btnToggle?.classList.add("inactive");
		this.updateText();
	}

	updateText() {
		if (this.$trigger) {
			this.$textStatus!.textContent = "Animation: Désactivée";
			this.$textToggle!.textContent = " Activé animation";
		} else {
			this.$textStatus!.textContent = "Animation: Activée";
			this.$textToggle!.textContent = "Déactiver animation";
		}
	}
}
customElements.define("ft-epilepsie", FTEpilepsie);
//inactive active
