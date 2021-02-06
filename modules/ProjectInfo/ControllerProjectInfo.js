class ControllerProjectInfo extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    controllers() {
        $(document).ready(function(){
            $('#infoLength').change((e) => {
                if (p.projectInfo.controller.active) {
                    p.projectInfo.length.set(parseInt($(p.projectInfo.el).val()))
                    if (p.globalTime.get() > p.projectInfo.length.get()) {
                        p.globalTime.set(p.projectInfo.length.get());

                    }
                    p.timeline.draw();
                }
            });
        });
    }
}