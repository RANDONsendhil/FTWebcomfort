// Constants
const FONT_STYLE_ID = "dyslexia-font-style";
const FONT_FAMILY_NAME = "OpenDyslexic";
const FALLBACK_FONTS = "Arial, sans-serif";
const FONT_BASE_PATH = "/fonts/dyslexic/";

// Font file mapping - Using public folder paths
const FONT_FILES: Record<string, string> = {
	bold: `${FONT_BASE_PATH}OpenDyslexic-Bold.otf`,
	regular: `${FONT_BASE_PATH}OpenDyslexic-Regular.otf`,
	italic: `${FONT_BASE_PATH}OpenDyslexic-Italic.otf`,
	bold_italic: `${FONT_BASE_PATH}OpenDyslexic-BoldItalic.otf`,
	alta_bold: `${FONT_BASE_PATH}OpenDyslexicAlta-Bold.otf`,
	alta_italic: `${FONT_BASE_PATH}OpenDyslexicAlta-Italic.otf`,
	alta_bold_italic: `${FONT_BASE_PATH}OpenDyslexicAlta-BoldItalic.otf`,
	alta_normal: `${FONT_BASE_PATH}OpenDyslexicAlta-Regular.otf`,
	mono_regular: `${FONT_BASE_PATH}OpenDyslexicMono-Regular.otf`,
};

/**
 * Remove existing font style element from document
 */
function removeFontStyle(): void {
	const existingStyle = document.getElementById(FONT_STYLE_ID);
	if (existingStyle) {
		existingStyle.remove();
	}
}

/**
 * Create and inject font-face CSS
 */
function injectFontFace(fontPath: string, fontFamily: string): void {
	const style = document.createElement("style");
	style.id = FONT_STYLE_ID;
	style.textContent = `
        @font-face {
            font-family: '${fontFamily}';
            src: url('${fontPath}') format('opentype');
            font-weight: normal;
            font-style: normal;
        }
        
        /* Apply dyslexic font excluding container-ftwebconfomt */
        body *:not(.container-ftwebconfomt):not(.container-ftwebconfomt *) {
            font-family: '${fontFamily}', ${FALLBACK_FONTS} !important;
        }
    `;

	document.head.appendChild(style);
}

/**
 * Remove injected CSS rules and reset font
 */
export function disableFontDys(): void {
	document.documentElement.style.removeProperty("font-family");
	removeFontStyle();
	console.log("Dyslexia font disabled");
}

/**
 * Helper: toggle disable/enable
 */
export function enableFontDys(): void {
	disableFontDys();
}

/**
 * Change the font for dyslexia support
 * @param fontValue The font variant to apply (e.g., 'bold', 'regular', 'italic')
 */
export function changeFontDys(fontValue: string): void {
	console.log(`Changing font to: ${fontValue}`);

	removeFontStyle();

	const fontPath = FONT_FILES[fontValue];

	if (!fontPath) {
		console.error(`Unknown font value: ${fontValue}. Available: ${Object.keys(FONT_FILES).join(", ")}`);
		return;
	}

	injectFontFace(fontPath, FONT_FAMILY_NAME);

	console.log(`Font applied: ${fontValue} from ${fontPath}`);
}
