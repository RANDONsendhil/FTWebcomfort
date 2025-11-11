/**
 * Service/Configuration class for Text Personalization component
 * This acts as a configuration provider and service layer
 */
export class FTPersonalisationTextService {
  public name = "Personnalisation du texte";
  public description = "Ajustez la taille, la police et l'espacement du texte pour améliorer la lisibilité.";
  public active: boolean = false;

  private container?: HTMLElement;
  private shadowRoot?: ShadowRoot;
  private textSettings: {
    fontSize: string;
    fontFamily: string;
    lineHeight: string;
    letterSpacing: string;
    wordSpacing: string;
    [key: string]: string;
  };

  constructor(container?: HTMLElement, shadowRoot?: ShadowRoot) {
    console.log("FTPersonalisationTextService initialized");
    this.container = container;
    this.shadowRoot = shadowRoot;

    // Initialize text settings
    this.textSettings = {
      fontSize: "16px",
      fontFamily: "'Open Sans', sans-serif",
      lineHeight: "1.6",
      letterSpacing: "0px",
      wordSpacing: "0px",
    };

    this.loadTextSettings();
    this.initializeDropdowns();
    this.initializeComponentState();
  }

  public getContainer(): HTMLElement | null {
    return this.container || null;
  }

  /**
   * Enable or disable text personalization
   * @param enable - Whether to enable personalization
   */
  public enablePersonalisation(enable: boolean): void {
    this.active = enable;
    console.log("Service: Personalization", enable ? "enabled" : "disabled");

    if (enable) {
      this.applyAllTextSettings();
    } else {
      this.resetTextSettings();
    }
  }

  /**
   * Disable text personalization (convenience method)
   */
  public disablePersonalisation(): void {
    this.enablePersonalisation(false);
  }


  private initializeComponentState(): void {
    setTimeout(() => {
      if (this.active) {
        this.applyAllTextSettings();
      }
    }, 50);
  }


  /**
   * Load text settings from localStorage
   */
  private loadTextSettings(): void {
    try {
      const savedSettings = localStorage.getItem("webcomfort-text-settings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.textSettings = { ...this.textSettings, ...settings };
        console.log("Service: Loaded saved text settings");
      }
    } catch (error) {
      console.error("Service: Error loading text settings:", error);
      // Continue with default settings if loading fails
    }
  }


