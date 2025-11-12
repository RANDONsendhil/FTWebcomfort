/**
 * Service/Configuration class for Text Personalization component
 * This acts as a configuration provider and service layer
 */

import { enableLoupe, disableLoupe, createLens, applyPageZoom, removeLens, removePageZoom } from "./structure";
export class FTLoupeService {

	private container?: HTMLElement;

	constructor(container?: HTMLElement) {
		this.container = container;
	}

	public enableLoupe(): void {

		enableLoupe()
	}

	public disableLoupe(): void {

		disableLoupe()
	}

	public disableZoom(): void {
		removePageZoom();
	}

	public disableLens(): void {
		removeLens();
	}

	public getContainer(): HTMLElement | null {
		return this.container || null;
	}

	public applyZoom(range: string): void {
		const zoomLevel = parseFloat(range) || 1.5;
		applyPageZoom(zoomLevel);
	}

	public applyLens(range: string): void {
		const zoomLevel = parseFloat(range) || 2;
		createLens(zoomLevel);
	}

	
	protected lensMode(range: string): void{
		const zoomLevel = parseFloat(range) || 2;
		createLens(zoomLevel);
	}
	protected zoomMode(range: string): void{
		const zoomLevel = parseFloat(range) || 1.5;
		applyPageZoom(zoomLevel);
	}
 
}




