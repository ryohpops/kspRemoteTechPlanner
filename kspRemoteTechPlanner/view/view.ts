/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../calculator/point.ts" />

class View {
    static fontSetNormal: string = "16px Arial";
    static fontSetBig: string = "20px Arial";
    static marginText: number = 8;
    static marginTextPushed: number = 24;
    static strokeLineWidth: number = 0.8;
    static dotRadius: number = 4;
    static arrowSize: number = 20;

    shapes: createjs.Container;
    texts: createjs.Container;
    innerSize: number;
    outerSize: number;

    get innerCenter(): Point {
        return new Point(this.innerSize / 2, this.innerSize / 2);
    }

    get outerCenter(): Point {
        return new Point(this.outerSize / 2, this.outerSize / 2);
    }

    constructor(stage: createjs.Stage, innerSize: number, outerSize: number) {
        this.shapes = new createjs.Container();
        this.texts = new createjs.Container();
        stage.addChild(this.shapes);
        stage.addChild(this.texts);

        this.innerSize = innerSize;
        this.outerSize = outerSize;
    }

    toInner(valueOuter: number): number {
        return valueOuter * this.innerSize / this.outerSize;
    }

    toOuter(valueInner: number): number {
        return valueInner * this.outerSize / this.innerSize;
    }
} 