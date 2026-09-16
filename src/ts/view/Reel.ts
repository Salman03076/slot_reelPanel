import { Container, Graphics, Sprite, Ticker, BlurFilter } from "pixi.js";
import { assetMap } from "../ulity.js";
import { getBg, getSoundManager, getSpinBtn } from "../game.js";

// creat the reelPanel\
export class Reel extends Container {
  private isSpining: boolean = false;
  private spinSpeed: number = 30;
  private Symbols: Sprite[] = [];
  private reelId: number;
  private stopReelAnimation;

  constructor(reelId: number) {
    super();
    this.reelId = reelId;
    this.label = `symContain_${reelId}`;
    this.y = -160.5;
    this.SetupSym();
    getBg().getBgCtr().addChild(this);
  }

  public getReelState(): boolean {
    return this.isSpining;
  }

  //create the  Reel container
  private async SetupSym(): Promise<void> {
    await this.loadSymbol();
    this.symbolsPrePosition();
  }

  //symbol set the array
  private async loadSymbol(): Promise<void> {
    for (let i = 0; i < assetMap.length; i++) {
      const symbol = new Sprite(assetMap[i]);

      symbol.label = `sym_${i}`;
      symbol.anchor.set(0.5);

      symbol.width = 115;
      symbol.height = 115;

      this.Symbols.push(symbol);
    }

    this.ShulleArray(this.Symbols);
  }

  // shulle the Array
  private ShulleArray(array: Sprite[]): Sprite[] {
    for (let i = this.Symbols.length - 1; i > 0; i--) {
      const random: number = Math.floor(Math.random() * (i + 1));
      [this.Symbols[i], array[random]] = [array[random], this.Symbols[i]];
    }
    return array;
  }

  // assign the prePosition
  private symbolsPrePosition(): void {
    const totalSymbolsHeight = getBg().getReelPanleHeight();
    const upperExtraSym = this.Symbols[0];
    upperExtraSym.y = -200;
    upperExtraSym.width = 115;
    upperExtraSym.height = 115;
    this.addChild(upperExtraSym);
    for (let i = 1; i < this.Symbols.length - 6; i++) {
      let symbols = this.Symbols[i];
      symbols.anchor.set(0.5);
      symbols.y = 200 * (i - 1);
      this.addChild(this.Symbols[i]);
      if (symbols.y > totalSymbolsHeight) {
        symbols.alpha = 0;
        symbols.y -= totalSymbolsHeight;
      }
    }
  }

  // Reel Spin Animation
  private reelSpin(): void {
        const totalSymbolsHeight = getBg().getReelPanleHeight();
        for (let num = 0; num < this.Symbols.length; num++) {
            let symbols = this.Symbols[num];
            symbols.y += this.spinSpeed;
            console.log(symbols.y);
            if (symbols.y > totalSymbolsHeight) {
                symbols.y = symbols.y - totalSymbolsHeight - 200;
            }
        }
    }

  private spinboundle = this.reelSpin.bind(this);

  // Play spin
   public playReelSpin() {
        if (this.isSpining) return;
        this.isSpining = true;
        this.bounceanimation();
        setTimeout(() => {
            getSpinBtn().innerHTML = "STOP";
            Ticker.shared.add(this.spinboundle);
            this.blurSymbols(1);
        }, 50 * this.reelId);
        setTimeout(() => {
            this.stopReelSpin();
            this.blurSymbols(0);
            if (this.reelId == 5) {
                getSoundManager().spinSound.stop();
                getSpinBtn().innerHTML = "SPIN";
            }
        }, 700 * this.reelId);
    }

  // stop spin
  public stopReelSpin(): void {
    if (!this.isSpining) return;
    this.isSpining = false;

    this.stopReelAnimation = setInterval(() => {
      // Decrease speed
      if (this.spinSpeed > 0) {
        this.spinSpeed -= 2;

        if (this.spinSpeed < 0) {
          this.spinSpeed = 0;
        }
      }
      this.checkPosition();
    }, 10);
  }

 // create the masking for symbol Area
  private reelmask(Positionx?: number) {
    const mask = new Graphics();
    mask.label = "symbolsMask";

    mask.rect(Positionx,-219, 120, 515);

    mask.fill(0xffffff);

    this.mask = mask;
    getBg().getBgCtr().addChild(mask);
  }

  // Blur Symbools
  private blurSymbols(blurnum?: number) {
    for (let num = 0; num < this.Symbols.length; num++) {
      let symbols = this.Symbols[num];
      symbols.filters = [
        new BlurFilter({
          strength: blurnum,
        }),
      ];
    }
  }

  private checkPosition() {
    // Check all symbols
    for (let index = 0; index < this.Symbols.length; index++) {
      const currentY = this.Symbols[index].y;

      if (currentY == 0 || currentY == 150 || currentY == 300) {
        clearInterval(this.stopReelAnimation);

        Ticker.shared.remove(this.spinboundle);
        this.spinSpeed = 30;
        console.log("Reel stopped at:", currentY);
        break;
      } else {
        this.spinSpeed = 30;
      }
    }
  }

  private bounceanimation() {
    for (let num = 0; num < this.Symbols.length; num++) {
      let symbols = this.Symbols[num];
      symbols.y -= 30;
    }
  }

  public getmask(x: number) {
    return this.reelmask(x);
  }

  public getBlurSymbols(BlurNum: number) {
    return this.blurSymbols(BlurNum);
  }

}
