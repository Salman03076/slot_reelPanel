import { Container, Graphics, Text } from "pixi.js";
import { getStage } from "../index.js";
import { getPlayspin, getReel1, getReel5, getSoundManager } from "../game.js";

export class betTable {
  private btnPanel: Container = new Container();
  private table: Graphics;
  private spin: Graphics;
  private betnum: number[] = [10, 15, 20, 30, 40, 150, 175, 200];
  private betIdexNum: number = 0;
  private spin_x = 0;
  private btnPanel_y = 890;
  private table_x = 200;
  private btnText: Text;
  private betIncrease: Graphics;
  private betDiscrease: Graphics;
  private betshow: Graphics;
  private bet: Text;

  constructor() {
    this.btnPanel.label = `buttonPanel`;
    addEventListener(`resize`, this.resizeBtnPanle.bind(this));
    this.betTable();
    this.discreasebetbtn();
    this.increasebetbtn();
    this.bet_show();
    this.spinbtn();
    getStage().addChild(this.table);
    this.btnPanel.addChild(this.table);
    getStage().addChild(this.btnPanel);
    this.resizeBtnPanle();
    this.btnPanel.y = this.btnPanel_y;
  }

  //create bet  table
  private betTable() {
    this.table = new Graphics();
    this.table.label = `_betTable_`;
    this.table.x = this.table_x;
    this.table.roundRect(0, 0, 200, 60, 25);
    this.table.fill("#A02410");
    this.table.pivot.set(this.table.width / 2, this.table.height / 2);

    this.table.stroke({
      width: 3,
      color: "#D68B23",
    });

    this.btnPanel.addChild(this.table);
  }

  //  create  reel spin button
  private spinbtn() {
    this.spin = new Graphics();
    this.spin.label = `_spinbtn_`;
    this.spin.height = 100;
    this.spin.width = 100;
    this.spin.circle(40, 40, 40);
    this.spin.fill(`#951F0D`);
    this.spin.stroke({ width: 2, color: "#EAB80D" });
    this.spin.eventMode = "static";
    this.spin.cursor = "pointer";
    const onSpin = () => {
      if (!getReel5()) {
        getPlayspin();
      }
    };


    this.spin.on(`pointerdown`, onSpin);


    setInterval(() => {
      if (getReel1() || getReel5()) {
        this.spin.off(`pointerdown`, onSpin);
      } else (
        this.spin.on(`pointerdown`, onSpin)
      )

    }, 10);




    this.spin.pivot.set(this.spin.width / 2, this.spin.height / 2);

    this.spinbtnText();
    this.btnPanel.addChild(this.spin);
  }

  // show the bet number
  private bet_show(): void {
    this.betshow = new Graphics();
    this.betshow.label = "_betShow_";
    this.betshow.roundRect(0, 0, 100, 50, 15);
    this.betshow.pivot.set(this.betshow.width / 2, this.betshow.height / 2);

    this.betshow.position.set(this.table.width / 2, this.table.height / 2);

    this.betText(`$${this.betnum[this.betIdexNum]}`);
    this.table.addChild(this.betshow);
  }

  //  bet  increse button
  private increasebetbtn() {
    this.betIncrease = new Graphics();
    this.betIncrease.label = "_increasebetbtn_";

    this.betIncrease.circle(20, 20, 20);
    this.betIncrease.fill(`#901C03`);

    this.betIncrease.pivot.set(
      this.betIncrease.width / 2,
      this.betIncrease.height / 2,
    );

    this.betIncrease.position.set(this.table.width - 30, this.table.height / 2);

    this.betIncrease.stroke({
      width: 3,
      color: "#D68B23",
    });

    this.clickEvetIncreaseBtn();
    this.betIncreeText();
    this.table.addChild(this.betIncrease);
  }

  //  increasebtn add click event
  private clickEvetIncreaseBtn() {
    this.betIncrease.eventMode = "static";
    this.betIncrease.cursor = "pointer";
    const onIncreaseBet = () => {
      getSoundManager().clickSound.play();
      if (this.betIdexNum < this.betnum.length - 1) {
        ++this.betIdexNum;
        this.betshow.removeChildren();
        this.betText(`$${this.betnum[this.betIdexNum]}`);
      }
    };

    this.betIncrease.on("pointerdown", onIncreaseBet);
  }

  // bet sicrease buttton
  private discreasebetbtn() {
    this.betDiscrease = new Graphics();
    this.betDiscrease.label = "_increasethis.betDiscrease_";

    this.betDiscrease.circle(20, 20, 20);
    this.betDiscrease.fill(`#901C03`);

    this.betDiscrease.pivot.set(
      this.betDiscrease.width / 2,
      this.betDiscrease.height / 2,
    );

    this.betDiscrease.position.set(30, this.table.height / 2);

    this.betDiscrease.stroke({
      width: 3,
      color: "#D68B23",
    });

    this.clickEvetDiscreaseBtn();
    this.betDisncreeText();
    this.table.addChild(this.betDiscrease);
  }

  // discrase add click event
  private clickEvetDiscreaseBtn() {
    this.betDiscrease.eventMode = "static";
    this.betDiscrease.cursor = "pointer";
    const onDecreaseBet = () => {
      if (this.betIdexNum > 0) {
        getSoundManager().clickSound.play();
        --this.betIdexNum;
        this.betshow.removeChildren();
        this.betText(`$${this.betnum[this.betIdexNum]}`);
      }
    };
    this.betDiscrease.on("pointerdown", onDecreaseBet);
  }

  //spin button text
  private spinbtnText() {
    this.btnText = new Text({
      text: "SPIN",
      style: {
        fontSize: 25,
        fill: 0xffffff,
        fontWeight: "bold",
      },
    });

    this.btnText.anchor.set(0.5);
    this.btnText.position.set(
      (this.btnText.x = this.spin.width / 2),
      (this.btnText.y = this.spin.height / 2),
    );

    this.spin.addChild(this.btnText);
  }

  //betincrese add symbol
  private betIncreeText() {
    const btnText = new Text({
      text: "+",
      style: {
        fontSize: 25,
        fill: 0xffffff,
        fontWeight: "bold",
      },
    });

    btnText.anchor.set(0.5);
    btnText.position.set(
      this.betIncrease.width / 2,
      this.betIncrease.height / 2,
    );

    this.betIncrease.addChild(btnText);
  }

  //  betDiscrease add taxt
  private betDisncreeText() {
    const btnText = new Text({
      text: "-",
      style: {
        fontSize: 30,
        fill: 0xffffff,
        fontWeight: "bold",
      },
    });

    btnText.anchor.set(0.5);
    btnText.position.set(
      this.betDiscrease.width / 2 - 3,
      this.betDiscrease.height / 2 - 4,
    );

    this.betDiscrease.addChild(btnText);
  }

  // add in betshow  bet number
  private betText(text: string) {
    this.bet = new Text({
      text: text,
      style: {
        fontSize: 25,
        fill: 0xffffff,
      },
    });

    this.bet.anchor.set(0.5);
    this.bet.position.set(this.betshow.width / 2, this.betshow.height / 2);

    this.betshow.addChild(this.bet);
  }

  // resixe button Panle
  private resizeBtnPanle() {
    this.btnPanel.x = innerWidth / 2;
    this.btnPanel.y = this.btnPanel_y;
  }

  // modifer text
  public modifertext(text: string) {
    this.btnText.text = text;
  }

  // get button Panel
  public getBtnPanel() {
    return this.btnPanel;
  }
}
