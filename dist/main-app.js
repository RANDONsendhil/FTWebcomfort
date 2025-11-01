"use strict";
class MainApp extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
      <webcomfort-ftEpilepsie></webcomfort-ftEpilepsie>
    `;
    }
}
customElements.define("ft-webcomfort", MainApp);
//# sourceMappingURL=main-app.js.map