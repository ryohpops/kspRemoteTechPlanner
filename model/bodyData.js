var BodyData;
(function (BodyData) {
    var bodies = {
        "Kerbol": { name: "Kerbol", color: "rgb(255,242,0)", radius: 261600, stdGravParam: 1172332800, soi: Number.POSITIVE_INFINITY },
        "Moho": { name: "Moho", color: "rgb(185,122,87)", radius: 250, stdGravParam: 168.60938, soi: 9646.663 },
        "Eve": { name: "Eve", color: "rgb(163,73,164)", radius: 700, stdGravParam: 8171.7302, soi: 85109.365 },
        "Gilly": { name: "Gilly", color: "rgb(239,228,176)", radius: 13, stdGravParam: 0.0082894498, soi: 126.12327 },
        "Kerbin": { name: "Kerbin", color: "rgb(63,111,40)", radius: 600, stdGravParam: 3531.6, soi: 84159.286 },
        "Mun": { name: "Mun", color: "rgb(127,127,127)", radius: 200, stdGravParam: 65.138398, soi: 2429.5591 },
        "Minmus": { name: "Minmus", color: "rgb(153,217,234)", radius: 60, stdGravParam: 1.7658, soi: 2247.4284 },
        "Duna": { name: "Duna", color: "rgb(237,28,36)", radius: 320, stdGravParam: 301.36321, soi: 47921.949 },
        "Ike": { name: "Ike", color: "rgb(127,127,127)", radius: 130, stdGravParam: 18.568369, soi: 1049.5989 },
        "Dres": { name: "Dres", color: "rgb(195,195,195)", radius: 138, stdGravParam: 21.484489, soi: 32832.84 },
        "Jool": { name: "Jool", color: "rgb(92,231,58)", radius: 6000, stdGravParam: 282528, soi: 2455985.2 },
        "Laythe": { name: "Laythe", color: "rgb(25,55,98)", radius: 500, stdGravParam: 1962, soi: 3723.6458 },
        "Vall": { name: "Vall", color: "rgb(82,133,141)", radius: 300, stdGravParam: 207.48150, soi: 2406.4014 },
        "Tylo": { name: "Tylo", color: "rgb(195,195,195)", radius: 600, stdGravParam: 4523.8934, soi: 10856.518 },
        "Bop": { name: "Bop", color: "rgb(142,106,51)", radius: 65, stdGravParam: 2.4868349, soi: 1221.0609 },
        "Pol": { name: "Pol", color: "rgb(206,211,1)", radius: 44, stdGravParam: 0.72170208, soi: 1042.1389 },
        "Eeloo": { name: "Eeloo", color: "rgb(221,221,210)", radius: 210, stdGravParam: 74.410815, soi: 119082.94 }
    };

    function getBody(name) {
        return bodies[name];
    }
    BodyData.getBody = getBody;
})(BodyData || (BodyData = {}));
