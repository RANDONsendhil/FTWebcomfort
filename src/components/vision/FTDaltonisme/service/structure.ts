import styleCSSReduceAnimation from "../template/style.css";
type RAFHandle = number;
type RAFMap = {
	originalRequestAnimationFrame?: typeof window.requestAnimationFrame;
	originalCancelAnimationFrame?: typeof window.cancelAnimationFrame;
};
const rafStore: RAFMap = {};
let animationsDisabled = false;
const REDUCE_CLASS = "reduce-motion";
const STYLE_ID = "reduce-motion-styles";

/**
 * Inject CSS rules to disable animations when reduce-motion class is present
 */
function injectReduceMotionCSS(): void {
	// Check if already injected
	if (document.getElementById(STYLE_ID)) return;

	const style = document.createElement("style");
	style.id = STYLE_ID;
	style.textContent = styleCSSReduceAnimation;
	document.head.appendChild(style);
}

/**
 * Remove injected CSS rules
 */
function removeReduceMotionCSS(): void {
	const existingStyle = document.getElementById(STYLE_ID);
	if (existingStyle) {
		existingStyle.remove();
	}
}

/**
 * Disable animations and media playback on the page.
 * @param force If true, disable even if user OS preference does not request reduced motion.
 */
export function disableAnimations(force = false): void {
	if (animationsDisabled) return;

	const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!force && prefersReduced) {
		document.documentElement.classList.add(REDUCE_CLASS);
		injectReduceMotionCSS();
		animationsDisabled = true;
		return;
	}

	injectReduceMotionCSS();

	document.documentElement.classList.add(REDUCE_CLASS);

	const medias = Array.from(document.querySelectorAll<HTMLMediaElement>("video, audio"));
	medias.forEach((m) => {
		try {
			if (!m.paused) {
				m.pause();
				(m as any).dataset.__wasPlayingBeforeDisable = "true";
			}
			try {
				(m as any).playbackRate = 0;
			} catch (e) {}
		} catch (e) {}
	});

	const imgs = Array.from(document.images);
	imgs.forEach((img) => {
		if ((img as any).__frozenByAccessibility) return;

		try {
			const url = new URL(img.src, window.location.href);
			if (url.origin !== window.location.origin) return;

			const canvas = document.createElement("canvas");
			canvas.width = img.naturalWidth || img.width;
			canvas.height = img.naturalHeight || img.height;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(img, 0, 0);
				(img as any).__originalSrcForAccessibility = img.src;
				img.src = canvas.toDataURL("image/png");
				(img as any).__frozenByAccessibility = true;
			}
		} catch (e) {}
	});

	rafStore.originalRequestAnimationFrame = window.requestAnimationFrame;
	rafStore.originalCancelAnimationFrame = window.cancelAnimationFrame;

	window.requestAnimationFrame = function (_callback: FrameRequestCallback): number {
		return 0;
	};

	window.cancelAnimationFrame = function (_handle?: number): void {
		// noop
	};

	animationsDisabled = true;
	console.log("✅ Animations disabled - CSS injected");
}

/**
 * Restore animations to their previous behaviour when possible.
 */
export function enableAnimations(): void {
	if (!animationsDisabled) return;

	// 1) Remove CSS class
	document.documentElement.classList.remove(REDUCE_CLASS);

	// 2) Remove injected CSS
	removeReduceMotionCSS();

	// 3) Resume media elements
	const medias = Array.from(document.querySelectorAll<HTMLMediaElement>("video, audio"));
	medias.forEach((m) => {
		try {
			if ((m as any).dataset.__wasPlayingBeforeDisable === "true") {
				try {
					(m as any).playbackRate = 1;
				} catch (e) {}
				try {
					m.play().catch(() => {});
				} catch (e) {}
				delete (m as any).dataset.__wasPlayingBeforeDisable;
			} else {
				try {
					(m as any).playbackRate = 1;
				} catch (e) {}
			}
		} catch (e) {}
	});

	// 4) Restore frozen images
	const imgs = Array.from(document.images);
	imgs.forEach((img) => {
		if ((img as any).__frozenByAccessibility && (img as any).__originalSrcForAccessibility) {
			img.src = (img as any).__originalSrcForAccessibility;
			delete (img as any).__frozenByAccessibility;
			delete (img as any).__originalSrcForAccessibility;
		}
	});

	// 5) Restore requestAnimationFrame / cancelAnimationFrame
	if (rafStore.originalRequestAnimationFrame) {
		window.requestAnimationFrame = rafStore.originalRequestAnimationFrame;
	}
	if (rafStore.originalCancelAnimationFrame) {
		window.cancelAnimationFrame = rafStore.originalCancelAnimationFrame;
	}

	animationsDisabled = false;
	console.log("Animations enabled - CSS removed");
}

/**
 * Helper: toggle disable/enable
 */
export function setAnimationsDisabled(disabled: boolean, force = false): void {
	if (disabled) disableAnimations(force);
	else enableAnimations();
}

