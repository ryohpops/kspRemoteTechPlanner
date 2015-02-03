/// <reference path="../appreferences.ts" />

module App {
    // abstruct
    export class ViewService {
        'use strict';

        static fontSetNormal: string = "16px Arial";
        static fontSetBig: string = "20px Arial";
        static localeSetting: Intl.NumberFormatOptions = { maximumFractionDigits: 3 };
        static marginText: number = 8;
        static marginTextPushed: number = 24;
        static strokeLineWidth: number = 1;
        static dotRadius: number = 4;
        static arrowSize: number = 16;

        stage: createjs.Stage;
        shapeContainer: createjs.Container;
        textContainer: createjs.Container;
        virtualSize: number;
        realSize: number;

        get center(): Calculator.Point {
            return new Calculator.Point(this.realSize / 2, this.realSize / 2);
        }

        constructor(target: String, virtualSize: number, realSize: number) {
            this.stage = new createjs.Stage(target);
            this.shapeContainer = new createjs.Container();
            this.textContainer = new createjs.Container();
            this.stage.addChild(this.shapeContainer);
            this.stage.addChild(this.textContainer);

            this.virtualSize = virtualSize;
            this.realSize = realSize;
        }

        toReal(virtual: number): number {
            return virtual * this.realSize / this.virtualSize;
        }

        update() {
            this.stage.update();
        }
    }
}
