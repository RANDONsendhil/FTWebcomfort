import template from "./template/index.html";
import { disableAnimations, enableAnimations, systemPrefersReducedMotion } from "./service/index";
export class FTEpilepsieConfig {
	/** Couleur du bouton */
	active: boolean = true;
	constructor() {}
}

export class FTEpilepsie extends HTMLElement {
	#htmlConnected = false;
	#active?: boolean | false;
	$btnToggle?: HTMLButtonElement | null;
	$textStatus?: HTMLSpanElement | null;

	#initConfig = new FTEpilepsieConfig();

	constructor() {
		console.log("FTEpilepsie component initialized");
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = template;
		this._initializeDOMReferences();
	}
	static get observedAttributes() {
		return ["active"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue === newValue || !newValue) return;

		if (this.#htmlConnected) (this as any)[name] = newValue;
		// @ts-ignore
		else (this.#initConfig as any)[name] = newValue;
	}
	connectedCallback() {
		this.#htmlConnected = true;
		this.$btnToggle!.addEventListener("click", this.epilepsieBtnTrigger);

		for (const key in this.#initConfig) {
			(this as any)[key] = (this.#initConfig as any)[key];
		}
	}

	get active(): boolean {
		return this.#active == true;
	}

	// Setter (triggers when you assign a new value)
	set active(value: boolean) {
		this.#active = value;
		this._updateText(); // trigger DOM update
	}
	/** Suppression des évènements quand le composant est détruit, tous les évènements doivent être supprimés. */

	private _initializeDOMReferences(): void {
		this.$btnToggle = this.shadowRoot!.querySelector(".toggle-btn")!;
		this.$textStatus = this.shadowRoot!.querySelector("#statusText")!;
		this._updateText();
	}

	epilepsieBtnTrigger = (event: any) => {
		this._initializeDOMReferences();
		this.#active ? this._activate(event) : this._deactivate(event);
	};

	_activate(event: any) {
		this.active = false;
		disableAnimations();
		this.$btnToggle?.classList.remove("inactive");
		this.$btnToggle?.classList.add("active");
		this._updateText();
	}

	_deactivate(event: any) {
		this.active = true;
		enableAnimations();
		this.$btnToggle?.classList.remove("active");
		this.$btnToggle?.classList.add("inactive");
		this._updateText();
	}

	_updateText() {
		if (this.#active) {
			this.$textStatus!.textContent = "Animation: Activée";
		} else {
			this.$textStatus!.textContent = "Animation: Désactivée";
		}
	}
}
customElements.define("ft-epilepsie", FTEpilepsie);
