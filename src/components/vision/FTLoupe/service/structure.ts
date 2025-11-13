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
		/* Zoom the entire page content */
		html {
			zoom: ${zoom};
		}
		
		/* Keep the FTWebcomfort component at normal size */
		.container-ftwebconfomt,
		main-app {
			zoom: ${1 / zoom} !important;
			position: fixed !important;
		}
		
		.container-ftwebconfomt * {
			zoom: 1 !important;
		}
	`;
	
	document.head.appendChild(zoomStyleElement);
}

/** Create and setup the magnifying lens */
export function createLens(zoomLevel: number): void {
	removePageZoom(); // Remove page zoom if active
	removeLens();
	
	const zoom = parseFloat(String(zoomLevel)) || 2;
	// Increase lens size based on zoom level
	// Base size 200px, increases proportionally with zoom
	const lensSize = 150 + (zoom * 50); // Range: 200px at zoom 1.5, to 350px at zoom 4
	
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
			let lensX = e.clientX - lensRadius;
			let lensY = e.clientY - lensRadius;
			
			// Keep lens within viewport bounds
			// Prevent lens from going above the viewport
			if (lensY < 0) {
				lensY = 0;
			}
			// Prevent lens from going below the viewport
			if (lensY + lensSize > window.innerHeight) {
				lensY = window.innerHeight - lensSize;
			}
			// Prevent lens from going left of viewport
			if (lensX < 0) {
				lensX = 0;
			}
			// Prevent lens from going right of viewport
			if (lensX + lensSize > window.innerWidth) {
				lensX = window.innerWidth - lensSize;
			}
			
			lensElement.style.left = `${lensX}px`;
			lensElement.style.top = `${lensY}px`;
			lensElement.style.display = 'block';
			
			// Use clientX/clientY for viewport coordinates to match what's visible
			const bgX = e.clientX + window.scrollX;
			const bgY = e.clientY + window.scrollY;
			
			// Clear previous content
			lensElement.innerHTML = '';
			
			// Clone the body for magnification
			const bodyClone = document.body.cloneNode(true) as HTMLElement;
			
			// Remove the lens itself from the clone to avoid recursion
			const clonedLens = bodyClone.querySelector('#ft-magnifying-lens');
			if (clonedLens) clonedLens.remove();
			
			// Remove the FTWebcomfort component from the clone
			const clonedComponent = bodyClone.querySelector('.container-ftwebconfomt');
			if (clonedComponent) clonedComponent.remove();
			
			const mainAppClone = bodyClone.querySelector('main-app');
			if (mainAppClone) mainAppClone.remove();
			
			// Remove any other FTWebcomfort related elements
			const ftElements = bodyClone.querySelectorAll('[class*="ftwebconfomt"], [class*="ft-web"], [id*="ftwebconfomt"]');
			ftElements.forEach(el => el.remove());
			
			// Ensure images load properly in the clone
			const clonedImages = bodyClone.querySelectorAll('img');
			clonedImages.forEach((clonedImg, index) => {
				const originalImages = document.body.querySelectorAll('img');
				if (originalImages[index]) {
					// Copy the actual rendered image source
					clonedImg.src = originalImages[index].src;
					clonedImg.style.display = originalImages[index].style.display || 'inline';
				}
			});
			
			// Copy computed styles for better rendering
			const clonedDivs = bodyClone.querySelectorAll('div, p, span, h1, h2, h3, h4, h5, h6');
			const originalDivs = document.body.querySelectorAll('div, p, span, h1, h2, h3, h4, h5, h6');
			clonedDivs.forEach((clonedEl, index) => {
				if (originalDivs[index]) {
					const computedStyle = window.getComputedStyle(originalDivs[index]);
					(clonedEl as HTMLElement).style.backgroundColor = computedStyle.backgroundColor;
					(clonedEl as HTMLElement).style.color = computedStyle.color;
				}
			});
			
			// Position and scale the cloned body
			Object.assign(bodyClone.style, {
				position: 'absolute',
				margin: '0',
				padding: '0',
				transform: `scale(${zoom})`,
				transformOrigin: '0 0',
				left: `-${(bgX - lensRadius / zoom) * zoom}px`,
				top: `-${(bgY - lensRadius / zoom) * zoom}px`,
				width: `${document.body.scrollWidth}px`,
				height: `${document.body.scrollHeight}px`,
				pointerEvents: 'none',
				overflow: 'visible'
			});
			
			lensElement.appendChild(bodyClone);
		});
	};
	
	document.addEventListener('mousemove', mouseMoveHandler);
}