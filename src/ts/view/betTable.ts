import { Container, Graphics, Text } from "pixi.js";
import { getStage } from "../index.js";
import { getPlayspin, getReel5, } from "../game.js";

export class betTable extends Container {
    private table: Graphics;
    private spin: Graphics;
    private betnum: number[] = [10, 20, 30, 40]
    private betIdexNum: number = 0;
    private spin_x = 250;
    private spin_y = 415;
    private btnText: Text;
    private betIncrease: Graphics;
    private betDiscrease: Graphics;
    private betshow: Graphics
    private bet: Text


    constructor() {
        super();
        this.label = `_Container"betTable`;
        this.y = 410;
        this.betTable();
        this.discreasebetbtn();
        this.increasebetbtn();
        this.bet_show();
        this.spinbtn();
        getStage().addChild(this);

    }

    private betTable() {
        this.table = new Graphics();
        this.table.label = `_betTable_`;
        this.table.roundRect(0, 0, 400, 70, 25);
        this.table.fill("#A02410");
        this.table.pivot.set(
            this.table.width / 2,
            this.table.height / 2
        );

        this.table.x = globalThis.screen.width / 2;


        this.table.stroke({
            width: 3,
            color: "#D68B23"
        })

        this.addChild(this.table);
        this.resize();

    }


    private spinbtn() {
        this.spin = new Graphics();
        this.spin.label = `_spinbtn_`;
        this.spin.circle(40, 40, 40);
        this.spin.fill(`#951F0D`);
        this.spin.stroke({ width: 2, color: "#EAB80D" });
        this.spin.eventMode = "static";
        this.spin.cursor = "pointer"
        this.spin.on(`pointerdown`, () => {
            if (!getReel5()) {
                getPlayspin();
            }

        });

        this.spin.pivot.set(
            this.betIncrease.width / 2,
            this.spin.height / 2
        );

        this.spin.position.set(
            this.spin.x = (globalThis.screen.width / 2) + this.spin_x,
            this.spin.y = (globalThis.screen.height / 2) + this.spin_y
        );
        this.spinbtnText();
        getStage().addChild(this.spin);
    }

    private bet_show(): void {
        this.betshow = new Graphics();
        this.betshow.label = "_betbox_"
        this.betshow.roundRect(0, 0, 100, 50, 15);
        this.betshow.fill(`#901C03`);
        this.betshow.pivot.set(
            this.betshow.width / 2,
            this.betshow.height / 2
        );

        this.betshow.position.set(
            this.table.width / 2,
            this.table.height / 2
        );

        this.betshow.stroke({
            width: 3,
            color: "#D68B23"
        })


        this.betText(`$${this.betnum[this.betIdexNum]}`)
        this.table.addChild(this.betshow);
    }

    private increasebetbtn() {
        this.betIncrease = new Graphics();
        this.betIncrease.label = "_increasebetbtn_";

        this.betIncrease.circle(20, 20, 20);
        this.betIncrease.fill(`#901C03`);

        this.betIncrease.pivot.set(
            this.betIncrease.width / 2,
            this.betIncrease.height / 2
        );

        this.betIncrease.position.set(
            this.table.width - 30,
            this.table.height / 2
        );

        this.betIncrease.stroke({
            width: 3,
            color: "#D68B23"
        })



        this.clickEvetIncreaseBtn()
        this.betIncreeText()
        this.table.addChild(this.betIncrease);
    }


    private clickEvetIncreaseBtn() {
        this.betIncrease.eventMode = "static"
        this.betIncrease.cursor = "pointer";
        const onIncreaseBet = () => {
            if (this.betIdexNum < this.betnum.length - 1) {
                ++this.betIdexNum;
                this.betshow.removeChildren();
                this.betText(`$${this.betnum[this.betIdexNum]}`);
            } else {
                this.betIncrease.off("pointerdown", onIncreaseBet);
            }
        };

        this.betIncrease.on("pointerdown", onIncreaseBet);
    }


    private discreasebetbtn() {
        this.betDiscrease = new Graphics();
        this.betDiscrease.label = "_increasethis.betDiscrease_";

        this.betDiscrease.circle(20, 20, 20);
        this.betDiscrease.fill(`#901C03`);

        this.betDiscrease.pivot.set(
            this.betDiscrease.width / 2,
            this.betDiscrease.height / 2
        );

        this.betDiscrease.position.set(
            30,
            this.table.height / 2
        );

        this.betDiscrease.stroke({
            width: 3,
            color: "#D68B23"
        })

        this.clickEvetDiscreaseBtn()
        this.betDisncreeText();
        this.table.addChild(this.betDiscrease);
    }




    private clickEvetDiscreaseBtn() {
        this.betDiscrease.eventMode = "static";
        this.betDiscrease.cursor = "pointer";
        const onDecreaseBet = () => {
            if (this.betIdexNum > 0) {
                --this.betIdexNum;
                this.betshow.removeChildren();
                this.betText(`$${this.betnum[this.betIdexNum]}`);
            } else {
                this.betDiscrease.off("pointerdown", onDecreaseBet);
            }
        };
        this.betDiscrease.on("pointerdown", onDecreaseBet);
    }


    private spinbtnText() {
        this.btnText = new Text({
            text: "SPIN",
            style: {
                fontSize: 25,
                fill: 0xffffff,
                fontWeight: "bold"
            }
        })

        this.btnText.anchor.set(0.5);
        this.btnText.position.set(
            this.btnText.x = this.spin.width / 2,
            this.btnText.y = this.spin.height / 2
        );

        this.spin.addChild(this.btnText);


    }

    private betIncreeText() {
        const btnText = new Text({
            text: "+",
            style: {
                fontSize: 35,
                fill: 0xffffff,
                fontWeight: "bold"
            }
        });

        btnText.anchor.set(0.5);
        btnText.position.set(
            this.betIncrease.width / 2,
            this.betIncrease.height / 2
        );

        this.betIncrease.addChild(btnText);
    }



    private betDisncreeText() {
        const btnText = new Text({
            text: "-",
            style: {
                fontSize: 35,
                fill: 0xffffff,
                fontWeight: "bold"
            }
        });

        btnText.anchor.set(0.5);
        btnText.position.set(
            this.betDiscrease.width / 2,
            this.betDiscrease.height / 2
        );

        this.betDiscrease.addChild(btnText);
    }


    private betText(text: string) {
        this.bet = new Text({
            text: text,
            style: {
                fontSize: 35,
                fill: 0xffffff,

            }
        });

        this.bet.anchor.set(0.5);
        this.bet.position.set(
            this.betshow.width / 2,
            this.betshow.height / 2
        );

        this.betshow.addChild(this.bet);
    }




    private resize() {
        this.table.x = innerWidth / 2;
        this.table.y = innerHeight / 2;
    }



    public modifertext(text: string) {
        this.btnText.text = text;
    }



}