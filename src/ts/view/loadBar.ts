import { getSoundManager } from "../game.js";
import { countLoadAsset } from "../ulity.js";

export let loadBackground: HTMLImageElement;
export let loadBar: HTMLDivElement;
export let load: HTMLDivElement;
export let spinbtn: HTMLButtonElement;
export let playBtn: HTMLButtonElement;

// Loading Bar initialization
export function calculatepercetage() {
  const totalAssets = 15;
  const percentage = Math.floor((countLoadAsset / totalAssets) * 100);
  loadBackground = document.getElementById(
    "loadBackground",
  ) as HTMLImageElement;
  loadBar = document.getElementById("loadBar") as HTMLDivElement;
  load = document.getElementById("load") as HTMLDivElement;
  spinbtn = document.getElementById("spineBtn") as HTMLButtonElement;
  playBtn = document.getElementById("continoueBtn") as HTMLButtonElement;
  load.style.backgroundColor = "#B50000";
  load.style.width = `${percentage}%`;

  // check percentage
  if (percentage === 100) {
    playBtn.style.visibility = "visible";
    loadBar.style.display = "none";
    getSoundManager().backgroundSound.play();
  }
  // console.log(`Assets loaded: ${percentage}%`);

  // when clic the  play btn then begin game
  playBtn.addEventListener("click", () => {
    playBtn.style.visibility = "hidden";
    loadBackground.style.display = "none";
  });
}
