/// <reference path="../_references.ts" />

module App {
    'use strict';

    export class SatChainService {
        private static dataKey: string = "inputData";
        private static versionKey: string = "inputDataVersion";
        private static modelVersion: number = 2;

        private _satChain: SatChain;
        get satChain(): SatChain { return this._satChain; }

        static $inject = ["eventServ", "storageServ", "bodyDictServ", "antennaDictServ"];
        constructor(
            private eventServ: EventService,
            private storageServ: StorageService,
            private bodyDictServ: BodyDictionaryService,
            private antennaDictServ: AntennaDictionaryService
            ) {

            var loaded: LoadResult = storageServ.load(SatChainService.dataKey, SatChainService.versionKey);
            if (loaded.data) {
                this._satChain = this.unpack(this.update(loaded.data, loaded.version));
            } else {
                this._satChain = new SatChain(bodyDictServ.get("Kerbin"), 4, 1000, 0.029,
                    [{ antenna: antennaDictServ.get("Communotron 16"), quantity: 1 }], 0, 70);
            }

            this.save();
            storageServ.setVersion(SatChainService.versionKey, SatChainService.modelVersion);

            eventServ.on(Events.updateBody,(event: angular.IAngularEvent) => {
                this.updateBody();
            });
            eventServ.on(Events.updateAntenna,(event: angular.IAngularEvent) => {
                this.updateAntenna();
            });
        }

        private updateBody() {
            var b: Body = this.bodyDictServ.get(this.satChain.body.name);
            for (var item in b)
                this.satChain.body[item] = b[item];
        }

        private updateAntenna() {
            for (var index in this.satChain.antennas) {
                var a: Antenna = this.antennaDictServ.get(this.satChain.antennas[index].antenna.name);
                for (var item in a)
                    this.satChain.antennas[index].antenna[item] = a[item];
            }
        }

        save() {
            this.storageServ.save(SatChainService.dataKey, this.pack(this.satChain));
        }

        private pack(satChain: SatChain): SatChainJSON {
            var json: SatChainJSON = {
                body: satChain.body.name, count: satChain.count, altitude: satChain.altitude, elcNeeded: satChain.elcNeeded,
                antennas: new Array<AntennaEquipmentJSON>(), antennaIndex: satChain.antennaIndex, parkingAlt: satChain.parkingAlt
            };

            for (var index in this.satChain.antennas) {
                var ae: AntennaEquipment = this.satChain.antennas[index];
                json.antennas.push({ antenna: ae.antenna.name, quantity: ae.quantity });
            }

            return json;
        }

        private unpack(json: SatChainJSON): SatChain {
            var sc: SatChain = new SatChain(this.bodyDictServ.get(json.body), json.count, json.altitude, json.elcNeeded,
                new Array<AntennaEquipment>(), json.antennaIndex, json.parkingAlt);

            for (var index in json.antennas) {
                var aej: AntennaEquipmentJSON = json.antennas[index];
                sc.antennas.push({ antenna: this.antennaDictServ.get(aej.antenna), quantity: aej.quantity });
            }

            return sc;
        }

        private update(scJson: any, oldVersion: number): SatChainJSON {
            if (oldVersion === undefined) { // update to ver 1.5
                scJson.antennas = [{ antenna: scJson.antenna, quantity: 1 }];
                scJson.antennaIndex = 0;
                oldVersion = 1;
            }

            if (oldVersion === 1) {
                scJson.body = scJson.body.name;
                for (var index in scJson.antennas) {
                    var ae = scJson.antennas[index];
                    scJson.antennas[index] = ({ antenna: ae.antenna.name, quantity: ae.quantity });
                }
                oldVersion = 2;
            }

            return scJson;
        }
    }
}
