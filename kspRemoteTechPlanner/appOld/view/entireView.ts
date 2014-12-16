/// <reference path="../references.ts" />

class EntireView extends View {
    'use strict';

    satellites: Satellites;

    

    constructor(stage: createjs.Stage, innerSize: number, outerSize: number, satellites: Satellites) {
        super(stage, innerSize, outerSize);
        this.satellites = satellites;

        
    }

    

    
}