import { disableArthrose, enableArthrose } from "./structure";

export class FTArthroseService {
    public name = "Personnalisation du texte";
    public description = "Ajustez la taille, la police et l'espacement du texte pour améliorer la lisibilité.";
    public active: boolean = false;

    private container?: HTMLElement;


    constructor(container?: HTMLElement) {
        console.log("FTPersonalisationTextService initialized");
        this.container = container;
    }

    public getContainer(): HTMLElement | null {
        // Try to find the container element where this component is mounted
        return this.container || null;
    }

    public enableArthrose(enable: boolean): void {
        if (enable) {
            enableArthrose();
        } else {
            disableArthrose();
        }
    }
}




