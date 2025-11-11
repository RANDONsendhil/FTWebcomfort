import { FTDyslexie } from "./components/cognitif/FTDyslexie/index";
import { FTEpilepsie } from "./components/cognitif/FTEpilepsie/index";
import { FTArthrose } from "./components/moteur/FTArthrose/index";
import { FTGuideLecture } from "./components/vision/guide_lecture";
import { FTPersonalisationText } from "./components/vision/personnalisationTexte/index";
import "./main-app"; // Import to register the custom element

/** Load and instantiate all accessibility modules */
function loadModules(container: HTMLElement | ShadowRoot): void {
  console.log("loadModules called with container:", container);
  const personalizationTextEl = container.querySelector<HTMLDivElement>("#personnalisationTexteContainer");
  const epilepsieEl = container.querySelector<HTMLDivElement>("#epilepsieContainer");
  const dyslexieEl = container.querySelector<HTMLDivElement>("#dyslexieContainer");
  const arthroseEl = container.querySelector<HTMLDivElement>("#arthroseContainer");
  const guideLectureEl = container.querySelector<HTMLDivElement>("#guideLectureContainer");
  
  
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

if (guideLectureEl) {
  new FTGuideLecture(guideLectureEl);
  console.log("Arthrose module loaded");
}

  console.log("All modules loaded successfully");
}

(window as any).loadModules = loadModules;

document.addEventListener("DOMContentLoaded", () => {
  console.log("FTWebcomfort app initialized");
  
  // Dispatch ready event to notify components that loadModules is available
  document.dispatchEvent(new CustomEvent('ftwebcomfort-ready'));
});

export { loadModules };
