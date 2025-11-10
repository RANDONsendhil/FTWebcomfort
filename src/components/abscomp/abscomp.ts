import { createGlobalTemplate } from "../style/globalIndex.html";

/**
 * Base class for web components with toggle functionality and text updates.
 * @template T - Configuration type for the component.
 */
export abstract class FTWebconfortBaseComponent<
  T extends { name: string; description: string; template: string }
> {
  protected readonly config: T;
  protected readonly $container: HTMLElement;
  protected $btnToggle: HTMLButtonElement | null = null;
  protected $textStatus: HTMLSpanElement | null = null;
  protected $componentContent: HTMLElement | null = null;

  constructor(container: HTMLElement, config: T) {
    this.$container = container;
    this.config = config;

    //  Initialize the component structure
    this.initializeTemplate();
    this.bindElements();
    this.registerEvents();
  }

  /** Injects the component HTML structure into the container */
  private initializeTemplate(): void {
    this.$container.innerHTML = createGlobalTemplate(
      this.config.name,
      this.config.template,
      this.config.description
    );
  }

  /** Binds essential DOM elements */
  private bindElements(): void {
    this.$componentContent = this.$container.querySelector<HTMLElement>(".component-content");
    this.$btnToggle = this.$container.querySelector<HTMLButtonElement>(".component-toggle");
    this.$textStatus = this.$container.querySelector<HTMLSpanElement>(".component-status");
  }

  /** Registers DOM event listeners */
  private registerEvents(): void {
    this.$btnToggle?.addEventListener("click", () => this.toggle());
  }

  /** Handles toggle button click */
  private toggle(): void {
    this.active ? this.deactivate() : this.activate();
  }

  /** Activates the component */
  protected activate(): void {
    this.updateToggleState(true);
    this.onActivate();
    this.updateText();
  }

  /** Deactivates the component */
  protected deactivate(): void {
    this.updateToggleState(false);
    this.onDeactivate();
    this.updateText();
  }

  /** Updates the toggle button's visual state */
  private updateToggleState(isActive: boolean): void {
    if (!this.$btnToggle) return;

    this.$btnToggle.classList.toggle("active", isActive);
    this.$btnToggle.classList.toggle("inactive", !isActive);
  }


  /** Indicates whether the component is currently active */
  get active(): boolean {
    return this.$btnToggle?.classList.contains("active") ?? false;
  }

  /** Called when the component is activated (override in child classes) */
  protected onActivate(): boolean {
    return this.baseShowComponentContent(true);
  }

  /** Called when the component is deactivated (override in child classes) */
  protected onDeactivate(): boolean {
    return this.baseShowComponentContent(false);
  }

  /** Called to update displayed text or status (override in child classes) */
  protected updateText(): void {
    if (!this.$textStatus) return;

		const statusText = this.active
			? "Personnalisation : Activée"
			: "Personnalisation : Désactivée";

		this.$textStatus.textContent = statusText;
		this.$textStatus.style.color = this.active ? "green" : "gray";

		console.debug(`[${this.config.name}] Status updated → ${statusText}`);
  }

  /** 
   * Core implementation for showing/hiding content - can be called from child classes
   * Contains the base DOM manipulation logic that child classes can use
   * @param show - Whether to show or hide the content
   * @returns true if the operation was successful, false if elements are missing
   */
  protected baseShowComponentContent(show: boolean): boolean {
    if (!this.$componentContent) return false;
    
    // Toggle the content visibility
    this.$componentContent.classList.toggle("show", show);
    
    // Also update the toggle button state if needed
    if (this.$btnToggle) {
      this.$btnToggle.classList.toggle("active", show);
    }
    
    return true;
  }
}
