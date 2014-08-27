var AntennaData;
(function (AntennaData) {
    var antennas = {
        "Reflectron DP-10": { name: "Reflectron DP-10", type: 0 /* omni */, range: 500, elcConsumption: 0.01 },
        "Communotron 16": { name: "Communotron 16", type: 0 /* omni */, range: 2500, elcConsumption: 0.13 },
        "CommTech EXP-VR-2T": { name: "CommTech EXP-VR-2T", type: 0 /* omni */, range: 3000, elcConsumption: 0.18 },
        "Communotron 32": { name: "Communotron 32", type: 0 /* omni */, range: 5000, elcConsumption: 0.6 },
        "Comms DTS-M1": { name: "Comms DTS-M1", type: 1 /* dish */, range: 50000, elcConsumption: 0.82 },
        "Reflectron KR-7": { name: "Reflectron KR-7", type: 1 /* dish */, range: 90000, elcConsumption: 0.82 }
    };

    function getAntenna(name) {
        return antennas[name];
    }
    AntennaData.getAntenna = getAntenna;
})(AntennaData || (AntennaData = {}));
