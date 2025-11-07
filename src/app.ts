import { FTDyslexie } from "./components/cognitif/FTDyslexie";
import { FTEpilepsie } from "./components/cognitif/FTEpilepsie/index";
import { FTArthrose } from "./components/moteur/FTArthrose/index";
import "./main-app"; // Import to register the custom element

// Declare global loadModules function
declare global {
  interface Window {
    loadModules: (shadowRoot: ShadowRoot) => void;
  }
}

/** Load and instantiate all accessibility modules */
function loadModules(shadowRoot: ShadowRoot): void {
  const epilepsieEl = shadowRoot.querySelector<HTMLDivElement>("#epilepsieContainer");
  const dyslexieEl = shadowRoot.querySelector<HTMLDivElement>("#dyslexieContainer");
  const arthroseEl = shadowRoot.querySelector<HTMLDivElement>("#arthroseContainer");
  if (epilepsieEl) {
    new FTEpilepsie(epilepsieEl);
    console.log("Epilepsie module loaded");
  }

   if (dyslexieEl) {
    new FTDyslexie(dyslexieEl);
    console.log("Epilepsie module loaded");
  }

   if (arthroseEl) {
    new FTArthrose(arthroseEl);
    console.log("Arthrose module loaded");
  }



  console.log("All modules loaded successfully");
}

window.loadModules = loadModules;

document.addEventListener("DOMContentLoaded", () => {
  console.log("FTWebcomfort app initialized");
  
  // Create and append main-app element
  const mainApp = document.createElement("main-app");
  document.body.appendChild(mainApp);
});

export { loadModules };