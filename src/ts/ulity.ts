// load the game asset
import { Texture, Assets } from "pixi.js";
import { calculatepercetage } from "./view/loadBar.js";

export let countLoadAsset: number = 0;

export const assetsMap = [];

export const reelbackground = async (): Promise<Texture> => {
  console.log("reelPanelload");
  return await loadTexture(
    `reelPanelbg`,
    `assets/reelContainerimage/background.png`,
  );
};

export const Panel = async (): Promise<Texture> => {
  return await loadTexture(`Panel`, `assets/reelContainerimage/Panel.png`);
};

const loadTexture = async (textureName: string, textureURL: string) => {
  if (!assetsMap[`${textureName}`]) {
    assetsMap[`${textureName}`] = await Assets.load(textureURL);
    console.log(assetsMap);
    countLoadAsset++;
    calculatepercetage();
  }
  return assetsMap[`${textureName}`];
};

export const assetMap: Texture[] = [];

const assets = [
  "assets/reelSymbols/symbol1.png",
  "assets/reelSymbols/symbol2.png",
  "assets/reelSymbols/symbol3.png",
  "assets/reelSymbols/symbol4.png",
  "assets/reelSymbols/symbol5.png",
  "assets/reelSymbols/symbol6.png",
  "assets/reelSymbols/symbol7.png",
  "assets/reelSymbols/symbol8.png",
  "assets/reelSymbols/symbol9.png",
  "assets/reelSymbols/symbol10.png",
  "assets/reelSymbols/symbol11.png",
];

export async function loadAssets(): Promise<void> {
  for (const path of assets) {
    const texture = await Assets.load<Texture>(path);
    assetMap.push(texture);
    countLoadAsset++;
    calculatepercetage();
  }

  console.log(countLoadAsset);
}
