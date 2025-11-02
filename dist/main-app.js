export class MainApp extends HTMLElement {
    connectedCallback() { }
    constructor() {
        super();
        this.innerHTML = `
	    <div style="padding: 1rem;">
	      <h2>Main App Component</h2>
		<h5>ft-epilepsie</h5>
	      // <ft-epilepsie></ft-epilepsie>
	    </div>
	  `;
        // Attach shadow root
        const shadow = this.attachShadow({ mode: "open" });
        // Inject HTML template
        shadow.innerHTML = this.innerHTML;
    }
}
customElements.define("main-app", MainApp);
