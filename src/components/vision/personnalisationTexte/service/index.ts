/**
 * Service/Configuration class for Text Personalization component
 * This acts as a configuration provider and service layer
 */
export class FTPersonalisationTextService {
    public name = "Personnalisation du texte";
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

  public enablePersonalisation(show: boolean): void {
    this.active = show;
    this.showComponentContent(show);
    
    if (show) {
      // Apply all text settings when enabling
      this.applyAllTextSettings();
    }
  }
  
  public disablePersonalisation(): void {
    this.enablePersonalisation(false);
  }


 
public getContainer(): HTMLElement | null {
  // Try to find the container element where this component is mounted
  return  this.container || null;
}


  private initializeComponentState(): void {
      // Set initial state based on config
      setTimeout(() => {
        this.showComponentContent(this.active);
        if (this.active) {
          this.applyAllTextSettings();
        }
      }, 50);
      }
  private showComponentContent(show: boolean): void {
  
    if (!this.container) return;

    const content = this.container.querySelector(".component-content") as HTMLElement;
    const toggle =  this.container.querySelector(".component-toggle") as HTMLElement;
    
    if (content) {
      content.classList.toggle("show", show);
    }
    
    if (toggle) {
      toggle.classList.toggle("active", show);
    }
  }
  private loadTextSettings(): void {
    try {
      const savedSettings = localStorage.getItem("webcomfort-text-settings");
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        this.textSettings = { ...this.textSettings, ...settings };
      }
    } catch (error) {
      console.error("Error loading text settings:", error);
    }
  }

  
  private initializeDropdowns(): void {
    // Wait for the component to be rendered, then initialize dropdowns
    setTimeout(() => {
      const container = this.getContainer();
      if (!container) return;

      // Initialize dropdown event listeners within the component container
      container.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        if (target && target.type === "radio" && target.closest(".dropdown-options")) {
          const dropdown = target.name;
          const value = target.value;
          
          if (this.textSettings.hasOwnProperty(dropdown)) {
            this.updateTextSetting(dropdown, value);
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
    
    if (!options) return;

    // Close other dropdowns
    this.closeAllDropdowns();

    // Toggle current dropdown
    if (options.classList.contains("show")) {
      options.classList.remove("show");
      button.classList.remove("open");
    } else {
      options.classList.add("show");
      button.classList.add("open");
    }
  }

  private closeAllDropdowns(): void {
    const container = this.getContainer();
    if (!container) return;

    container.querySelectorAll(".dropdown-options.show").forEach((options) => {
      options.classList.remove("show");
      const button = options.previousElementSibling as HTMLElement;
      if (button) {
        button.classList.remove("open");
      }
    });
  }





  private updateDropdownDisplay(property: string, value: string): void {
    const container = this.getContainer();
    if (!container) return;

    const button = container.querySelector(`[data-dropdown="${property}"]`) as HTMLElement;
    if (!button) return;

    const textSpan = button.querySelector(".dropdown-text") as HTMLElement;
    const radio = container.querySelector(`input[name="${property}"][value="${value}"]`) as HTMLInputElement;
    
    if (radio && textSpan) {
      radio.checked = true;
      const label = radio.nextElementSibling as HTMLElement;
      if (label) {
        textSpan.textContent = label.textContent || value;
      }
    }

    // Close the dropdown
    const options = button.nextElementSibling as HTMLElement;
    if (options) {
      options.classList.remove("show");
      button.classList.remove("open");
    }
  }

    private applyAllTextSettings(): void {
    Object.entries(this.textSettings).forEach(([property, value]) => {
      this.applyTextPersonalization(property, value as string);
      this.updateDropdownDisplay(property, value as string);
    });
  }
  private applyTextPersonalization(property: string, value: string): void {
    const cssProperty = this.convertToCSSProperty(property);
    
    // Remove existing style element
    let styleElement = document.getElementById('ft-text-personalization-styles') as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'ft-text-personalization-styles';
      document.head.appendChild(styleElement);
    }
    
    // Build CSS rule that applies to everything except web components
    let cssRules = '';
    Object.entries(this.textSettings).forEach(([prop, val]) => {
      const cssProp = this.convertToCSSProperty(prop);
      cssRules += `
        /* Apply ${prop} to everything inside body, except inside web components */
        body *:not(main-app *):not(main-app) {
          ${cssProp}: ${val} !important;
        }
      `;
    });
    
    styleElement.textContent = cssRules;
  }

  private convertToCSSProperty(property: string): string {
    const propertyMap: { [key: string]: string } = {
      fontSize: 'font-size',
      fontFamily: 'font-family',
      lineHeight: 'line-height',
      letterSpacing: 'letter-spacing',
      wordSpacing: 'word-spacing'
    };
    return propertyMap[property] || property;
  }

  private showDropdownControls(show: boolean): void {
    const container = this.getContainer();
    if (!container) return;

    const controls = container.querySelector("#personnalisationControls") as HTMLElement;
    if (controls) {
      controls.style.display = show ? "block" : "none";
    }
  }

    private updateTextSetting(property: string, value: string): void {
    // Update internal settings
    this.textSettings[property] = value;
    
    // Update dropdown display
    this.updateDropdownDisplay(property, value);
    
    // Apply the setting if component is active
    if (this.active) {
      this.applyTextPersonalization(property, value);
    }
    
    // Save settings
    this.saveTextSettings();
  }
  private saveTextSettings(): void {
    try {
      localStorage.setItem("webcomfort-text-settings", JSON.stringify(this.textSettings));
    } catch (error) {
      console.error("Error saving text settings:", error);
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


  public resetTextSettings(): void {
    // Try multiple selectors to find the content area
    const contentArea = document.querySelector(".content-area") as HTMLElement;
    const demoContent = document.querySelector(".demo-content") as HTMLElement;
    const mainContent = document.querySelector("main") as HTMLElement;
    const bodyElement = document.body;
    
    // Apply reset to the found content area or fallback to body
    const targetElement = contentArea || demoContent || mainContent || bodyElement;
    
    if (targetElement) {
      console.log("Service: Resetting text settings on:", targetElement.className || "body");
      targetElement.style.fontSize = "";
      targetElement.style.fontFamily = "";
      targetElement.style.lineHeight = "";
      targetElement.style.letterSpacing = "";
      targetElement.style.wordSpacing = "";
      
      // Also reset internal settings to defaults
      this.textSettings = {
        fontSize: "16px",
        fontFamily: "'Open Sans', sans-serif",
        lineHeight: "1.6",
        letterSpacing: "0px",
        wordSpacing: "0px",
      };
      
      console.log("Service: Text settings reset completed");
    } else {
      console.warn("Service: No target element found for resetting text settings");
    }
  }
} 
