// base-toggle.ts
export abstract class FTWebconfortBaseComponent<TConfig> extends HTMLElement {
	public readonly name: string;
	protected $componentName?: HTMLSpanElement | null;
	protected _htmlConnected = false;
	protected _active = false;
	protected _config: TConfig;
	protected $btnToggle?: HTMLButtonElement | null;
	protected $textStatus?: HTMLSpanElement | null;

	constructor(name: string, template: string, config: TConfig) {
		super();
		this.name = name;
		const shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = template;
		this._config = config;
		this._initializeDOMReferences();
		this._updateComponentName();
	}

	static get observedAttributes() {
		return ["active", "name"];
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (oldValue === newValue || !newValue) return;
		if (this._htmlConnected) (this as any)[name] = newValue;
		else (this._config as any)[name] = newValue;
	}

	connectedCallback() {
		this._htmlConnected = true;
		this._updateComponentName();
		this.$btnToggle?.addEventListener("click", this._handleToggle);
		for (const key in this._config) {
			(this as any)[key] = (this._config as any)[key];
		}
	}

	disconnectedCallback() {
		this.$btnToggle?.removeEventListener("click", this._handleToggle);
	}

	/** Abstract methods for subclasses to define */
	protected abstract onActivate(event?: Event): void;
	protected abstract onDeactivate(event?: Event): void;
	protected abstract updateText(): void;

	get active(): boolean {
		return this._active;
	}

	set active(value: boolean) {
		this._active = value;
		this.updateText();
	}

	/** Handles the toggle logic (calls activate/deactivate) */
	private _handleToggle = (event: Event) => {
		this._initializeDOMReferences();
		this._active ? this._activate(event) : this._deactivate(event);
	};

	private _activate(event: Event) {
		this.active = false;
		this.onActivate(event);
		this._updateButtonState();
	}

	private _deactivate(event: Event) {
		this.active = true;
		this.onDeactivate(event);
		this._updateButtonState();
	}

	private _updateButtonState() {
		if (this._active) {
			this.$btnToggle?.classList.add("inactive");
			this.$btnToggle?.classList.remove("active");
		} else {
			this.$btnToggle?.classList.add("active");
			this.$btnToggle?.classList.remove("inactive");

			this.updateText();
		}
	}

	protected _initializeDOMReferences(): void {
		this.$btnToggle = this.shadowRoot?.querySelector(".toggle-btn");
		this.$textStatus = this.shadowRoot?.querySelector("#statusText");
		this.$componentName = this.shadowRoot?.querySelector("#componentName");
	}

	protected _updateComponentName(): void {
		if (this.$componentName) {
			this.$componentName.textContent = this.name;
		}
	}
}
