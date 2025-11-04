// disableAnimations.ts
type RAFHandle = number;
type RAFMap = {
	originalRequestAnimationFrame?: typeof window.requestAnimationFrame;
	originalCancelAnimationFrame?: typeof window.cancelAnimationFrame;
};
const rafStore: RAFMap = {};
let animationsDisabled = false;
const REDUCE_CLASS = "reduce-motion";

/**
 * Disable animations and media playback on the page.
 * - respects system `prefers-reduced-motion` unless force=true
 * - saves originals so enableAnimations() can restore
 *
 * @param force If true, disable even if user OS preference does not request reduced motion.
 */
export function disableAnimations(force = false): void {
	if (animationsDisabled) return;

	// If user already prefers reduced motion, we still ensure class is present but treat it as "already reduced".
	const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (!force && prefersReduced) {
		document.documentElement.classList.add(REDUCE_CLASS);
		animationsDisabled = true;
		return;
	}

	// 1) add CSS class that neutralizes CSS animations/transitions
	document.documentElement.classList.add(REDUCE_CLASS);

	// 2) pause all HTMLMediaElement (video/audio)
	const medias = Array.from(document.querySelectorAll<HTMLMediaElement>("video, audio"));
	medias.forEach((m) => {
		try {
			if (!m.paused) {
				m.pause();
				// store an attribute so we can resume original state if desired
				(m as any).dataset.__wasPlayingBeforeDisable = "true";
			}
			// also try to set playbackRate to 0 to be extra safe (some UAs might ignore pause)
			try {
				(m as any).playbackRate = 0;
			} catch (e) {
				/* ignore */
			}
		} catch (e) {
			/* ignore cross-browser quirks */
		}
	});

	// 3) attempt to replace same-origin animated GIFs with a static canvas snapshot
	const imgs = Array.from(document.images);
	imgs.forEach((img) => {
		// skip if not an image or already processed
		if ((img as any).__frozenByAccessibility) return;

		try {
			// Only attempt if same-origin (to avoid CORS tainting)
			const url = new URL(img.src, window.location.href);
			if (url.origin !== window.location.origin) return;

			// create a canvas snapshot of the current frame
			const canvas = document.createElement("canvas");
			canvas.width = img.naturalWidth || img.width;
			canvas.height = img.naturalHeight || img.height;
			const ctx = canvas.getContext("2d");
			if (ctx) {
				ctx.drawImage(img, 0, 0);
				// preserve attributes
				(img as any).__originalSrcForAccessibility = img.src;
				img.src = canvas.toDataURL("image/png");
				(img as any).__frozenByAccessibility = true;
			}
		} catch (e) {
			// if any error (CORS or others), ignore — we cannot safely freeze cross-origin GIFs
		}
	});

	// 4) override requestAnimationFrame / cancelAnimationFrame to make rAF no-ops
	rafStore.originalRequestAnimationFrame = window.requestAnimationFrame;
	rafStore.originalCancelAnimationFrame = window.cancelAnimationFrame;

	// simple noop RequestAnimationFrame: returns a number but never calls callbacks
	window.requestAnimationFrame = function (_callback: FrameRequestCallback): number {
		// return a dummy id (0 is safe)
		return 0;
	};

	window.cancelAnimationFrame = function (_handle?: number): void {
		// noop
	};

	// 5) optionally stop CSS animations created by libraries that toggle classes frequently:
	// adding the class above should already disable them via CSS rules.

	animationsDisabled = true;
}

/**
 * Restore animations to their previous behaviour when possible.
 */
export function enableAnimations(): void {
	if (!animationsDisabled) return;

	// 1) remove CSS class
	document.documentElement.classList.remove(REDUCE_CLASS);

	// 2) resume media elements that were playing before
	const medias = Array.from(document.querySelectorAll<HTMLMediaElement>("video, audio"));
	medias.forEach((m) => {
		try {
			if ((m as any).dataset.__wasPlayingBeforeDisable === "true") {
				try {
					(m as any).playbackRate = 1;
				} catch (e) {
					/* ignore */
				}
				try {
					m.play().catch(() => {
						/* ignore play error */
					});
				} catch (e) {
					/* ignore */
				}
				delete (m as any).dataset.__wasPlayingBeforeDisable;
			} else {
				// if we set playbackRate to 0, restore to 1
				try {
					(m as any).playbackRate = 1;
				} catch (e) {
					/* ignore */
				}
			}
		} catch (e) {
			/* ignore */
		}
	});

	// 3) restore frozen images
	const imgs = Array.from(document.images);
	imgs.forEach((img) => {
		if ((img as any).__frozenByAccessibility && (img as any).__originalSrcForAccessibility) {
			img.src = (img as any).__originalSrcForAccessibility;
			delete (img as any).__frozenByAccessibility;
			delete (img as any).__originalSrcForAccessibility;
		}
	});

	// 4) restore requestAnimationFrame / cancelAnimationFrame
	if (rafStore.originalRequestAnimationFrame) {
		window.requestAnimationFrame = rafStore.originalRequestAnimationFrame;
	}
	if (rafStore.originalCancelAnimationFrame) {
		window.cancelAnimationFrame = rafStore.originalCancelAnimationFrame;
	}

	animationsDisabled = false;
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

export class serviceEpilepsie {
	// Add your class methods here if needed
}
