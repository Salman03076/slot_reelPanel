import { getSoundManager } from "../game.js";
import { countLoadAsset } from "../ulity.js";

export let loadBackground: HTMLImageElement;
export let loadBar: HTMLDivElement;
export let load: HTMLDivElement;
export let spinbtn: HTMLButtonElement;

// Loading Bar initialization
export function calculatepercetage() {
  const totalAssets = 13;
  const percentage = Math.floor((countLoadAsset / totalAssets) * 100);
  loadBackground = document.getElementById(
    "loadBackground",
  ) as HTMLImageElement;
  loadBar = document.getElementById("loadBar") as HTMLDivElement;
  load = document.getElementById("load") as HTMLDivElement;
  spinbtn = document.getElementById("spineBtn") as HTMLButtonElement;
  load.style.backgroundColor = "#B50000";

  load.style.width = `${percentage}%`;
  if (percentage === 100) {
    loadBar.style.display = "none";
    loadBackground.style.display = "none";
    spinbtn.style.display = "block";
    getSoundManager().backgroundSound.play();
  }
  console.log(`Assets loaded: ${percentage}%`);
}
