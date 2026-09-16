import { Howl, Howler } from "howler";
import { Graphics, Sprite } from "pixi.js";
import { soundMuteLogo, soundPlayLogo } from "./ulity.js";
import { getStage } from "./index.js";

// Game Sound initialization
export class SoundManager {
  private soundbtn: Sprite;

  private audioPaths = {
    background: "assets/audio/background.mp3",
    click: "assets/audio/click.mp3",
    spin: "assets/audio/spin.mp3",
    reelStop: "assets/audio/reelStop.mp3",
    win: "assets/audio/win.mp3",
    bigWin: "assets/audio/bigWin.mp3",
  };

  private isMuted = false;
  private playSprite!: Sprite;
  private muteSprite!: Sprite;

  constructor() {
    Howler.autoUnlock = true;

    this.createSoundBtn();
  }

  public backgroundSound = new Howl({
    src: [this.audioPaths.background],
    loop: true,
    volume: 0.3,
  });

  public clickSound = new Howl({
    src: [this.audioPaths.click],
    volume: 1,
  });

  public spinSound = new Howl({
    src: [this.audioPaths.spin],
    loop: true,
    volume: 1,
  });

  // public reelStopSound = new Howl({
  //     src: [this.audioPaths.reelStop],
  // });

  // public winSound = new Howl({
  //     src: [this.audioPaths.win],
  // });

  // public bigWinSound = new Howl({
  //     src: [this.audioPaths.bigWin],
  // });

  private async createSoundBtn(): Promise<void> {
    this.soundbtn = new Sprite();
    this.soundbtn.label = `_soundBtn_`;
    this.soundbtn.x = globalThis.screen.width / 2 - 400;
    this.soundbtn.y = globalThis.screen.height - 90;

    const texture1 = await soundPlayLogo();
    this.playSprite = new Sprite(texture1)
    this.playSprite.width = 80;
    this.playSprite.height = 80;

    const texture2 = await soundMuteLogo();
    this.muteSprite = new Sprite(texture2);
    this.muteSprite.width = 80;
    this.muteSprite.height = 80;

    this.soundbtn.addChild(this.playSprite);
    getStage().addChild(this.soundbtn);
    this.checkstatuSound()

  }


  private checkstatuSound() {
    this.soundbtn.eventMode = "static";
    this.soundbtn.cursor = "pointer";
    this.soundbtn.on("pointerdown", () => {
      this.isMuted = !this.isMuted;
      Howler.mute(this.isMuted);

      this.soundbtn.removeChildren();
      this.soundbtn.addChild(this.isMuted ? this.muteSprite : this.playSprite);
    });

  }
}