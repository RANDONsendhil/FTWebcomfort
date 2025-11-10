import { FTDyslexie } from "./components/cognitif/FTDyslexie/index";
import { FTEpilepsie } from "./components/cognitif/FTEpilepsie/index";
import { FTArthrose } from "./components/moteur/FTArthrose/index";
import { FTPersonalisationText } from "./components/vision/personnalisationTexte/index";
import "./main-app"; // Import to register the custom element

/** Load and instantiate all accessibility modules */
function loadModules(shadowRoot: ShadowRoot): void {
  console.log("loadModules called with shadowRoot:", shadowRoot);
  const personalizationTextEl = shadowRoot.querySelector<HTMLDivElement>("#personnalisationTexteContainer");
  const epilepsieEl = shadowRoot.querySelector<HTMLDivElement>("#epilepsieContainer");
  const dyslexieEl = shadowRoot.querySelector<HTMLDivElement>("#dyslexieContainer");
  const arthroseEl = shadowRoot.querySelector<HTMLDivElement>("#arthroseContainer");
  
  
  console.log("Container elements found:", { epilepsieEl, dyslexieEl, arthroseEl });
  
  if (personalizationTextEl) {
    new FTPersonalisationText(personalizationTextEl);
    console.log("PersonalizationText module loaded");
  }
  if (epilepsieEl) {
    new FTEpilepsie(epilepsieEl);
    console.log("Epilepsie module loaded");
  }

if (dyslexieEl) {
  new FTDyslexie(dyslexieEl);
  console.log("Dyslexie module loaded");
}

if (arthroseEl) {
  new FTArthrose(arthroseEl);
  console.log("Arthrose module loaded");
}



  console.log("All modules loaded successfully");
}

(window as any).loadModules = loadModules;

document.addEventListener("DOMContentLoaded", () => {
  console.log("FTWebcomfort app initialized");
});

export { loadModules };
