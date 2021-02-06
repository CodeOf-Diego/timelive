class ProjectInfo {

    constructor() {
        this.name;
        this.length = new TimeX();
        this.timeType;
        this.tags;
        this.description = new TypeX();
        this.bgImage = new TypeX();
        this.controller = new ControllerProjectInfo();
        this.el = '#infoLength'
    }

    new() {
        let T = p.globalTime;
        this.name = "New Project";
        this.length.set(10);
        this.timeType = 'episode';
        this.tags = [];
        this.description.set("", T);
        this.bgImage.set("", T);
    }

    load() {
        $('#boxInfo').show();
        this.writeVariables()
        p.focus.set('info');
    }

    unload() {
        $('#boxInfo').hide();
        p.focus.set('main');
        //refresh

    }

    writeVariables() {
        let T = p.globalTime;
        $('#infoName').val(this.name);
        $('#infoLength').val(this.length.get());
        $('#infoDescription').val(this.description.get(T));
        $('#infoImg').val(this.bgImage.get(T));
    }

}