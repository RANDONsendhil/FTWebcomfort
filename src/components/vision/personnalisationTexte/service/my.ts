/**
 * Service/Configuration class for Text Personalization component
 * This acts as a configuration provider and service layer
 */
export class FTPersonalisationTextService {
  public name = "Personnalisation du texte";
  public description = "Ajustez la taille, la police et l'espacement du texte pour améliorer la lisibilité.";
  public active: boolean = false;

  private container?: HTMLElement;
  private textSettings: {
    fontSize: string;
    fontFamily: string;
    lineHeight: string;
    letterSpacing: string;
    wordSpacing: string;
    [key: string]: string;
  };

  constructor(container?: HTMLElement) {
    console.log("FTPersonalisationTextService initialized");
    this.container = container;

    // Initialize text settings with VERY visible values for testing
    this.textSettings = {
      fontSize: "16px",          // ÉNORME pour être impossible à rater
      fontFamily: "Times New Roman, serif",  // Police très différente
      lineHeight: "3.0",         // Espacement énorme
      letterSpacing: "3px",      // Très visible
      wordSpacing: "8px",        // Très visible
    };

    // CLEAR localStorage to force use of test values
    localStorage.removeItem("webcomfort-text-settings");
    console.log("DEBUG: Cleared localStorage to use test values");
    
    // Don't load saved settings - use test values
    // this.loadTextSettings();
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
    console.warn("SERVICE: === ENABLE PERSONALISATION CALLED ===", enable);
    this.active = enable;
    console.warn("SERVICE: Active state set to:", this.active);

    if (enable) {
      console.warn("SERVICE: About to apply all text settings...");
      this.applyAllTextSettings();
      console.warn("SERVICE: Apply all text settings completed");
    } else {
      console.warn("SERVICE: Resetting text settings...");
      this.resetTextSettings();
    }
    console.warn("SERVICE: === ENABLE PERSONALISATION COMPLETED ===");
  }

  /**
   * Disable text personalization (convenience method)
   */
  public disablePersonalisation(): void {
    this.enablePersonalisation(false);
  }


  private initializeComponentState(): void {
    setTimeout(() => {
      // Always initialize dropdown displays to match current settings
      Object.entries(this.textSettings).forEach(([property, value]) => {
        this.updateDropdownDisplay(property, value as string);
      });
      
      // Apply settings only if component is active
      if (this.active) {
        this.applyAllTextSettings();
      }
    }, 100);
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
    // Only apply settings if personalization is active
    if (!this.active) {
      console.log("Service: Personalization not active, skipping text settings application");
      return;
    }
    
    console.log("Service: Applying ALL text settings in one go");
    
    // Apply all settings at once instead of one by one
    this.applyDirectToAllElements();
    
    // Update dropdown displays
    Object.entries(this.textSettings).forEach(([property, value]) => {
      this.updateDropdownDisplay(property, value as string);
    });
  }
  /**
   * Apply text personalization styles to page content
   * Use direct DOM manipulation to bypass Shadow DOM issues
   */
  private applyTextPersonalization(property: string, value: string): void {
    console.log(`Service: Applying ${property} = ${value} using direct DOM manipulation`);

    // Apply to ALL elements on the page using direct style manipulation
    this.applyDirectToAllElements();
    
    console.log(`Service: Applied styles directly to all page elements`);
  }

  /**
   * Apply text settings using targeted CSS injection only
   * This applies styles to textual elements while preserving UI controls
   */
  private applyDirectToAllElements(): void {
    console.log(`Service: Applying styles via targeted CSS injection`);

    // Inject CSS with targeted selectors for textual elements only
    // DO NOT apply to html/body as that affects the entire page including UI controls
    this.injectTextPersonalizationCSS();

    console.log(`Service: Applied text personalization via CSS injection`);
  }

  /**
   * Create and inject CSS into document head
   * Use simple, broad selectors with specific exclusions
   */
  private injectTextPersonalizationCSS(): void {
    // Remove existing style element
    this.removePersonalizationStyles();
    
    // Create new style element
    const style = document.createElement("style");
    style.id = "ft-text-personalization";
    
    // Build CSS with all current settings
    let cssContent = "";
    
    Object.entries(this.textSettings).forEach(([property, value]) => {
      const cssProperty = this.convertToCSSProperty(property);
      
      // Apply to common textual elements, excluding specific UI containers
      const textSelectors = [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'p', 'li', 'blockquote', 'dd', 'dt',
        'a', 'span', 'strong', 'em', 'small',
        'td', 'th', 'caption', 'figcaption', 'div', 'label'
      ];

      textSelectors.forEach(sel => {
        cssContent += `
          body ${sel} {
              ${cssProperty}: ${value} !important;
          }`;
      });
      
      // Override for UI elements to prevent styling
      const uiExclusions = [
        '.container-ftwebconfomt', '.container-ftwebconfomt *',
        '#personnalisationControls', '#personnalisationControls *',
        '.sidebar', '.sidebar *',
        '.dropdown-option', '.dropdown-option *',
        '.dropdown-options', '.dropdown-options *',
        '.dropdown-button', '.dropdown-button *',
        '.custom-dropdown', '.custom-dropdown *',
        '.component-card', '.component-card *'
      ];
      
      uiExclusions.forEach(exclusion => {
        cssContent += `
          ${exclusion} {
              ${cssProperty}: unset !important;
          }`;
      });
    });
    
    style.textContent = cssContent;
    document.head.appendChild(style);
    
    console.log("Service: CSS injected into head with", Object.keys(this.textSettings).length, "properties");
  }

