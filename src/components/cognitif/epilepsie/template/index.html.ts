import css from "./style.css";
import animation from "./animation.gif";

export default /*html*/ `
    <style>${css}</style>
    <div class="container">
        <div class="toggle-container">
        <div class="comp-container">
         <h3 id="componentName"></h3>
            <button class="toggle-btn inactive">
                <div class="toggle-indicator"></div>
            </button>
            </div>
        </div>
        <div class="status">
            <span id="statusText">Animation: Activée</span>
        </div>
    </div>
`;
