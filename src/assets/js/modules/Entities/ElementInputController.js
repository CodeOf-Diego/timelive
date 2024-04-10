import ControllerGlobal from "../Controllers/ControllerGlobal";
import { p } from "../../Project";
import ImageLoader from "../ImageLoader/ImageLoader";

export default class ElementInputController extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    controllers() {
        $(document).ready(function(){
            $('#saveElement').click(ElementInputController.onSave);
        });
    }

    /** Elaborates the data present in the input form */
    static onSave() {
        if (p.elementInput.controller.active) {
            p.elementInput.readVariables();
            p.elementInput.save();
            ImageLoader.addURL(p.elementInput.getImg(p.globalTime))
            p.elementInput.unload();
            p.canvas.draw()
        }
    }
}