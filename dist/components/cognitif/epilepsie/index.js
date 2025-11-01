import indexEpilepsie from "./template/index.html";
export class FTEpilepsie extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = indexEpilepsie;
    }
    connectedCallback() {
        console.log("Connected call back for FTEpilepsie");
        const input = this.shadowRoot.querySelector("input");
        input.addEventListener("input", () => {
            const value = input.value;
            // Dispatch a custom event
            //   this.dispatchEvent(
            //     new CustomEvent("search-change", {
            //       detail: { value },
            //       bubbles: true, // let it bubble up
            //       composed: true, // allow crossing shadow DOM
            //     })
            //   );
        });
    }
}
customElements.define("ftEpilepsie", FTEpilepsie);
//# sourceMappingURL=index.js.map