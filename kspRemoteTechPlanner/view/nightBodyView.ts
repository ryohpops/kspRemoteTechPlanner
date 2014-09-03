/// <reference path="../scripts/typings/easeljs/easeljs.d.ts" />
/// <reference path="../scripts/typings/createjs-lib/createjs-lib.d.ts" />
/// <reference path="../scripts/typings/tweenjs/tweenjs.d.ts" />
/// <reference path="../model/body.ts" />
/// <reference path="../model/satellites.ts" />
/// <reference path="../calculator/point.ts" />
/// <reference path="graphicshelper.ts" />
/// <reference path="view.ts" />
/// <reference path="nightview.ts" />

class NightBodyView extends NightView {

    constructor(stage: createjs.Stage, innerSize: number, outerSize: number) {
        super(stage, innerSize, outerSize);
    }

    showFigures() {
        this.showNightArea();
        this.showBody(this.satellites.body);
        this.showOrbit();
        this.updateText(this.satellites);
    }
} 