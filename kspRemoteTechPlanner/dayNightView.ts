///// <reference path="scripts/typings/easeljs/easeljs.d.ts" />
///// <reference path="scripts/typings/createjs-lib/createjs-lib.d.ts" />
///// <reference path="scripts/typings/tweenjs/tweenjs.d.ts" />

///// <reference path="bodydata.ts" />
///// <reference path="calculator.ts" />
///// <reference path="graphicshelper.ts" />

///// <reference path="drawable.ts" />

//class DayNightView extends View {
//    private bodyRadius = 50;
//    private orbitRadius = 150;

//    body: BodyData.Body;

//    shapeInner: createjs.Shape;
//    txtDayTime: createjs.Text;
//    txtRequiredGenerator: createjs.Text;
//    txtNightTime: createjs.Text;
//    txtRequiredBattery: createjs.Text;

//    constructor(shapeBase: createjs.Container, textBase: createjs.Container, inner: number, outer: number) {
//        super(shapeBase, textBase, inner, outer);

//        this.shapeInner = new createjs.Shape();
//        this.shapeInner.scaleX = this.shapeInner.scaleY = this.outerSize / this.innerSize;
//        this.shapes.addChild(this.shapeInner);

//        this.txtDayTime = new createjs.Text("", "20px Arial", "black");
//        this.txtDayTime.textAlign = "center";
//        this.txtDayTime.textBaseline = "bottom";
//        this.txtDayTime.x = this.outerSize / 2;
//        this.txtDayTime.y = this.outerSize / 2 - this.orbitRadius - 5;
//        this.texts.addChild(this.txtDayTime);

//        this.txtRequiredGenerator = new createjs.Text("", "20px Arial", "black");
//        this.txtRequiredGenerator.textAlign = "center";
//        this.txtRequiredGenerator.textBaseline = "top";
//        this.txtRequiredGenerator.x = this.outerSize / 2;
//        this.txtRequiredGenerator.y = this.outerSize / 2 + this.orbitRadius + 5;
//        this.texts.addChild(this.txtRequiredGenerator);

//        this.txtNightTime = new createjs.Text("", "20px Arial", "black");
//        this.txtNightTime.textAlign = "left";
//        this.txtNightTime.textBaseline = "bottom";
//        this.txtNightTime.x = this.outerSize / 2 + this.bodyRadius;
//        this.txtNightTime.y = this.outerSize / 2 - this.bodyRadius - 5;
//        this.texts.addChild(this.txtNightTime);

//        this.txtRequiredBattery = new createjs.Text("", "20px Arial", "black");
//        this.txtRequiredBattery.textAlign = "left";
//        this.txtRequiredBattery.textBaseline = "top";
//        this.txtRequiredBattery.x = this.outerSize / 2 + this.bodyRadius;
//        this.txtRequiredBattery.y = this.outerSize / 2 + this.bodyRadius + 5;
//        this.texts.addChild(this.txtRequiredBattery);
//    }

//    show(): void {
//        this.shapeInner.graphics.clear();

//        // night area
//        this.shapeInner.graphics.beginFill("rgba(0,0,0,0.2)")
//            .drawRect(this.outerSize / 2, this.outerSize / 2 - this.bodyRadius, this.outerSize / 2, this.bodyRadius * 2)
//            .endFill();

//        // planet
//        this.shapeInner.graphics.beginFill(body.color)
//            .drawCircle(this.outerSize / 2, this.outerSize / 2, this.bodyRadius)
//            .endFill();

//        // orbit
//        this.shapeInner.graphics.beginStroke("black")
//            .drawCircle(this.outerSize / 2, this.outerSize / 2, this.orbitRadius)
//            .endFill();



//        // texts
//        this.txtDayTime.text = "day time: " + "" + " sec";
//    }
//}