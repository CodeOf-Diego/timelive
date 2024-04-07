import TimeX from "../../TimeX";
import TypeX from "../../TypeX";
import ControllerProjectInfo from "./ControllerProjectInfo";
import { p } from "../../Project";
/**
 * Global definition of a project, contains all required data to differenciate it from others and open/close/quicksave/upload a project
 * it has the following functionalities:
 * 
 * new() - set up a new project
 * load() - opens an existing project and loads it in the page
 * unload() - closes a project
 * WIP
 */

export default class ProjectInfo {

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