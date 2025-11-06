import { template, dropDown } from "./template/index.html";
import { disableFontDys, enableFontDys, changeFontDys } from "./service/index";
import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";

export class FTDysConfig {
	name = "Dyslexie";
	active: boolean = true;
}

export class FTDyslexie extends FTWebconfortBaseComponent<FTDysConfig> {
	private $dropdownContainer?: HTMLElement | null;
	private $fontSelect?: HTMLSelectElement | null;

	constructor() {
		super("Dyslexie", template, new FTDysConfig());
		console.log("FTDysConfig component initialized");
	}

	connectedCallback(): void {
		super.connectedCallback();
		this.$dropdownContainer = this.shadowRoot?.querySelector("#dropdown-container") || null;
	}

	protected onActivate(event?: Event): void {
		console.log("on activate ==> Dyslexie activated, showing dropdown");
		this.showDropdown();
	}

	protected onDeactivate(event?: Event): void {
		console.log("on deactivate ==> Dyslexie deactivated, hiding dropdown");
		this.hideDropdown();
		// Remove the dyslexia font when deactivated
		disableFontDys();
	}

	protected updateText(): void {
		if (!this.$textStatus) return;
		this.$textStatus.textContent = this.active ? "Dyslexie: Activée" : "Dyslexie: Désactivée";
	}

	private showDropdown(): void {
		console.log("showDropdown called, container:", this.$dropdownContainer);
		if (!this.$dropdownContainer) {
			console.error("Dropdown container not found!");
			return;
		}

		// Inject the dropdown HTML
		this.$dropdownContainer.innerHTML = dropDown;
		this.$dropdownContainer.style.display = "block";
		// Get reference to select element and add event listener
		this.$fontSelect = this.shadowRoot?.querySelector("#fontDys") || null;
		this.attachSelectListener();
	}

	private hideDropdown(): void {
		if (!this.$dropdownContainer) return;

		// Remove event listener before clearing
		if (this.$fontSelect) {
			this.$fontSelect.removeEventListener("change", this.handleFontChange);
		}

		// Clear dropdown content
		this.$dropdownContainer.innerHTML = "";
		this.$dropdownContainer.style.display = "none";
		this.$fontSelect = null;
	}

	private attachSelectListener(): void {
		if (!this.$fontSelect) {
			console.error("Font select element not found!");
			return;
		}
		// Set the first option as selected by default
		if (this.$fontSelect.options.length > 0) {
			this.$fontSelect.selectedIndex = 0;
			const firstValue = this.$fontSelect.value;
			console.log(`Default font selected: ${firstValue}`);
			changeFontDys(firstValue);
		}

		this.$fontSelect.addEventListener("change", this.handleFontChange);
	}

	private handleFontChange = (e: Event): void => {
		const select = e.target as HTMLSelectElement;
		const fontValue = select.value;

		console.log(`Font selected: ${fontValue}`);

		if (fontValue) {
			// Apply the font change
			changeFontDys(fontValue);
		}
	};

	_showDysFonts() {
		this.showDropdown();
	}
}

customElements.define("ft-dyslexie", FTDyslexie);
