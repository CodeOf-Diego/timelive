import ControllerGlobal from "../Controllers/ControllerGlobal";
import { p } from "../../Project";
import EU from "../Utils/ElementUtils"

export default class ControllerProjectSettings extends ControllerGlobal{
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
        /* not sure what this did */
        this.infoLength.onChange((e) => {
            if (p.projectSettings.controller.active) {
                p.projectSettings.length.set(parseInt($(p.projectSettings.el).val()))
                if (p.globalTime.get() > p.projectSettings.length.get()) {
                    p.globalTime.set(p.projectSettings.length.get());

                }
                p.timeline.draw();
            }
        });
    }
}