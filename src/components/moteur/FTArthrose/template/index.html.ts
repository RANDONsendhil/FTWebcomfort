export const template = /*html*/ `
    <div class="arthrose-container">
        <div class="status">
            <span id="statusText">Curseur souris: Normal</span>
        </div>
        
        <div class="controls-section">
            <h4>Personnalisation du curseur</h4>
            
            <div class="cursor-preview-container">
                <label class="control-label">Aperçu du curseur</label>
                <div id="cursorPreview" class="cursor-preview">
                    <svg id="cursorSVG" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                        <defs>
                            <filter id="glow">
                                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                                <feMerge>
                                    <feMergeNode in="coloredBlur"/>
                                    <feMergeNode in="SourceGraphic"/>
                                </feMerge>
                            </filter>
                        </defs>
                        <path id="cursorPath" d="M 2,2 L 2,28 L 10,20 L 14,28 L 18,26 L 14,18 L 22,18 Z" 
                              fill="#000000" 
                              stroke="#000" 
                              stroke-width="1.5" 
                              filter="url(#glow)"/>
                        <path d="M 2,2 L 2,28 L 10,20 L 14,28 L 18,26 L 14,18 L 22,18 Z" 
                              fill="#000000" 
                              stroke="#fff" 
                              stroke-width="0.5"/>
                    </svg>
                </div>
            </div>

            <div class="control-group">
                <label class="control-label">Taille du curseur</label>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="cursorSize" value="normal" id="sizeNormal" checked>
                        <span>Normal (32px)</span>
                    </label>
                    
                    <label class="radio-option">
                        <input type="radio" name="cursorSize" value="moyen" id="sizeMoyen">
                        <span>Moyen (48px)</span>
                    </label>
                    
                    <label class="radio-option">
                        <input type="radio" name="cursorSize" value="grand" id="sizeGrand">
                        <span>Grand (64px)</span>
                    </label>
                </div>
            </div>

            <div class="control-group">
                <label class="control-label">Couleur du curseur</label>
                <div class="radio-group">
                    <label class="radio-option">
                        <input type="radio" name="cursorColor" value="default" id="colorDefault" checked>
                        <span>Par défaut (Noir)</span>
                    </label>
                    
                    <label class="radio-option">
                        <input type="radio" name="cursorColor" value="green" id="colorGreen">
                        <span>Vert fluorescent</span>
                    </label>
                    
                    <label class="radio-option">
                        <input type="radio" name="cursorColor" value="yellow" id="colorYellow">
                        <span>Jaune fluorescent</span>
                    </label>
                    
                    <label class="radio-option">
                        <input type="radio" name="cursorColor" value="red" id="colorRed">
                        <span>Rouge fluorescent</span>
                    </label>
                </div>
            </div>
        </div>
    </div>
`;
