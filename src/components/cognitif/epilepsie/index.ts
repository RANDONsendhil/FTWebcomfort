import { template } from "./template/index.html.js";

export class FTEpilepsie extends HTMLElement {
	constructor() {
		console.log("FTEpilepsie component initialized");
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = template;
	}
}

customElements.define("ft-epilepsie", FTEpilepsie);
