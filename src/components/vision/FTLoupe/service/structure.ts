import styleCSSReduceAnimation from "../template/style.css";

let lensElement: HTMLElement | null = null;
let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
let originalBodyTransform: string = '';
let zoomStyleElement: HTMLStyleElement | null = null;

const ZOOM_STYLE_ID = "ft-loupe-zoom-style";

export function enableLoupe(){}
export function disableLoupe(){
	removeLens();
	removePageZoom();
}

/** Remove the lens element and cleanup */
export function removeLens(): void {
	if (lensElement) {
		lensElement.remove();
		lensElement = null;
	}
	if (mouseMoveHandler) {
		document.removeEventListener('mousemove', mouseMoveHandler);
		mouseMoveHandler = null;
	}
}

/** Remove page zoom */
export function removePageZoom(): void {
	// Remove injected style element
	if (zoomStyleElement) {
		zoomStyleElement.remove();
		zoomStyleElement = null;
	}
	
	// Also check for style by ID
	const existingStyle = document.getElementById(ZOOM_STYLE_ID);
	if (existingStyle) {
		existingStyle.remove();
	}
}

/** Apply zoom to entire page */
export function applyPageZoom(zoomLevel: number): void {
	removeLens(); // Remove lens mode if active
	removePageZoom(); // Remove any existing zoom style
	
	const zoom = parseFloat(String(zoomLevel)) || 1.5;
	
	// Create style element to apply zoom excluding the component
	zoomStyleElement = document.createElement('style');
	zoomStyleElement.id = ZOOM_STYLE_ID;
	zoomStyleElement.textContent = `
		/* Apply zoom to all direct children of body EXCEPT container-ftwebconfomt */
		body > *:not(.container-ftwebconfomt):not(main-app) {
			transform: scale(${zoom}) !important;
			transform-origin: top left !important;
		}
		
		/* Adjust body to accommodate zoomed content */
		body {
			overflow-x: auto !important;
		}
		
		/* Ensure the component stays in its original size and position */
		.container-ftwebconfomt {
			transform: none !important;
			position: fixed !important;
		}
		
		.container-ftwebconfomt * {
			transform: none !important;
		}
	`;
	
	document.head.appendChild(zoomStyleElement);
}

/** Create and setup the magnifying lens */
export function createLens(zoomLevel: number): void {
	removePageZoom(); // Remove page zoom if active
	removeLens();
	
	const zoom = parseFloat(String(zoomLevel)) || 2;
	const lensSize = 200;
	
	// Create lens element
	lensElement = document.createElement('div');
	lensElement.id = 'ft-magnifying-lens';
	
	// Style the lens
	Object.assign(lensElement.style, {
		position: 'fixed',
		width: `${lensSize}px`,
		height: `${lensSize}px`,
		border: '3px solid #000',
		borderRadius: '50%',
		cursor: 'none',
		pointerEvents: 'none',
		zIndex: '10000',
		overflow: 'hidden',
		display: 'none',
		boxShadow: '0 0 20px rgba(0,0,0,0.6)',
		background: 'white'
	});
	
	document.body.appendChild(lensElement);
	
	// Setup mouse tracking with better performance
	let animationFrameId: number | null = null;
	
	mouseMoveHandler = (e: MouseEvent) => {
		if (!lensElement) return;
		
		// Cancel previous animation frame
		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}
		
		animationFrameId = requestAnimationFrame(() => {
			if (!lensElement) return;
			
			const lensRadius = lensSize / 2;
			
			// Temporarily hide lens to check element under cursor
			lensElement.style.display = 'none';
			
			// Check if cursor is over the FTWebcomfort component - multiple checks
			const elementUnderCursor = document.elementFromPoint(e.clientX, e.clientY);
			
			// Check for multiple possible selectors
			const isOverComponent = 
				elementUnderCursor?.closest('.container-ftwebconfomt') !== null ||
				elementUnderCursor?.closest('main-app') !== null ||
				elementUnderCursor?.classList.contains('container-ftwebconfomt') ||
				elementUnderCursor?.tagName === 'MAIN-APP';
			
			// If over component, keep lens hidden and return
			if (isOverComponent) {
				return;
			}
			
			// Position lens centered on cursor
			const lensX = e.clientX - lensRadius;
			const lensY = e.clientY - lensRadius;
			
			lensElement.style.left = `${lensX}px`;
			lensElement.style.top = `${lensY}px`;
			lensElement.style.display = 'block';
			
			// Use background image approach for better performance
			// Calculate the background position to show the area under the cursor
			const bgX = e.pageX;
			const bgY = e.pageY;
			
			// Create a snapshot of the area under the cursor
			lensElement.style.backgroundImage = 'none';
			lensElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
			
			// Get element under cursor
			const elementsUnderCursor = document.elementsFromPoint(e.clientX, e.clientY);
			
			// Clone and magnify content
			lensElement.innerHTML = '';
			
			// Create a container for the magnified view
			const container = document.createElement('div');
			Object.assign(container.style, {
				position: 'absolute',
				left: '0',
				top: '0',
				width: '100%',
				height: '100%',
				transformOrigin: 'center center',
				transform: `scale(${zoom})`,
				pointerEvents: 'none'
			});
			
			// Clone a portion of the document
			const viewportClone = document.documentElement.cloneNode(true) as HTMLElement;
			
			// Remove the lens from the clone
			const lensClone = viewportClone.querySelector('#ft-magnifying-lens');
			if (lensClone) lensClone.remove();
			
			// Style the clone
			Object.assign(container.style, {
				position: 'absolute',
				transform: `scale(${zoom})`,
				transformOrigin: '0 0',
				left: `-${(bgX - lensRadius / zoom) * zoom}px`,
				top: `-${(bgY - lensRadius / zoom) * zoom}px`,
				width: `${document.documentElement.scrollWidth}px`,
				height: `${document.documentElement.scrollHeight}px`
			});
			
			// Simplified approach: just show zoomed background
			const bodyClone = document.body.cloneNode(true) as HTMLElement;
			
			// Remove the lens itself from the clone to avoid recursion
			const clonedLens = bodyClone.querySelector('#ft-magnifying-lens');
			if (clonedLens) clonedLens.remove();
			
			// Remove the FTWebcomfort component from the clone - check multiple selectors
			const clonedComponent = bodyClone.querySelector('.container-ftwebconfomt');
			if (clonedComponent) clonedComponent.remove();
			
			// Also remove main-app element if it exists
			const mainAppClone = bodyClone.querySelector('main-app');
			if (mainAppClone) mainAppClone.remove();
			
			// Remove any other FTWebcomfort related elements
			const ftElements = bodyClone.querySelectorAll('[class*="ftwebconfomt"], [class*="ft-web"], [id*="ftwebconfomt"]');
			ftElements.forEach(el => el.remove());
			
			Object.assign(bodyClone.style, {
				position: 'absolute',
				margin: '0',
				transform: `scale(${zoom})`,
				transformOrigin: '0 0',
				left: `-${(e.pageX - lensRadius / zoom) * zoom}px`,
				top: `-${(e.pageY - lensRadius / zoom) * zoom}px`,
				width: `${document.body.scrollWidth}px`,
				pointerEvents: 'none'
			});
			
			lensElement.appendChild(bodyClone);
		});
	};
	
	document.addEventListener('mousemove', mouseMoveHandler);
}