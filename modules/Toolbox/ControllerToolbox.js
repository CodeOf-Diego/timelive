class ControllerToolbox extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    newElement() {
        if (p.toolbox.controller.active) {
            p.elementInput.new();
            p.elementInput.load();
        }
    }


    controllers() {
        $(document).ready(function(){
            $('#newElement').on('click',p.toolbox.controller.newElement);
        });
    }

}