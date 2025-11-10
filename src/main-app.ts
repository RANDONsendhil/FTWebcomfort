import mainStyle from "./style.css";

 

declare global {
  interface Window {
    loadModules?: (container: HTMLElement | ShadowRoot) => void;
  }
}

export class MainApp extends HTMLElement {
  private shadow: ShadowRoot;

  constructor() {
    super();

    // Use shadow DOM for proper isolation
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.innerHTML = `
        <style>${mainStyle}</style>
        <div class="container-ftwebconfomt">
            <aside class="sidebar">
                <div class="sidebar-header">
                    <div class="logo">Webcomfort</div>
                    <div class="subtitle">Accessibilité intelligente visuelle</div>
                    <button class="close-sidebar-btn" id="closeSidebarBtn" title="Fermer le panneau">✕</button>
                </div>

                <div class="stats-section">
                    <h3 class="stats-title">Statistiques d'usage</h3>
                    <div class="stats-grid">
                        <div class="stat-item">
                            <span class="stat-number" id="activeComponents">0</span>
                            <span class="stat-label">Actifs</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number" id="totalComponents">7</span>
                            <span class="stat-label">Total</span>
                        </div>
                    </div>
                </div>

                <div class="components-section">
                    <h3 class="components-title">Composants disponibles</h3>
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
                </div>
            </aside>
        </div>
    `;
  }

  connectedCallback() {
    console.log("MainApp connected to DOM");
    console.log("Shadow DOM contents:", this.shadow.innerHTML);
    
    // Add event listeners for sidebar functionality
    this.setupEventListeners();
    
    // Wait for loadModules to be available and then load modules
    this.waitForLoadModules();
  }

  private setupEventListeners() {
    const closeBtn = this.shadow.querySelector('#closeSidebarBtn');
    const sidebar = this.shadow.querySelector('.sidebar');
    
    if (closeBtn && sidebar) {
      closeBtn.addEventListener('click', () => {
        sidebar.classList.toggle('closed');
        console.log('Sidebar toggled');
      });
    }
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
