/// <reference path="body.ts" />

module BodyData {
    var bodies: { [index: string]: Body } = {
        "Kerbin": { name: "Kerbin", color: "darkgreen", radius: 600, gravitationalParameter: 3531.6 },
        "Mun": { name: "Mun", color: "gray", radius: 200, gravitationalParameter: 65.138398 },
        "Minmus": { name: "Minmus", color: "lightblue", radius: 60, gravitationalParameter: 1.7658 }
    };

    export function getBody(name: string): Body {
        return bodies[name];
    }
}