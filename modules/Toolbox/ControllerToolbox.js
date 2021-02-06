class ControllerToolbox extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    controllers() {
        $(document).ready(function(){
            $('#newElement').click(() => {
                if (p.toolbox.controller.active) {
                    p.elementInput.new();
                    p.elementInput.load();
                }
            });
        });
    }

}