  private initializeDropdowns(): void {
    // Wait for the component to be rendered, then initialize dropdowns
    setTimeout(() => {
      const container = this.getContainer();
      if (!container) return;

      // Initialize dropdown event listeners within the component container
      container.addEventListener("change", (e) => {
        console.log("Service: Change event detected", e.target);
        const target = e.target as HTMLInputElement;

        if (target && target.type === "radio") {
          console.log("Service: Radio button changed", { name: target.name, value: target.value });

          if (target.closest(".dropdown-options")) {
            const dropdown = target.name;
            const value = target.value;

            console.log("Service: Processing dropdown change", { dropdown, value });



            if (this.textSettings.hasOwnProperty(dropdown)) {
              this.updateTextSetting(dropdown, value);
            } else {
              console.warn("Service: Unknown dropdown property:", dropdown);
            }
          } else {
            console.log("Service: Radio not in dropdown options");
          }
        }
      });

      // Initialize dropdown button clicks
      container.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        const dropdownButton = target.closest("[data-dropdown]") as HTMLElement;

        if (dropdownButton) {
          e.stopPropagation();
          this.handleDropdownClick(dropdownButton);
        }
      });

      // Close dropdowns when clicking outside (on document level)
      document.addEventListener("click", (e) => {
        const target = e.target as HTMLElement;
        if (!target.closest(".custom-dropdown") || !container.contains(target)) {
          this.closeAllDropdowns();
        }
      });

      console.log("Dropdown event listeners initialized for PersonalizationText component");
    }, 100);
  }



  private handleDropdownClick(button: HTMLElement): void {
    const dropdown = button.getAttribute("data-dropdown");
    const options = button.nextElementSibling as HTMLElement;
    const dropdownContainer = button.closest(".custom-dropdown") as HTMLElement;

    if (!options || !dropdownContainer) return;

    // Check if this dropdown is currently open BEFORE closing others
    const isCurrentlyOpen = options.classList.contains("show");

    // Close all dropdowns first
    this.closeAllDropdowns();

    // If this dropdown was NOT open, open it
    if (!isCurrentlyOpen) {
      options.classList.add("show");
      button.classList.add("open");
      dropdownContainer.classList.add("open");
    }
    // If it was open, it stays closed (already closed by closeAllDropdowns)
  }

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


  private updateDropdownDisplay(property: string, value: string): void {
    const container = this.getContainer();
    if (!container) return;

    const button = container.querySelector(`[data-dropdown="${property}"]`) as HTMLElement;
    if (!button) {
      console.warn(`Service: Button not found for property: ${property}`);
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
      console.warn(`Service: Missing elements for ${property}`, { radio: !!radio, textSpan: !!textSpan });
    }

    // Close the dropdown
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

  private applyAllTextSettings(): void {
    Object.entries(this.textSettings).forEach(([property, value]) => {
      this.applyTextPersonalization(property, value as string);
      this.updateDropdownDisplay(property, value as string);
    });
  }
  /**
   * Apply text personalization styles to page content
   * Excludes container-ftwebconfomt to preserve component interface
   */
  private applyTextPersonalization(property: string, value: string): void {
    console.log(`Service: Applying ${property} = ${value} to page content`);

    const styleElement = this.getOrCreateStyleElement();
    const cssProperty = this.convertToCSSProperty(property);
    const cssRules = this.generateCSSRules(cssProperty, value);

    this.updateStyleElement(styleElement, cssProperty, cssRules);

    console.log(`Service: Applied CSS rules for ${cssProperty}:`, cssRules);
  }

  /**
   * Get existing style element or create new one
   */
  private getOrCreateStyleElement(): HTMLStyleElement {
    let styleElement = document.getElementById('ft-text-personalization') as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'ft-text-personalization';
      document.head.appendChild(styleElement);
      console.log('Service: Created new style element');
    }

    return styleElement;
  }

  /**
   * Convert camelCase property to kebab-case CSS property
   */
  private convertToCSSProperty(property: string): string {
    return property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  }

  /**
   * Generate CSS rules for text personalization
   */
  private generateCSSRules(cssProperty: string, value: string): string {
    // Apply to all elements except container-ftwebconfomt
    return `body *:not(.container-ftwebconfomt):not(.container-ftwebconfomt *) { ${cssProperty}: ${value} !important; }`;
  }

  /**
   * Update style element with new CSS rules
   */
  private updateStyleElement(styleElement: HTMLStyleElement, cssProperty: string, newRules: string): void {
    // Remove existing rules for this property
    const existingRules = styleElement.textContent || '';
    const filteredRules = existingRules
      .split('\n')
      .filter(line => !line.includes(cssProperty) && line.trim() !== '');

    // Combine filtered existing rules with new rules
    const allRules = [...filteredRules, newRules]
      .filter(rule => rule.trim() !== '')
      .join('\n');

    styleElement.textContent = allRules;
    console.log('Service: Style element updated with new CSS rules');
  }

  /**
   * Update a single text setting and apply changes
   * @param property - The text property to update (fontSize, fontFamily, etc.)
   * @param value - The new value for the property
   */
  private updateTextSetting(property: string, value: string): void {
    console.log("Service: Updating text setting", property, "to", value);

    // Update internal settings
    this.textSettings[property] = value;

    // Update dropdown display to show selection
    this.updateDropdownDisplay(property, value);

    // Apply the setting immediately for user feedback
    if (this.active) {
      this.applyTextPersonalization(property, value);
    }

    // Persist settings to localStorage
    this.saveTextSettings();
  }
  /**
   * Save current text settings to localStorage
   */
  private saveTextSettings(): void {
    try {
      localStorage.setItem("webcomfort-text-settings", JSON.stringify(this.textSettings));
      console.log("Service: Text settings saved to localStorage");
    } catch (error) {
      console.error("Service: Error saving text settings:", error);
    }
  }
  // Public method to update settings from external source
  public setTextSettings(settings: Partial<{
    fontSize: string;
    fontFamily: string;
    lineHeight: string;
    letterSpacing: string;
    wordSpacing: string;
  }>): void {
    Object.entries(settings).forEach(([key, value]) => {
      if (value !== undefined && this.textSettings.hasOwnProperty(key)) {
        this.textSettings[key] = value;
      }
    });
    if (this.active) {
      this.applyAllTextSettings();
    }
    this.saveTextSettings();
  }
  // Public method to get current settings
  public getTextSettings(): {
    fontSize: string;
    fontFamily: string;
    lineHeight: string;
    letterSpacing: string;
    wordSpacing: string;
    [key: string]: string;
  } {
    return { ...this.textSettings };
  }


  /**
   * Reset text settings to default values and remove applied styles
   */
  public resetTextSettings(): void {
    // Remove applied CSS styles from the page
    this.removePersonalizationStyles();

    // Reset internal settings to defaults
    this.textSettings = {
      fontSize: "16px",
      fontFamily: "'Open Sans', sans-serif",
      lineHeight: "1.6",
      letterSpacing: "0px",
      wordSpacing: "0px",
    };

    // Clear saved settings from localStorage
    try {
      localStorage.removeItem("webcomfort-text-settings");
      console.log("Service: Cleared saved text settings");
    } catch (error) {
      console.error("Service: Error clearing saved settings:", error);
    }

    console.log("Service: Text settings reset completed");
  }

  /**
   * Remove personalization CSS style element from the page
   */
  private removePersonalizationStyles(): void {
    const styleElement = document.getElementById('ft-text-personalization');
    if (styleElement) {
      styleElement.remove();
      console.log("Service: Removed text personalization CSS");
    }
  }
}




