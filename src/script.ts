// Interface de démonstration pour l'accessibilité
export class AccessibilityPanel {
	components: Map<string, boolean>;
	sidebarOpen: boolean;
	// Text settings moved to FTPersonalisationText component

	constructor() {
		this.components = new Map();
		this.sidebarOpen = true;
		this.loadSettings();
		this.initializeComponents();
		this.bindEvents();
		this.updateStats();
		this.bindSidebarEvents();
		this.applySavedSettings();
	}

	initializeComponents(): void {
		// Initialise tous les composants comme inactifs
		const componentNames = ["textPersonalization", "dyslexia", "epilepsy", "readingGuide", "darkMode", "magnifier", "letterSpacing"];

		componentNames.forEach((name) => {
			this.components.set(name, false);
		});
	}

	loadSettings(): void {
		try {
			// Charger les états des composants
			const savedComponents = localStorage.getItem("webcomfort-components");
			if (savedComponents) {
				const componentData = JSON.parse(savedComponents);
				Object.entries(componentData).forEach(([name, isActive]) => {
					this.components.set(name, isActive as boolean);
				});
			}

			// Text settings are now handled by FTPersonalisationText component

			// Charger l'état de la sidebar
			const savedSidebarState = localStorage.getItem("webcomfort-sidebar-open");
			if (savedSidebarState !== null) {
				this.sidebarOpen = JSON.parse(savedSidebarState);
			}
		} catch (error) {
			console.warn("Error loading settings from localStorage:", error);
		}
	}

	saveSettings(): void {
		try {
			// Sauvegarder les états des composants
			const componentData: { [key: string]: boolean } = {};
			this.components.forEach((isActive, name) => {
				componentData[name] = isActive;
			});
			localStorage.setItem("webcomfort-components", JSON.stringify(componentData));

			// Text settings are now saved by FTPersonalisationText component

			// Sauvegarder l'état de la sidebar
			localStorage.setItem("webcomfort-sidebar-open", JSON.stringify(this.sidebarOpen));
		} catch (error) {
			console.warn("Error saving settings to localStorage:", error);
		}
	}

	applySavedSettings(): void {
		// Text personalization is now handled by FTPersonalisationText component

		// Appliquer les états des composants
		this.components.forEach((isActive, component) => {
			if (isActive) {
				const toggle = document.querySelector(`[data-toggle="${component}"]`);
				const content = document.querySelector(`[data-content="${component}"]`);

				if (toggle && content) {
					toggle.classList.add("active");
					content.classList.add("show");
					this.applyComponentEffect(component, true);
				}
			}
		});

		// Appliquer l'état de la sidebar
		if (!this.sidebarOpen) {
			setTimeout(() => this.closeSidebar(), 100);
		}
	}

	updateDropdownDisplay(property: string, value: string): void {
		const button = document.querySelector(`[data-dropdown="${property}"]`) as HTMLElement;
		if (button) {
			const radio = document.querySelector(`input[name="${property}"][value="${value}"]`) as HTMLInputElement;
			if (radio) {
				radio.checked = true;
				const label = radio.nextElementSibling as HTMLElement;
				const textSpan = button.querySelector(".dropdown-text") as HTMLElement;
				if (textSpan && label) {
					textSpan.textContent = label.textContent;
				}
			}
		}
	}

	bindEvents(): void {
		// Événements pour les en-têtes de composants (toggle)
		document.querySelectorAll(".component-header").forEach((header) => {
			header.addEventListener("click", (e) => {
				const component = header.getAttribute("data-component");
				if (!component) return;
				
				const content = document.querySelector(`[data-content="${component}"]`);
				const toggle = document.querySelector(`[data-toggle="${component}"]`);

				// Toggle du contenu
				if (content) {
					content.classList.toggle("show");
				}

				// Toggle de l'état du composant
				const isActive = !this.components.get(component);
				this.components.set(component, isActive);

				// Mise à jour de l'affichage du toggle
				if (toggle) {
					if (isActive) {
						toggle.classList.add("active");
					} else {
						toggle.classList.remove("active");
					}
				}

				this.updateStats();
				this.applyComponentEffect(component, isActive);
				this.saveSettings();
			});
		});
	}

