import globalcss from "./global.css";

export const createGlobalTemplate = (componentName: string, content: string) => {
	return /*html*/ `
        <style>${globalcss}</style>
        <div class="container">
            <div class="toggle-container">
                <div class="comp-container">
                    <h3 id="componentName">${componentName}</h3>
                    <button class="toggle-btn inactive">
                        <div class="toggle-indicator"></div>
                    </button>
                </div>
            </div>
            ${content}
        </div>
    `;
};