  /**
   * Apply styles directly to DOM elements using JavaScript
   */
  private applyStylesDirectly(cssProperty: string, value: string): void {
    // Target content areas specifically
    const contentSelectors = [
      '.content-area *',
      '.demo-section *', 
      '.demo-content *',
      '.demo-title',
      '.demo-subtitle',
      '.feature-title',
      '.feature-description',
      'h1, h2, h3, h4, h5, h6',
      'p, div, span, li, td, th, a, label'
    ];

    let elementsModified = 0;

    contentSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element: Element) => {
          const htmlElement = element as HTMLElement;
          // Skip FTWebcomfort interface elements
          if (!htmlElement.closest('.container-ftwebconfomt') && 
              !htmlElement.closest('.sidebar') &&
              !htmlElement.classList.contains('container-ftwebconfomt')) {
            
            // Apply style directly to the element
            htmlElement.style.setProperty(cssProperty, value, 'important');
            elementsModified++;
          }
        });
      } catch (error) {
        console.warn('Service: Error applying direct styles with selector:', selector, error);
      }
    });

    console.log(`Service: Modified ${elementsModified} elements directly with ${cssProperty}: ${value}`);
  }

  /**
   * Mark content elements with data attribute for CSS targeting
   */
  private markContentElements(): void {
    try {
      const uniqueId = Date.now().toString();
      
      // Target main content areas
      const contentSelectors = [
        '.content-area',
        '.demo-section', 
        '.demo-content',
        'main',
        'article',
        'section:not(.sidebar):not(.components-section)',
        'div:not(.container-ftwebconfomt):not(.sidebar):not(.sidebar *)'
      ];

      contentSelectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(element => {
            if (!element.closest('.container-ftwebconfomt') && !element.closest('.sidebar')) {
              element.setAttribute('data-ft-text-personalization', uniqueId);
            }
          });
        } catch (error) {
          console.warn('Service: Error marking elements with selector:', selector, error);
        }
      });
    } catch (error) {
      console.error('Service: Error in markContentElements:', error);
    }
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
    // Map specific properties to their correct CSS names
    const propertyMap: { [key: string]: string } = {
      fontSize: 'font-size',
      fontFamily: 'font-family',
      lineHeight: 'line-height',
      letterSpacing: 'letter-spacing',
      wordSpacing: 'word-spacing'
    };

    return propertyMap[property] || property.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);
  }

  /**
   * Generate CSS rules for text personalization
   * Copy exact approach from dyslexie component that works
   */
  private generateCSSRules(cssProperty: string, value: string): string {
    // Use the EXACT same pattern as dyslexie component - this is proven to work
    return `
        /* Apply text personalization excluding container-ftwebconfomt */
        body *:not(.container-ftwebconfomt):not(.container-ftwebconfomt *) {
            ${cssProperty}: ${value} !important;
        }
    `;
  }

  /**
   * Update style element with new CSS rules
   * EXACT copy of dyslexie approach that works
   */
  private updateStyleElement(styleElement: HTMLStyleElement, cssProperty: string, value: string): void {
    // Build CSS exactly like dyslexie does - all properties at once
    let completeCSS = '';
    
    Object.entries(this.textSettings).forEach(([property, settingValue]) => {
      const cssProp = this.convertToCSSProperty(property);
      completeCSS += `
        /* Apply ${property} excluding container-ftwebconfomt */
        body *:not(.container-ftwebconfomt):not(.container-ftwebconfomt *) {
            ${cssProp}: ${settingValue} !important;
        }
      `;
    });

    styleElement.textContent = completeCSS;
    console.log('Service: Updated style element with all text settings');
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

    // Apply ALL settings immediately (not just the changed one)
    if (this.active) {
      console.log("Service: Reapplying all text settings after change");
      this.applyDirectToAllElements();
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
   * Remove personalization styles from document
   */
  private removePersonalizationStyles(): void {
    // Remove injected CSS style element
    const existingStyle = document.getElementById("ft-text-personalization");
    if (existingStyle) {
      existingStyle.remove();
    }

    console.log(`Service: Removed text personalization CSS`);
  }

  /**
   * Remove direct JavaScript styles from elements
   */
  private removeDirectStyles(): void {
    const contentSelectors = [
      '.content-area *',
      '.demo-section *', 
      '.demo-content *',
      '.demo-title',
      '.demo-subtitle',
      '.feature-title',
      '.feature-description',
      'h1, h2, h3, h4, h5, h6',
      'p, div, span, li, td, th, a, label'
    ];

    let elementsReset = 0;
    const cssProperties = ['font-size', 'font-family', 'line-height', 'letter-spacing', 'word-spacing'];

    contentSelectors.forEach(selector => {
      try {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element: Element) => {
          const htmlElement = element as HTMLElement;
          if (!htmlElement.closest('.container-ftwebconfomt') && 
              !htmlElement.closest('.sidebar')) {
            
            // Remove the specific CSS properties we applied
            cssProperties.forEach(prop => {
              htmlElement.style.removeProperty(prop);
            });
            elementsReset++;
          }
        });
      } catch (error) {
        console.warn('Service: Error removing direct styles with selector:', selector, error);
      }
    });

    console.log(`Service: Reset styles on ${elementsReset} elements`);
  }
}
