import ControllerGlobal from "../Controllers/ControllerGlobal";
import { p } from "../../Project";

export default class ElementInputController extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    controllers() {
        $(document).ready(function(){
            $('#saveElement').click(() => {

                if (p.elementInput.controller.active) {
                    p.elementInput.readVariables();
                    p.elementInput.save();
                    p.elementInput.unload();
                }
            });
        });
    }

}