import { FTEpilepsie } from "./components/cognitif/FTEpilepsie/index";
import { FTDyslexie } from "./components/cognitif/FTDyslexie/index";
import { MainApp } from "./main-app";

const mainapp = new MainApp();
console.log("MainApp initialized:", mainapp);
const epilepsieInstance = new FTEpilepsie();
const dyslexie = new FTDyslexie();

console.log("FTEpilepsie initialized:", epilepsieInstance);
console.log("FTEpilepsie initialized:", dyslexie);
