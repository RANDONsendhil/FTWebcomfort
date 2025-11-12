import cssDropDown from "./style.css";

export const template = /*html*/ `
<style>${cssDropDown}</style>

<div class="guide-lecture-container">
    
    <div class="controls-section">
        <h4>Configuration du Guide de Lecture</h4>
        
        <!-- Type de règle -->
        <div class="control-group">
            <label class="control-label">Type de règle :</label>
            <div class="button-group">
                <button type="button" class="guide-type-button active" id="guideLigne" data-value="ligne">
                    Ligne
                </button>
                <button type="button" class="guide-type-button" id="guideFocus" data-value="focus">
                    Focus
                </button>
            </div>
        </div>
        
        <div class="control-group">
            <label class="control-label" for="guideColor">Couleur de la règle :</label>
            <div class="color-input-container">
                <input type="color" id="guideColor" value="#3a3a3a" class="color-picker">
                <span class="color-preview"></span>
            </div>
        </div>
        
        <div class="control-group">
            <label class="control-label" for="guideSize">Épaisseur de la règle :</label>
            <div class="size-control">
                <input type="range" id="guideSize" min="1" max="100" value="10" class="size-slider">
                <span class="size-value">3px</span>
            </div>
        </div>
        
        <div class="control-group">
            <label class="control-label" for="guideOpacity">Transparence :</label>
            <div class="opacity-control">
                <input type="range" id="guideOpacity" min="0.1" max="1" step="0.1" value="0.7" class="opacity-slider">
                <span class="opacity-value">70%</span>
            </div>
        </div>
    </div>
</div>
`;

 

 