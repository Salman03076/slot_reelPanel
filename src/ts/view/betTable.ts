import { Container, Graphics, Text } from "pixi.js";
import { getStage } from "../index.js";
import { getPlayspin } from "../game.js";
import { isThisTypeNode } from "typescript/unstable/ast";


export class betTable extends Container {
    private table: Graphics;


    constructor() {
        super();
        this.label = `_Container"betTable`;
        this.table = new Graphics();
        this.table.label = `_betTable_`;
        this.table.rect(0, 0, 500, 100);
        // this.table.alpha = 0.6;
        this.table.fill("red");
        this.table.pivot.set(
            this.table.width / 2,
            this.table.height / 2
        );

        this.table.position.set(
            globalThis.screen.width / 2,
            globalThis.screen.height / 2
        );

        this.resize();
        // this.spinbtn();
        this.betMoney()
        this.addChild(this.table);
        getStage().addChild(this);

    }


    private spinbtn() {
        const spin = new Graphics();
        spin.label = `_spinbtn_`;
        spin.circle(30, 50, 50);
        spin.fill(`#951F0D`);
        spin.eventMode = "static"
        spin.on(`pointerdown`, () => {
            getPlayspin()
        });
        // spin.y = this.table.height / 2;

        // spin.pivot.set(
        //     spin.width / 2,
        //     // spin.height / 2
        // );

        // spin.position.set(
        //     globalThis.screen.width / 2,
        //     // globalThis.screen.height / 2
        // );
        spin.x = this.table.width / 2;
        this.table.addChild(spin);
    }



    private betMoney() {
        const betleyout = new Graphics();
        betleyout.rect(20, 0, 400, 80);
        betleyout.fill("white");
        for (let i = 1; i < 5; i++) {
            const text = new Text(`${i * 10}`);
            text.style = { fill: "black", fontSize: 50 };
            text.anchor.set(0.5);
            text.position.set(70 * i + 10, betleyout.height / 2);
            betleyout.addChild(text);
        }
        getStage().addChild(betleyout)

    }


    private resize() {
        this.table.x = innerWidth / 2;
        this.table.y = innerHeight / 2;
    }
















}