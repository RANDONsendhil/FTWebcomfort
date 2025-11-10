/**
 * Service/Configuration class for Text Personalization component
 * This acts as a configuration provider and service layer
 */

import { disableAnimations, enableAnimations } from "./index";
export class FTEpilepsieStructure {
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
        
        // Initialize text settings
        this.textSettings = {
            fontSize: "16px",
            fontFamily: "'Open Sans', sans-serif",
            lineHeight: "1.6",
            letterSpacing: "0px",
            wordSpacing: "0px",
        };
        
      
        this.initializeComponentState();
    }

  public  enablePersonalisation(show: boolean): void {
 
    enableAnimations()
  }
  
  public disablePersonalisation(): void {
 
    disableAnimations()
  }
 
public getContainer(): HTMLElement | null {
  // Try to find the container element where this component is mounted
  return  this.container || null;
}


  private initializeComponentState(): void {
      // Set initial state based on config
      setTimeout(() => {
    
        
      }, 50);
      }


} 




