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