/**
 * Utility: check whether we should automatically disable (detects prefers-reduced-motion)
 */
export function systemPrefersReducedMotion(): boolean {
	return !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

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
	
	// Remove SVG filters
	const filterContainer = document.getElementById('colorblind-filters');
	if (filterContainer) {
		filterContainer.remove();
	}
	
	document.documentElement.classList.remove('dark-mode', 'color-blind-mode', 'high-contrast-mode', 'soften-mode', 'reduce-blue-mode');
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
			border-color: #444 !important;
		}
		
		html.dark-mode img,
		html.dark-mode video,
		html.dark-mode canvas {
			filter: brightness(0.8) contrast(1.2);
		}
		
		html.dark-mode a {
			color: #4da6ff !important;
		}
		
		html.dark-mode input,
		html.dark-mode textarea,
		html.dark-mode select,
		html.dark-mode button {
			background-color: #2a2a2a !important;
			color: #e0e0e0 !important;
			border-color: #555 !important;
		}
	`;
	
	document.head.appendChild(style);
	document.documentElement.classList.add('dark-mode');
}

/**
 * Apply color blindness friendly mode (Deuteranopia - red-green color blindness)
 */
export function applyColorBlindMode(): void {
	removeDisplayModeStyles();
	currentDisplayMode = 'coulorBlindess';
	
	// Create SVG filter for color blindness simulation/correction
	const svgFilter = `
		<svg xmlns="http://www.w3.org/2000/svg" style="position: absolute; width: 0; height: 0;">
			<defs>
				<filter id="protanopia">
					<feColorMatrix type="matrix" values="0.567, 0.433, 0,     0, 0
					                                      0.558, 0.442, 0,     0, 0
					                                      0,     0.242, 0.758, 0, 0
					                                      0,     0,     0,     1, 0"/>
				</filter>
				<filter id="deuteranopia">
					<feColorMatrix type="matrix" values="0.625, 0.375, 0,   0, 0
					                                      0.7,   0.3,   0,   0, 0
					                                      0,     0.3,   0.7, 0, 0
					                                      0,     0,     0,   1, 0"/>
				</filter>
				<filter id="tritanopia">
					<feColorMatrix type="matrix" values="0.95, 0.05,  0,     0, 0
					                                      0,    0.433, 0.567, 0, 0
					                                      0,    0.475, 0.525, 0, 0
					                                      0,    0,     0,     1, 0"/>
				</filter>
			</defs>
		</svg>
	`;
	
	// Inject SVG filter if not already present
	if (!document.getElementById('colorblind-filters')) {
		const div = document.createElement('div');
		div.id = 'colorblind-filters';
		div.innerHTML = svgFilter;
		div.style.position = 'absolute';
		div.style.width = '0';
		div.style.height = '0';
		div.style.overflow = 'hidden';
		document.body.appendChild(div);
	}
	
	const style = document.createElement('style');
	style.id = DISPLAY_MODE_STYLE_ID;
	style.textContent = `
		/* Apply deuteranopia filter (most common red-green color blindness) */
		html.color-blind-mode {
			filter: url(#deuteranopia);
		}
		
		/* Enhance text readability */
		html.color-blind-mode * {
			text-decoration-skip-ink: auto;
		}
		
		/* Make sure important elements have patterns/icons, not just color */
		html.color-blind-mode .error,
		html.color-blind-mode [class*="error"],
		html.color-blind-mode [style*="color: red"] {
			border-left: 4px solid currentColor !important;
			padding-left: 8px !important;
		}
		
		html.color-blind-mode .success,
		html.color-blind-mode [class*="success"],
		html.color-blind-mode [style*="color: green"] {
			border-left: 4px dotted currentColor !important;
			padding-left: 8px !important;
		}
		
		html.color-blind-mode .warning,
		html.color-blind-mode [class*="warning"],
		html.color-blind-mode [style*="color: orange"],
		html.color-blind-mode [style*="color: yellow"] {
			border-left: 4px dashed currentColor !important;
			padding-left: 8px !important;
		}
	`;
	
	document.head.appendChild(style);
	document.documentElement.classList.add('color-blind-mode');
}

/**
 * Apply blue light reduction mode
 */
export function applyReduceBlueMode(): void {
	removeDisplayModeStyles();
	currentDisplayMode = 'reducerColorBlueBtn';
	
	const style = document.createElement('style');
	style.id = DISPLAY_MODE_STYLE_ID;
	style.textContent = `
		html.reduce-blue-mode {
			filter: sepia(0.2) hue-rotate(-10deg) saturate(1.1);
		}
		
		html.reduce-blue-mode body {
			background-color: #fef8f0 !important;
		}
	`;
	
	document.head.appendChild(style);
	document.documentElement.classList.add('reduce-blue-mode');
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
		}
		
		html.high-contrast-mode button,
		html.high-contrast-mode input,
		html.high-contrast-mode select,
		html.high-contrast-mode textarea {
			background-color: #ffffff !important;
			color: #000000 !important;
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

