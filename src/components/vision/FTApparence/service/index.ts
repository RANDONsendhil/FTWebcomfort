/**
 * Service/Configuration class for Text Personalization component
 * This acts as a configuration provider and service layer
 */

import { disableAnimations, enableAnimations } from "./structure";
export class FTEpilepsieService {

	private container?: HTMLElement;

	constructor(container?: HTMLElement) {
		this.container = container;
	}

	public enableAnimations(): void {

		enableAnimations()
	}

	public disableAnimations(): void {

		disableAnimations()
	}

	public getContainer(): HTMLElement | null {
		return this.container || null;
	}
}




