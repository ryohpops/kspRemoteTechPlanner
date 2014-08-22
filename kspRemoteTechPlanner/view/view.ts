/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../calculator/point.ts" />

class View {
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