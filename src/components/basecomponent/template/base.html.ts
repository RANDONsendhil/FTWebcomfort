import globalcss from "./base.css";

export const createGlobalTemplate = (componentName: string, template: string, description: string) => {
	return /*html*/ `
        <style>${globalcss}</style>
        <div class="component-card">
            <div class="component-header" data-component="dataComponent">
                <span class="component-title">${componentName}</span>
                <div class="component-toggle" data-toggle="dataComponent"></div>
            </div>
            <div class="component-content" data-content="dataComponent">
                <div class="component-description">
                    ${description}
                </div>
                ${template}
            </div>
        </div>`;
};
