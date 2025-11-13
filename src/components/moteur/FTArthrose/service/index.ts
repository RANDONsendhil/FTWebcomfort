import { disableArthrose, enableArthrose, applyCursor, removeCursor } from "./structure";

export type CursorSize = 'normal' | 'moyen' | 'grand';
export type CursorColor = 'default' | 'green' | 'yellow' | 'red';

export class FTArthroseService {
    public name = "Personnalisation du texte";
    public description = "Ajustez la taille, la police et l'espacement du texte pour améliorer la lisibilité.";
    public active: boolean = false;

    private container?: HTMLElement;
    private sizeNormalRadio: HTMLInputElement | null = null;
    private sizeMoyenRadio: HTMLInputElement | null = null;
    private sizeGrandRadio: HTMLInputElement | null = null;
    private colorDefaultRadio: HTMLInputElement | null = null;
    private colorGreenRadio: HTMLInputElement | null = null;
    private colorYellowRadio: HTMLInputElement | null = null;
    private colorRedRadio: HTMLInputElement | null = null;
    private cursorSVG: SVGElement | null = null;
    private cursorPath: SVGPathElement | null = null;
    private statusText: HTMLElement | null = null;
    
    private currentSize: CursorSize = 'normal';
    private currentColor: CursorColor = 'default';

    constructor(container?: HTMLElement) {
        console.log("FTArthroseService initialized");
        this.container = container;
        if (container) {
            this.initializeControls();
        }
    }

    private initializeControls(): void {
        if (!this.container) return;
        
        this.sizeNormalRadio = this.container.querySelector('#sizeNormal');
        this.sizeMoyenRadio = this.container.querySelector('#sizeMoyen');
        this.sizeGrandRadio = this.container.querySelector('#sizeGrand');
        this.colorDefaultRadio = this.container.querySelector('#colorDefault');
        this.colorGreenRadio = this.container.querySelector('#colorGreen');
        this.colorYellowRadio = this.container.querySelector('#colorYellow');
        this.colorRedRadio = this.container.querySelector('#colorRed');
        this.cursorSVG = this.container.querySelector('#cursorSVG');
        this.cursorPath = this.container.querySelector('#cursorPath');
        this.statusText = this.container.querySelector('#statusText');
    }

    public setupEventListeners(
        onSizeChange: (size: CursorSize) => void,
        onColorChange: (color: CursorColor) => void
    ): void {
        this.sizeNormalRadio?.addEventListener('change', () => onSizeChange('normal'));
        this.sizeMoyenRadio?.addEventListener('change', () => onSizeChange('moyen'));
        this.sizeGrandRadio?.addEventListener('change', () => onSizeChange('grand'));
        
        this.colorDefaultRadio?.addEventListener('change', () => onColorChange('default'));
        this.colorGreenRadio?.addEventListener('change', () => onColorChange('green'));
        this.colorYellowRadio?.addEventListener('change', () => onColorChange('yellow'));
        this.colorRedRadio?.addEventListener('change', () => onColorChange('red'));
    }

    public handleSizeChange(size: CursorSize, isActive: boolean): void {
        this.currentSize = size;
        this.updateCursorPreview();
        
        if (isActive) {
            applyCursor(size, this.currentColor);
        }
        
        this.updateStatusText();
    }

    public handleColorChange(color: CursorColor, isActive: boolean): void {
        this.currentColor = color;
        this.updateCursorPreview();
        
        if (isActive) {
            applyCursor(this.currentSize, color);
        }
        
        this.updateStatusText();
    }

    private updateCursorPreview(): void {
        if (!this.cursorSVG || !this.cursorPath) return;
        
        // Update size
        const sizes: Record<CursorSize, number> = {
            'normal': 32,
            'moyen': 48,
            'grand': 64
        };
        const size = sizes[this.currentSize];
        this.cursorSVG.setAttribute('width', size.toString());
        this.cursorSVG.setAttribute('height', size.toString());
        
        // Update color
        const colors: Record<CursorColor, string> = {
            'default': '#000000',
            'green': '#00ff00',
            'yellow': '#ffff00',
            'red': '#ff0000'
        };
        const color = colors[this.currentColor];
        this.cursorPath.setAttribute('fill', color);
        
        // Update the second path (inner stroke) to match
        const paths = this.cursorSVG.querySelectorAll('path');
        if (paths[1]) {
            paths[1].setAttribute('fill', color);
        }
        
        // Show message if using system cursor
        const previewContainer = this.container?.querySelector('.cursor-preview');
        if (this.currentSize === 'normal' && this.currentColor === 'default') {
            if (previewContainer) {
                const existingNote = previewContainer.querySelector('.system-cursor-note');
                if (!existingNote) {
                    const note = document.createElement('div');
                    note.className = 'system-cursor-note';
                    note.textContent = 'Curseur système';
                    note.style.cssText = 'position: absolute; bottom: 5px; font-size: 11px; color: #666; font-style: italic;';
                    previewContainer.appendChild(note);
                }
            }
        } else {
            const note = previewContainer?.querySelector('.system-cursor-note');
            if (note) {
                note.remove();
            }
        }
    }

    private updateStatusText(): void {
        if (!this.statusText) return;
        
        const sizeNames: Record<CursorSize, string> = {
            'normal': 'Normal',
            'moyen': 'Moyen',
            'grand': 'Grand'
        };
        
        const colorNames: Record<CursorColor, string> = {
            'default': 'Noir',
            'green': 'Vert fluorescent',
            'yellow': 'Jaune fluorescent',
            'red': 'Rouge fluorescent'
        };
        
        this.statusText.textContent = `Curseur: ${sizeNames[this.currentSize]} - ${colorNames[this.currentColor]}`;
    }

    public getContainer(): HTMLElement | null {
        return this.container || null;
    }

    public enableArthrose(enable: boolean): void {
        if (enable) {
            enableArthrose();
            applyCursor(this.currentSize, this.currentColor);
        } else {
            disableArthrose();
            removeCursor();
        }
    }

    public disableAllCustomizations(): void {
        removeCursor();
    }
}




