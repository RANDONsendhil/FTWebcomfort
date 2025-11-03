import { LitElement, html, css } from "lit";
import { template } from "./template/index.html";

export class FTEpilepsie extends HTMLElement {
	constructor() {
		console.log("FTEpilepsie component initialized");
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.innerHTML = template;
	}
}

customElements.define("ft-epilepsie", FTEpilepsie);
