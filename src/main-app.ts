export class MainApp extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();

    // Attach shadow DOM
    this.shadow = this.attachShadow({ mode: "open" });

    // Inject main HTML structure
    this.shadow.innerHTML = `
      <h2>Main App Component</h2>
      <div style="padding: 2px;">
        <div id="epilepsieContainer"></div>
      </div>
      <div style="padding: 2px;">
        <div id="dyslexieContainer"></div>
      </div>
      <div style="padding: 2px;">
        <div id="arthroseContainer"></div>
      </div>
    `;
  }

  connectedCallback() {
    // Load modules from app.ts
    if (window.loadModules) {
      window.loadModules(this.shadow);
    }
  }
}

customElements.define("main-app", MainApp);
