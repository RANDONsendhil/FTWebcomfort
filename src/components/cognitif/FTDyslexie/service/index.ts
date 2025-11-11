/**
 * Service/Configuration class for Dyslexie component
 * This acts as a configuration provider and service layer
 */
import { enableFontDys, disableFontDys, changeFontDys } from "./structure";

export class FTDyslexiqueService {

	public active: boolean = false;
    private container?: HTMLElement;
    private currentFont: string = "regular";

    constructor(container?: HTMLElement) {
        console.log("FTDyslexiqueService initialized");
        this.container = container;
        this.initializeDropdowns();
    }

    /**
     * Enable dyslexie font functionality
     */
    public enableDyslexique(): void {
        this.active = true;
        enableFontDys();
        this.applyCurrentFont();
        console.log("Dyslexie: enabled");
    }

    /**
     * Disable dyslexie font functionality
     */
    public disableDyslexique(): void {
        this.active = false;
        disableFontDys();
        console.log("Dyslexie: disabled");
    }

    /**
     * Get the component container element
     */
    public getContainer(): HTMLElement | null {
        return this.container || null;
    }

    /**
     * Initialize dropdown event listeners and functionality
     */
    private initializeDropdowns(): void {
        setTimeout(() => {
            const container = this.getContainer();
            if (!container) return;

            container.addEventListener("change", (e) => {
                console.log("Dyslexie: Change event detected", e.target);
                const target = e.target as HTMLInputElement;

                if (target && target.type === "radio") {
                    console.log("Dyslexie: Radio button changed", { name: target.name, value: target.value });

                    if (target.closest(".dropdown-options")) {
                        const dropdown = target.name;
                        const value = target.value;

                        console.log("Dyslexie: Processing dropdown change", { dropdown, value });

                        if (dropdown === "fontDys") {
                            this.updateFont(value);
                        }
                    }
                }
            });

            container.addEventListener("click", (e) => {
                const target = e.target as HTMLElement;
                const dropdownButton = target.closest("[data-dropdown]") as HTMLElement;

                if (dropdownButton) {
                    e.stopPropagation();
                    this.handleDropdownClick(dropdownButton);
                }
            });

            document.addEventListener("click", (e) => {
                const target = e.target as HTMLElement;
                if (!target.closest(".custom-dropdown") || !container.contains(target)) {
                    this.closeAllDropdowns();
                }
            });
        }, 100);
    }

    /**
     * Handle dropdown button click events
     */
    private handleDropdownClick(button: HTMLElement): void {
        const dropdown = button.getAttribute("data-dropdown");
        const options = button.nextElementSibling as HTMLElement;
        const dropdownContainer = button.closest(".custom-dropdown") as HTMLElement;

        if (!options || !dropdownContainer) return;

        const isCurrentlyOpen = options.classList.contains("show");

        this.closeAllDropdowns();

        if (!isCurrentlyOpen) {
            options.classList.add("show");
            button.classList.add("open");
            dropdownContainer.classList.add("open");
        }
    }

    /**
     * Close all open dropdown menus
     */
    private closeAllDropdowns(): void {
        const container = this.getContainer();
        if (!container) return;

        container.querySelectorAll(".dropdown-options.show").forEach((options) => {
            options.classList.remove("show");
            const button = options.previousElementSibling as HTMLElement;
            const dropdownContainer = options.closest(".custom-dropdown") as HTMLElement;

            if (button) {
                button.classList.remove("open");
            }
            if (dropdownContainer) {
                dropdownContainer.classList.remove("open");
            }
        });
    }

    /**
     * Update the selected dyslexie font
     */
    private updateFont(fontValue: string): void {
        console.log("Dyslexie: Updating font to", fontValue);
        this.currentFont = fontValue;
        this.updateDropdownDisplay("fontDys", fontValue);

        if (this.active) {
            changeFontDys(fontValue);
        }
    }

    /**
     * Update the visual display of dropdown selections
     */
    private updateDropdownDisplay(property: string, value: string): void {
        const container = this.getContainer();
        if (!container) return;

        const button = container.querySelector(`[data-dropdown="${property}"]`) as HTMLElement;
        if (!button) {
            console.warn(`Dyslexie: Button not found for property: ${property}`);
            return;
        }

        const textSpan = button.querySelector(".dropdown-text") as HTMLElement;
        const radio = container.querySelector(`input[name="${property}"][value="${value}"]`) as HTMLInputElement;

        if (radio && textSpan) {
            radio.checked = true;
            const label = radio.nextElementSibling as HTMLElement;
            if (label) {
                textSpan.textContent = label.textContent || value;
            }
        } else {
            console.warn(`Dyslexie: Missing elements for ${property}`, { radio: !!radio, textSpan: !!textSpan });
        }

        const options = button.nextElementSibling as HTMLElement;
        const dropdownContainer = button.closest(".custom-dropdown") as HTMLElement;

        if (options) {
            options.classList.remove("show");
            button.classList.remove("open");
        }
        if (dropdownContainer) {
            dropdownContainer.classList.remove("open");
        }
    }

    private applyCurrentFont(): void {
        if (this.currentFont && this.active) {
            changeFontDys(this.currentFont);
        }
    }
}




