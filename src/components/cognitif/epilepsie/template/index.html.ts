import css from "./style.css";

export const template = /*html*/ `
    <style>${css}</style>
    <div class="epilepsie-container">
        <h3>Epilepsie Control</h3>
 
        <div class="toggle-container">
            <button id="btn-epilepsie" class="toggle-btn active">
                <span class="toggle-text">Activer Animation</span>
                <div class="toggle-indicator"></div>
            </button>
        </div>
        <div class="status">
            <span id="statusText">Animation: Activée</span>
        </div>
    </div>
`;
