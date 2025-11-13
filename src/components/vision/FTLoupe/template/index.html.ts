import cssLoupe from "./style.css";

export default /*html*/ `
<style>${cssLoupe}</style>

<div class="guide-lecture-container">
    
    <div class="status">
        <span id="statusText">Loupe: Activée</span>
    </div>
    
    <div class="controls-section">
        <h5>Configuration de la Loupe</h5>
        <div class="control-group">
            <label class="control-label">Type de loupe :</label>
            <div class="button-group">
                <button type="button" id="zoomButton" class="loupe-type-btn active" data-type="zoom">Zoom</button>
                <button type="button" id="lensButton" class="loupe-type-btn" data-type="lens">Loupe</button>
            </div>
        </div>
        <div class="control-group">
            <label class="control-label" for="zoomSlider">Niveau de zoom : <span id="zoomDisplay">1.5x</span></label>
            <input type="range" id="zoomSlider" min="1" max="5" step="0.1" value="1.5">
        </div>
    </div>
</div>
`;