	initializeDropdowns(): void {
		// Événements pour les dropdowns personnalisés
		document.querySelectorAll(".dropdown-button").forEach((button) => {
			button.addEventListener("click", (e) => {
				e.stopPropagation();
				const dropdown = button.getAttribute("data-dropdown");
				const options = button.nextElementSibling;

				// Fermer tous les autres dropdowns
				document.querySelectorAll(".dropdown-options.show").forEach((otherOptions) => {
					if (otherOptions !== options) {
						otherOptions.classList.remove("show");
						if (otherOptions.previousElementSibling) {
							otherOptions.previousElementSibling.classList.remove("open");
						}
					}
				});

				// Toggle du dropdown courant
				if (options) {
					options.classList.toggle("show");
				}
				button.classList.toggle("open");
			});
		});

		// Événements pour les options de dropdown
		document.querySelectorAll('.dropdown-option input[type="radio"]').forEach((radio) => {
			radio.addEventListener("change", (e) => {
				if (!e.target) return;
				const target = e.target as HTMLInputElement;
				const dropdown = target.name;
				const value = target.value;
				const label = target.nextElementSibling?.textContent;

				// Mettre à jour le texte du bouton
				const button = document.querySelector(`[data-dropdown="${dropdown}"]`) as HTMLElement;
				const textSpan = button?.querySelector(".dropdown-text") as HTMLElement;
				if (textSpan && label) {
					textSpan.textContent = label;
				}

				// Fermer le dropdown
				const options = button?.nextElementSibling as HTMLElement;
				if (options && button) {
					options.classList.remove("show");
					button.classList.remove("open");
				}

				// Text personalization is now handled by FTPersonalisationText component
				console.log("Text setting change delegated to FTPersonalisationText component");
				this.saveSettings();
			});
		});

		// Fermer les dropdowns en cliquant ailleurs
		document.addEventListener("click", (e) => {
			const target = e.target as HTMLElement;
			if (target && !target.closest(".custom-dropdown")) {
				document.querySelectorAll(".dropdown-options.show").forEach((options) => {
					options.classList.remove("show");
					const prevSibling = options.previousElementSibling as HTMLElement;
					if (prevSibling) {
						prevSibling.classList.remove("open");
					}
				});
			}
		});
	}

	// applyTextPersonalization method moved to FTPersonalisationText component

	applyComponentEffect(component: string, isActive: boolean): void {
		const body = document.body;
		const contentArea = document.querySelector(".content-area") as HTMLElement;

		switch (component) {
			case "textPersonalization":
				// Text personalization is now handled by FTPersonalisationText component
				break;

			case "dyslexia":
				if (isActive) {
					contentArea.style.fontFamily = "OpenDyslexic, Arial, sans-serif";
				} else {
					contentArea.style.fontFamily = "";
				}
				break;

			case "epilepsy":
				if (isActive) {
					body.style.animation = "none";
					body.style.transition = "none";
				} else {
					body.style.animation = "";
					body.style.transition = "";
				}
				break;

			case "readingGuide":
				// Implémentation du guide de lecture
				break;

			case "darkMode":
				if (isActive) {
					body.style.filter = "invert(1) hue-rotate(180deg)";
				} else {
					body.style.filter = "";
				}
				break;

			case "magnifier":
				// Implémentation de la loupe
				break;

			case "letterSpacing":
				if (isActive) {
					contentArea.style.letterSpacing = "0.1em";
					contentArea.style.wordSpacing = "0.2em";
				} else {
					contentArea.style.letterSpacing = "";
					contentArea.style.wordSpacing = "";
				}
				break;
		}
	}

	bindSidebarEvents(): void {
		const closeSidebarBtn = document.getElementById("closeSidebarBtn");
		const openSidebarBtn = document.getElementById("openSidebarBtn");

		if (closeSidebarBtn) {
			closeSidebarBtn.addEventListener("click", () => {
				this.closeSidebar();
			});
		}

		if (openSidebarBtn) {
			openSidebarBtn.addEventListener("click", () => {
				this.openSidebar();
			});
		}
	}

	closeSidebar(): void {
		const sidebar = document.querySelector(".sidebar") as HTMLElement;
		const contentArea = document.querySelector(".content-area") as HTMLElement;
		const openBtn = document.getElementById("openSidebarBtn") as HTMLElement;

		if (sidebar) sidebar.classList.add("closed");
		if (contentArea) contentArea.classList.add("sidebar-closed");
		if (openBtn) openBtn.classList.add("show");
		this.sidebarOpen = false;
		this.saveSettings();
	}

	openSidebar(): void {
		const sidebar = document.querySelector(".sidebar") as HTMLElement;
		const contentArea = document.querySelector(".content-area") as HTMLElement;
		const openBtn = document.getElementById("openSidebarBtn") as HTMLElement;

		if (sidebar) sidebar.classList.remove("closed");
		if (contentArea) contentArea.classList.remove("sidebar-closed");
		if (openBtn) openBtn.classList.remove("show");
		this.sidebarOpen = true;
		this.saveSettings();
	}

	resetSettings(): void {
		// Effacer localStorage
		localStorage.removeItem("webcomfort-components");
		localStorage.removeItem("webcomfort-text-settings");
		localStorage.removeItem("webcomfort-sidebar-open");

		// Recharger la page pour appliquer les paramètres par défaut
		window.location.reload();
	}

	updateStats(): void {
		const activeCount = Array.from(this.components.values()).filter((active) => active).length;
		const activeComponentsElement = document.getElementById("activeComponents");
		if (activeComponentsElement) {
			activeComponentsElement.textContent = activeCount.toString();
		}
	}
}

// Initialisation de l'application
document.addEventListener("DOMContentLoaded", () => {
	new AccessibilityPanel();
});

// Export par défaut pour Vite
export default AccessibilityPanel;
