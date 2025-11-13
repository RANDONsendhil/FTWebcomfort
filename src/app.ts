import { FTDyslexie } from "./components/cognitif/FTDyslexie/index";
import { FTEpilepsie } from "./components/cognitif/FTEpilepsie/index";
import { FTArthrose } from "./components/moteur/FTArthrose/index";
import { FTGuideLecture } from "./components/vision/FTGuideLecture/index";
import { FTPersonalisationText } from "./components/vision/FTPersonnalisationTexte/index";
import { FTLoupe } from "./components/vision/FTLoupe/index";
import {FTModeAffichage } from"./components/vision/FTModeAffichage"
import "./main-app"; // Import to register the custom element

/** Load and instantiate all accessibility modules */
function loadModules(container: HTMLElement | ShadowRoot): void {
  const personalizationTextEl = container.querySelector<HTMLDivElement>("#personnalisationTexteContainer");
  const epilepsieEl = container.querySelector<HTMLDivElement>("#epilepsieContainer");
  const dyslexieEl = container.querySelector<HTMLDivElement>("#dyslexieContainer");
  const arthroseEl = container.querySelector<HTMLDivElement>("#arthroseContainer");
  const guideLectureEl = container.querySelector<HTMLDivElement>("#guideLectureContainer");
  const loupeEl = container.querySelector<HTMLDivElement>("#loupeContainer");
  const modeAffichageEl = container.querySelector<HTMLDivElement>("#modeAffichage");
  
  
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

if (loupeEl) {
  new FTLoupe(loupeEl);
  console.log("Loupe module loaded");
}

if (modeAffichageEl) {
  new FTModeAffichage(modeAffichageEl);
  console.log("Loupe module loaded");
}

  console.log("All modules loaded successfully");
}

(window as any).loadModules = loadModules;

document.addEventListener("DOMContentLoaded", () => {
  console.log("FTWebcomfort app initialized");
  document.dispatchEvent(new CustomEvent('ftwebcomfort-ready'));
});

export { loadModules };
