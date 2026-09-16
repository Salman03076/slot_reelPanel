import { Container, Sprite, Texture } from "pixi.js";
import { Panel, reelbackground } from "../ulity.js";
import { getStage } from "../index.js";

//background initialization
export class background {
  private reelContainer: Container;
  private bgContainer: Container;
  private reelPanelbg: Sprite;
  private reelContainerTecture: Texture;
  private reelBackgrondSprite: Sprite;

  constructor() {
    addEventListener(`resize`, this.manageGameSize.bind(this));
    this.reelContainer = new Container();
    this.reelContainer.label = "reelContainer";
    this.bgContainer = new Container();
    this.bgContainer.label = "bgContainer";
    this.reelContainer.addChild(this.bgContainer);
    getStage().addChild(this.reelContainer);
    this.bginit();
  }

  public getBgCtr() {
    return this.bgContainer;
  }

  private async bginit(): Promise<void> {
    this.reelContainer.x = innerWidth / 2;
    this.reelContainer.y = innerHeight / 2;
    await this.bgsprite();
    await this.reelPanel();
  }

  private async bgsprite(): Promise<void> {
    this.reelContainerTecture = await reelbackground();
    this.reelBackgrondSprite = new Sprite(this.reelContainerTecture);
    this.reelBackgrondSprite.anchor.set(0.5);
    this.reelBackgrondSprite.height = innerHeight;
    this.reelBackgrondSprite.width = innerWidth;
    this.bgContainer.addChild(this.reelBackgrondSprite);
  }
  private async reelPanel(): Promise<void> {
    this.reelPanelbg = new Sprite(await Panel());
    this.reelPanelbg.anchor.set(0.5);
    this.reelPanelbg.height = 800;
    this.reelPanelbg.width = 1200;
    this.bgContainer.addChild(this.reelPanelbg);
  }

  private manageGameSize() {
    this.reelContainer.x = innerWidth / 2;
    this.reelContainer.y = innerHeight / 2;
  }

  public getBgSprite() {
    return this.reelBackgrondSprite;
  }

  public getReelPanleHeight() {
    return this.reelPanelbg.height;
  }

  public getReelCtr() {
    return this.reelContainer;
  }
}
