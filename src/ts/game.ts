import { Reel } from "./view/Reel.js";
import { background } from "./view/background.js";
import { loadAssets } from "./ulity.js";
import { SoundManager } from "./autio.js";
import { betTable } from "./view/betTable.js";

let bg: background;
let spinBtn: HTMLButtonElement;
let Sound: SoundManager;
let btTable: betTable;
let reel1: Reel;
let reel2: Reel;
let reel3: Reel;
let reel4: Reel;
let reel5: Reel;


// all file initialization
export async function gameInit(): Promise<void> {
    Sound = new SoundManager();

    bg = new background();

    btTable = new betTable()

    await loadAssets();

    reel1 = new Reel(1);
    reel1.getmask(-350.5);
    reel1.x = -293;
    reel2 = new Reel(2);
    reel2.getmask(-202.5);
    reel2.x = -132;
    reel3 = new Reel(3);
    reel3.getmask(-41.5);
    reel3.x = 20;
    reel4 = new Reel(4);
    reel4.getmask(116.5);
    reel4.x = 176;
    reel5 = new Reel(5);
    reel5.getmask(268.55);
    reel5.x = 327;
    // reel2.position.set(250,0);

    spinBtn = document.getElementById("spineBtn") as HTMLButtonElement;

    spinBtn.addEventListener(`click`, () => {
        Sound.clickSound.play();
        if (!reel5.getReelState()) {
            Sound.spinSound.play();
            reel1.playReelSpin();
            reel2.playReelSpin();
            reel3.playReelSpin();
            reel4.playReelSpin();
            reel5.playReelSpin();
        } else {
            spinBtn.innerHTML = "SPIN";
        }
    });
}

export const getSoundManager = () => {
    return Sound;
};

export const getBg = () => {
    return bg;
};

export const getSpinBtn = () => {
    return spinBtn;
};

export const getPlayspin = () => {
    reel1.playReelSpin();
    reel2.playReelSpin();
    reel3.playReelSpin();
    reel4.playReelSpin();
    reel5.playReelSpin();
}
