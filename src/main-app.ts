const innerHTML = ``

declare global {
  interface Window {
    loadModules?: (shadow: ShadowRoot) => void;
  }
}

export class MainApp extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();

    // Attach shadow DOM
    this.shadow = this.attachShadow({ mode: "open" });

    // Inject main HTML structure
    this.shadow.innerHTML = `
 
      <div style="padding: 2px;">
        <div id="personnalisationTexteContainer"></div>
      </div>
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
    console.log("MainApp connected to DOM");
    console.log("Shadow DOM contents:", this.shadow.innerHTML);
    
    // Wait for loadModules to be available and then load modules
    this.waitForLoadModules();
  }

  private waitForLoadModules() {
    if (window.loadModules) {
      console.log("loadModules function found, calling it...");
      window.loadModules(this.shadow);
    } else {
      console.warn("window.loadModules not found - retrying in 100ms...");
      // Retry after a short delay
      setTimeout(() => this.waitForLoadModules(), 100);
    }
  }
}

customElements.define("main-app", MainApp);
