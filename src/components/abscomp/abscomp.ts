import { createGlobalTemplate } from "../style/globalIndex.html";

export class FTWebconfortBaseComponent<T> extends HTMLElement {
	protected config: T;
	protected $btnToggle?: HTMLButtonElement | null;
	protected $textStatus?: HTMLSpanElement | null;
	protected $componentName?: HTMLHeadingElement | null;

	constructor(componentName: string, template: string, config: T) {
		super();
		this.config = config;

		const shadow = this.attachShadow({ mode: "open" });

		// Use global template with component-specific content
		shadow.innerHTML = createGlobalTemplate(componentName, template);

		// Initialize DOM references
		this.$btnToggle = shadow.querySelector(".toggle-btn");
		this.$textStatus = shadow.querySelector("#statusText");
		this.$componentName = shadow.querySelector("#componentName");
	}

	connectedCallback() {
		this.$btnToggle?.addEventListener("click", this.handleToggle);
	}

	disconnectedCallback() {
		this.$btnToggle?.removeEventListener("click", this.handleToggle);
	}

	private handleToggle = () => {
		const isActive = this.$btnToggle?.classList.contains("active");

		if (isActive) {
			this.deactivate();
		} else {
			this.activate();
		}
	};

	protected activate() {
		this.$btnToggle?.classList.remove("inactive");
		this.$btnToggle?.classList.add("active");
		this.onActivate();
		this.updateText();
	}

	protected deactivate() {
		this.$btnToggle?.classList.remove("active");
		this.$btnToggle?.classList.add("inactive");
		this.onDeactivate();
		this.updateText();
	}

	protected onActivate(event?: Event): void {
		// Override in child components
	}

	protected onDeactivate(event?: Event): void {
		// Override in child components
	}

	protected updateText(): void {
		// Override in child components
	}

	get active(): boolean {
		return this.$btnToggle?.classList.contains("active") ?? false;
	}
}
