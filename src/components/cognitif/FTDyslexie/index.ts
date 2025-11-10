import { template, dropDown } from "./template/index.html";
import { disableFontDys, enableFontDys, changeFontDys } from "./service/index";
import { FTWebconfortBaseComponent } from "../../abscomp/abscomp";

/** Configuration for Dyslexie component */
export class FTDysConfig {
	readonly name = "Dyslexie";
	active = false;
	readonly description = "Enable dyslexie-friendly fonts to improve readability.";
	readonly template = template;
}

/** Dyslexie component as a plain TypeScript module */
export class FTDyslexie extends FTWebconfortBaseComponent<FTDysConfig> {
	private $dropdownContainer?: HTMLElement | null;
	private $fontSelect?: HTMLSelectElement | null;

	constructor(container: HTMLElement) {
		super(container, new FTDysConfig());
		console.log("FTDyslexie component initialized");

		// Initialize dropdown container
		this.$dropdownContainer = container.querySelector("#dropdown-container") || null;
	}

	protected override onActivate(): boolean {
		console.log("on activate ==> Dyslexie activated, showing dropdown");
		super.onActivate();

		console.info(`[${this.config.name}] Activated`);
		const success = (super.onActivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = true;
			this.showDropdown();
			this.updateText();
			return success;
		}
		return false;
	}

	protected override onDeactivate(): boolean {
		console.info(`[${this.config.name}] Deactivated`);
		const success = (super.onDeactivate?.() ?? true) as boolean;
		if (success) {
			this.config.active = false;
			this.hideDropdown();
			disableFontDys();
			this.updateText();
			return success;
		}
		return false;
	}

	protected override updateText(): void {
		if (!this.$textStatus) return;
		this.$textStatus.textContent = this.active ? "Dyslexie: Activée" : "Dyslexie: Désactivée";
	}

	private showDropdown(): void {
		if (!this.$dropdownContainer) {
			console.error("Dropdown container not found!");
			return;
		}

		this.$dropdownContainer.innerHTML = dropDown;
		this.$dropdownContainer.style.display = "block";
		this.$fontSelect = this.$dropdownContainer.querySelector("#fontDys") || null;
		this.attachSelectListener();
	}

	private hideDropdown(): void {
		if (!this.$dropdownContainer) return;

		if (this.$fontSelect) {
			this.$fontSelect.removeEventListener("change", this.handleFontChange);
		}
		this.$dropdownContainer.innerHTML = "";
		this.$dropdownContainer.style.display = "none";
		this.$fontSelect = null;
	}

	private attachSelectListener(): void {
		if (!this.$fontSelect) {
			console.error("Font select element not found!");
			return;
		}

		// Set default font
		if (this.$fontSelect.options.length > 0) {
			this.$fontSelect.selectedIndex = 0;
			changeFontDys(this.$fontSelect.value);
		}

		this.$fontSelect.addEventListener("change", this.handleFontChange);
	}

	private handleFontChange = (e: Event): void => {
		const select = e.target as HTMLSelectElement;
		const fontValue = select.value;

		console.log(`Font selected: ${fontValue}`);
		if (fontValue) {
			changeFontDys(fontValue);
		}
	};

	/** Optional method to manually show dropdown */
	public showDysFonts(): void {
		this.showDropdown();
	}
}
