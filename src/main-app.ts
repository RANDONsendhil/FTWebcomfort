export class MainApp extends HTMLElement {
	connectedCallback() {}

	constructor() {
		super();
		this.innerHTML = `
		  <h2>Main App Component</h2>
	    <div style="padding: 2px;">
		    <ft-epilepsie></ft-epilepsie>
	    </div>
		  <div style="padding: 2px;">
			<ft-dyslexie></ft-dyslexie>
		</div>
	  `;
		// Attach shadow root
		const shadow = this.attachShadow({ mode: "open" });

		// Inject HTML template
		shadow.innerHTML = this.innerHTML;
	}
}

customElements.define("main-app", MainApp);
