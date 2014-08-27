var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var EntireView = (function (_super) {
    __extends(EntireView, _super);
    function EntireView(stage, innerSize, outerSize) {
        _super.call(this, stage, innerSize, outerSize);

        this.shapeInner = new createjs.Shape();
        this.shapes.addChild(this.shapeInner);

        this.txtBodyName = new createjs.Text("", View.fontSetBig);
        this.txtBodyName.textAlign = "center";
        this.txtBodyName.textBaseline = "middle";
        this.txtBodyName.x = this.outerCenter.x;
        this.txtBodyName.y = this.outerCenter.y;
        this.texts.addChild(this.txtBodyName);

        this.txtBodySoI = new createjs.Text("", View.fontSetNormal);
        this.txtBodySoI.textAlign = "center";
        this.txtBodySoI.textBaseline = "top";
        this.txtBodySoI.x = this.outerCenter.x;
        this.texts.addChild(this.txtBodySoI);

        this.txtSatAltitude = new createjs.Text("", View.fontSetNormal);
        this.txtSatAltitude.textAlign = "center";
        this.txtSatAltitude.textBaseline = "top";
        this.txtSatAltitude.x = this.outerCenter.x;
        this.texts.addChild(this.txtSatAltitude);

        this.txtCommDistance = new createjs.Text("", View.fontSetNormal);
        this.txtCommDistance.textAlign = "left";
        this.txtCommDistance.textBaseline = "top";
        this.texts.addChild(this.txtCommDistance);

        this.txtCommStableRange = new createjs.Text("", View.fontSetNormal);
        this.txtCommStableRange.textAlign = "center";
        this.txtCommStableRange.textBaseline = "bottom";
        this.txtCommStableRange.x = this.outerCenter.x;
        this.texts.addChild(this.txtCommStableRange);
    }
    EntireView.prototype.show = function () {
        this.shapeInner.scaleX = this.shapeInner.scaleY = this.outerSize / this.innerSize;

        this.shapeInner.graphics.clear();
        this.shapeInner.graphics.setStrokeStyle(this.toInner(View.strokeLineWidth));

        this.showSatellites(this.shapeInner.graphics, this.satellites, this.satellites.body, this.satellites.antenna);
        this.showBody(this.shapeInner.graphics, this.satellites, this.satellites.body);
    };

    EntireView.prototype.showBody = function (g, s, b) {
        g.beginFill(b.color).drawCircle(this.innerCenter.x, this.innerCenter.y, b.radius).endFill();

        this.txtBodyName.text = b.name;

        if (b.soi != Number.POSITIVE_INFINITY) {
            g.beginStroke("yellow").drawCircle(this.innerCenter.x, this.innerCenter.y, b.soi - b.radius).endStroke();

            this.txtBodySoI.text = "Sphere of Influence: " + (b.soi - b.radius).toLocaleString("en", View.localeSetting) + " km";
            this.txtBodySoI.y = this.outerCenter.y + Math.max(this.toOuter(b.soi - b.radius) + View.marginText, this.toOuter(b.radius + s.altitude) + View.marginTextPushed);
        } else {
            this.txtBodySoI.text = "";
        }
    };

    EntireView.prototype.showSatellites = function (g, s, b, a) {
        g.beginStroke("black").drawCircle(this.innerCenter.x, this.innerCenter.y, s.altitude + b.radius).endStroke();

        this.txtSatAltitude.text = "Altitude: " + s.altitude.toLocaleString("en", View.localeSetting) + " km";
        this.txtSatAltitude.y = this.outerCenter.y + this.toOuter(s.altitude + b.radius) + View.marginText;

        for (var i = 0; i < s.count; i++) {
            g.beginFill("black").drawCircle(this.innerCenter.x + s.satPosition(i).x, this.innerCenter.y + s.satPosition(i).y, this.toInner(View.dotRadius)).endFill();
        }

        for (var i = 0; i < s.count; i++) {
            g.beginFill("rgba(255,0,0,0.1)").drawCircle(this.innerCenter.x + s.satPosition(i).x, this.innerCenter.y + s.satPosition(i).y, a.range).endFill();
        }

        g.beginStroke(s.isNextSatConnectable() ? "blue" : "red");
        GraphicsHelper.drawDualArrow(this.shapeInner.graphics, this.innerCenter.x + s.satPosition(0).x, this.innerCenter.y + s.satPosition(0).y, this.innerCenter.x + s.satPosition(1).x, this.innerCenter.y + s.satPosition(1).y, this.toInner(View.arrowSize)).endStroke();

        this.txtCommDistance.text = "Distance: " + s.satDistance().toLocaleString("en", View.localeSetting) + " km";
        this.txtCommDistance.x = this.outerCenter.x + this.toOuter((s.satPosition(0).x + s.satPosition(1).x) / 2) + View.marginText / 2;
        this.txtCommDistance.y = this.outerCenter.y + this.toOuter((s.satPosition(0).y + s.satPosition(1).y) / 2) + View.marginText / 2;

        if (s.hasStableArea()) {
            this.shapeInner.graphics.beginStroke("green").drawCircle(this.innerCenter.x, this.innerCenter.y, s.stableLimitAltitude() + b.radius).endStroke();

            this.txtCommStableRange.text = "Stable: " + s.stableLimitAltitude().toLocaleString("en", View.localeSetting) + " km";
            this.txtCommStableRange.y = this.outerCenter.y - this.toOuter(s.stableLimitAltitude() + b.radius) - View.marginText;
        } else {
            this.txtCommStableRange.text = "";
        }
    };
    return EntireView;
})(View);
