/// <reference path="../appreferences.ts" />
module App {
    // virtual
    export class ViewService {
        'use strict';

        static fontSetNormal: string = "16px Arial";
        static fontSetBig: string = "20px Arial";
        static localeSetting: Intl.NumberFormatOptions = { maximumFractionDigits: 3 };
        static marginText: number = 8;
        static marginTextPushed: number = 24;
        static strokeLineWidth: number = 0.8;
        static dotRadius: number = 4;
        static arrowSize: number = 20;

        stage: createjs.Stage;
        shapes: createjs.Container;
        texts: createjs.Container;
        innerSize: number;
        outerSize: number;

        get innerCenter(): Calculator.Point {
            return new Calculator.Point(this.innerSize / 2, this.innerSize / 2);
        }

        get outerCenter(): Calculator.Point {
            return new Calculator.Point(this.outerSize / 2, this.outerSize / 2);
        }

        constructor(target: String, innerSize: number, outerSize: number) {
            this.stage = new createjs.Stage(target);
            this.shapes = new createjs.Container();
            this.texts = new createjs.Container();
            this.stage.addChild(this.shapes);
            this.stage.addChild(this.texts);

            this.innerSize = innerSize;
            this.outerSize = outerSize;
        }

        toInner(valueOuter: number): number {
            return valueOuter * this.innerSize / this.outerSize;
        }

        toOuter(valueInner: number): number {
            return valueInner * this.outerSize / this.innerSize;
        }

        update() {
            this.stage.update();
        }
    }
}
