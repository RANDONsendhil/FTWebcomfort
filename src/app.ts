import { FTEpilepsie } from "./components/cognitif/epilepsie/index";
import { MainApp } from "./main-app";

const mainapp = new MainApp();
console.log("MainApp initialized:", mainapp);
const epilepsieInstance = new FTEpilepsie();

console.log("FTEpilepsie initialized:", epilepsieInstance);
