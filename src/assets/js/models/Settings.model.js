import TimeX from "../TimeX";
import TypeX from "../TypeX";
import { p } from "../Project";
import Focus from "../modules/Focus/Focus";

export default class SettingsModel {
    
    constructor() {
        this.name;
        this.length = new TimeX();
        this.timeType;
        this.tags;
        this.description = new TypeX();
        this.bgImage = new TypeX();
    }

    new() {
        let T = p.time;
        this.name = "New Project";
        this.length.set(10);
        this.timeType = 'episode';
        this.tags = [];
        this.description.set("", T);
        this.bgImage.set("", T);
    }

    load() {
        
    }

}

