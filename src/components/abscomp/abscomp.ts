import { createGlobalTemplate } from "../style/globalIndex.html";

/**
 * Base class for components with toggle functionality and text update
 * @template T Config type for the component
 */
export class FTWebconfortBaseComponent<T> {
  protected config: T;
  protected $btnToggle?: HTMLButtonElement | null;
  protected $textStatus?: HTMLSpanElement | null;
  protected $componentName?: HTMLHeadingElement | null;
  protected $container: HTMLElement;

  constructor(componentName: string, template: string, config: T, container: HTMLElement) {
    this.config = config;
    this.$container = container;

    // Inject HTML structure into the container
    this.$container.innerHTML = createGlobalTemplate(componentName, template);

    // Initialize DOM references
    this.$btnToggle = this.$container.querySelector(".toggle-btn");
    this.$textStatus = this.$container.querySelector("#statusText");
    this.$componentName = this.$container.querySelector("#componentName");

    // Bind toggle button
    this.$btnToggle?.addEventListener("click", () => this.handleToggle());
  }

  /** Toggle button click handler */
  private handleToggle() {
    if (this.active) {
      this.deactivate();
    } else {
      this.activate();
    }
  }

  /** Activate the component */
  protected activate() {
    this.$btnToggle?.classList.remove("inactive");
    this.$btnToggle?.classList.add("active");
    this.onActivate();
    this.updateText();
  }

  /** Deactivate the component */
  protected deactivate() {
    this.$btnToggle?.classList.remove("active");
    this.$btnToggle?.classList.add("inactive");
    this.onDeactivate();
    this.updateText();
  }

  /** Override in child to implement custom activation behavior */
  protected onActivate(): void {}

  /** Override in child to implement custom deactivation behavior */
  protected onDeactivate(): void {}

  /** Override in child to implement text update */
  protected updateText(): void {}

  /** Returns whether the component is active */
  get active(): boolean {
    return this.$btnToggle?.classList.contains("active") ?? false;
  }
}
