import styleCSSReduceAnimation from "../template/style.css";

// ============================================================================
// DISPLAY MODE MANAGEMENT
// ============================================================================

// Display Mode Management
let currentDisplayMode: string | null = null;
const DISPLAY_MODE_STYLE_ID = "display-mode-styles";

/**
 * Remove all display mode styles
 */
function removeDisplayModeStyles(): void {
	const existingStyle = document.getElementById(DISPLAY_MODE_STYLE_ID);
	if (existingStyle) {
		existingStyle.remove();
	}
	
	document.documentElement.classList.remove('dark-mode', 'high-contrast-mode', 'soften-mode');
	currentDisplayMode = null;
}

/**
 * Apply dark mode
 */
export function applyDarkMode(): void {
	removeDisplayModeStyles();
	currentDisplayMode = 'darkMode';
	
	const style = document.createElement('style');
	style.id = DISPLAY_MODE_STYLE_ID;
	style.textContent = `
		html.dark-mode,
		html.dark-mode body {
			background-color: #1a1a1a !important;
			color: #e0e0e0 !important;
		}
		
		html.dark-mode * {
			background-color: #1a1a1a !important;
			color: #e0e0e0 !important;
		}
		
		html.dark-mode img,
		html.dark-mode video,
		html.dark-mode canvas {
			filter: brightness(0.8) contrast(1.2);
		}
		
		html.dark-mode a {
			color: #4da6ff !important;
			text-decoration: underline !important;
			border: 2px solid #ffffff !important;
			padding: 2px 4px !important;
		}
		
		html.dark-mode input,
		html.dark-mode textarea,
		html.dark-mode select,
		html.dark-mode button,
		html.dark-mode [role="button"],
		html.dark-mode [onclick],
		html.dark-mode [tabindex]:not([tabindex="-1"]),
		html.dark-mode input[type="radio"],
		html.dark-mode input[type="checkbox"],
		html.dark-mode .toggle-switch {
			background-color: #2a2a2a !important;
			color: #e0e0e0 !important;
			border: 2px solid #ffffff !important;
		}
		
		html.dark-mode input[type="radio"]:checked,
		html.dark-mode input[type="checkbox"]:checked {
			background-color: #4da6ff !important;
			border: 2px solid #ffffff !important;
		}
	`;
	
	document.head.appendChild(style);
	document.documentElement.classList.add('dark-mode');
}

/**
 * Apply high contrast mode
 */
export function applyHighContrastMode(): void {
	removeDisplayModeStyles();
	currentDisplayMode = 'modeHighContrast';
	
	const style = document.createElement('style');
	style.id = DISPLAY_MODE_STYLE_ID;
	style.textContent = `
		html.high-contrast-mode,
		html.high-contrast-mode body {
			background-color: #ffffff !important;
			color: #000000 !important;
		}
		
		html.high-contrast-mode * {
			border-color: #000000 !important;
		}
		
		html.high-contrast-mode a {
			color: #0000ff !important;
			text-decoration: underline !important;
			font-weight: bold !important;
			border: 2px solid #0000ff !important;
			padding: 2px 4px !important;
		}
		
		html.high-contrast-mode button,
		html.high-contrast-mode input,
		html.high-contrast-mode select,
		html.high-contrast-mode textarea,
		html.high-contrast-mode [role="button"],
		html.high-contrast-mode [onclick],
		html.high-contrast-mode [tabindex]:not([tabindex="-1"]),
		html.high-contrast-mode input[type="radio"],
		html.high-contrast-mode input[type="checkbox"],
		html.high-contrast-mode .toggle-switch {
			background-color: #ffffff !important;
			color: #000000 !important;
			border: 2px solid #000000 !important;
		}
		
		html.high-contrast-mode input[type="radio"]:checked,
		html.high-contrast-mode input[type="checkbox"]:checked {
			background-color: #000000 !important;
			border: 2px solid #000000 !important;
		}
		
		html.high-contrast-mode img,
		html.high-contrast-mode video {
			filter: contrast(1.5) brightness(1.1);
		}
	`;
	
	document.head.appendChild(style);
	document.documentElement.classList.add('high-contrast-mode');
}

/**
 * Apply soften/comfort mode (reduced brightness and saturation)
 */
export function applySoftenMode(): void {
	removeDisplayModeStyles();
	currentDisplayMode = 'modeSoften';
	
	const style = document.createElement('style');
	style.id = DISPLAY_MODE_STYLE_ID;
	style.textContent = `
		html.soften-mode {
			filter: brightness(0.9) saturate(0.8);
		}
		
		html.soften-mode body {
			background-color: #f5f5f0 !important;
			color: #333333 !important;
		}
		
		html.soften-mode * {
			transition: all 0.3s ease !important;
		}
	`;
	
	document.head.appendChild(style);
	document.documentElement.classList.add('soften-mode');
}

/**
 * Reset to normal mode
 */
export function applyNormalMode(): void {
	removeDisplayModeStyles();
	currentDisplayMode = 'normal';
}

/**
 * Get current display mode
 */
export function getCurrentDisplayMode(): string | null {
	return currentDisplayMode;
}

