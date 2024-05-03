import ControllerGlobal from "../Controllers/ControllerGlobal";
import EU from "../Utils/ElementUtils";
import { p } from "../../Project";
import ImageLoader from "../ImageLoader/ImageLoader";

export default class ElementInputController extends ControllerGlobal{
    constructor() {
        super();
        this.ready(()=>{
            this.boxInputElement = new EU("boxInputElement")
            this.elementName = new EU("elementName")
            this.elementDescription = new EU("elementDescription") 
            this.elementStart = new EU("elementStart") 
            this.elementEnd = new EU("elementEnd") 
            this.elementImg = new EU("elementImg") 
            this.saveElement = new EU("saveElement");
            this.controllers();
        })
    }

    controllers() {
        this.saveElement.onClick(ElementInputController.onSave)
    }

    /** Elaborates the data present in the input form */
    static onSave() {
        if (p.elementInput.controller.active) {
            p.elementInput.readVariables();
            p.elementInput.save();
            ImageLoader.addURL(p.elementInput.getImg(p.time))
            p.elementInput.unload();
            p.canvas.draw()
        }
    }
}