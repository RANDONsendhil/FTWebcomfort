export default /*html*/ `
    <div class="status">
        <span id="statusText">Mode d'affichage: Normal</span>
    </div>
    
    <div class="controls-section">
        <h4>Mode d'affichage</h4>
        
        <div class="control-group">
            <div class="radio-group">
                <label class="radio-option">
                    <input type="radio" name="displayMode" value="normal" id="normalBtn" checked>
                    <span>Normal</span>
                </label>
                
                <label class="radio-option">
                    <input type="radio" name="displayMode" value="darkMode" id="darkModeBtn">
                    <span>Mode sombre</span>
                </label>
                
                <label class="radio-option">
                    <input type="radio" name="displayMode" value="coulorBlindess" id="coulorBlindessBtn">
                    <span>Daltonisme</span>
                </label>
                
                <label class="radio-option">
                    <input type="radio" name="displayMode" value="modeHighContrast" id="modeHighContrastBtn">
                    <span>Contraste élevé</span>
                </label>
                
                <label class="radio-option">
                    <input type="radio" name="displayMode" value="modeSoften" id="modeSoftenBtn">
                    <span>Mode adouci</span>
                </label>
            </div>
        </div>
    </div>
`;
