import ControllerGlobal from "../Controllers/ControllerGlobal";
import { p } from "../../Project";
import EU from "../Utils/ElementUtils"
import Timeline from "../Timeline/Timeline";

export default class ControllerSettings extends ControllerGlobal{
    constructor() {
        super();
        this.ready(()=>{
            this.boxInfo = new EU("boxInfo");
            this.infoLength = new EU("infoLength");
            this.infoName = new EU("infoName");
            this.infoDescription = new EU("infoDescription");
            this.infoImg = new EU("infoImg");
            this.controllers();
        })
    }
    
    controllers() {
        /* when the project lenght web element is changed, updates the project data and pushes back if the world time is above the new max */
        this.infoLength.onChange(() => {
            if (p.settings.controller.active) {
                p.settings.controller.infoLength.val()
                p.settings.length.set(parseInt(this.infoLength.val()))
                if (p.time.get() > p.settings.length.get()) {
                    p.time.set(p.settings.length.get());
                }
                Timeline.draw();
            }
        });
    }
}