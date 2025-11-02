import { FTEpilepsie } from "./components/cognitif/epilepsie/index.js";
import { MainApp } from "./main-app.js";
const mainapp = new MainApp();
console.log("MainApp initialized:", mainapp);
const epilepsieInstance = new FTEpilepsie();
console.log("FTEpilepsie initialized:", epilepsieInstance);
