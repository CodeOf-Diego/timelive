import ControllerGlobal from "../Controllers/ControllerGlobal";
import { p } from "../../Project";
import UE from "../Utils/ElementUtils";

export default class ControllerToolbox extends ControllerGlobal{
    constructor() {
        super();
        this.ready(() =>{
            this.newElement = new UE("newElement")
            this.controllers();
        })
    }

    controllers() {
        this.newElement.onClick(p.toolbox.controller.addNewElement)
    }
    
    addNewElement() {
        if (p.toolbox.controller.active) {
            p.elementInput.new();
            p.elementInput.load();
        }
    }


}