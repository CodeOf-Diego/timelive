import TimeX from "../../TimeX";
import TypeX from "../../TypeX";
import ControllerProjectSettings from "./ControllerProjectSettings";
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
        this.controller = new ControllerProjectSettings();
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




/*

when opening for the first time a new untitled project is created with default autosave after every 30 sec




info diventa settings



project saving options

project settings contiente
let T = p.globalTime;
this.name = "New Project";
this.length.set(10);
this.timeType = 'episode';
this.tags = [];
this.description.set("", T);
this.bgImage.set("", T);

- doAutosave (default yes, updates the locally stored data of the project after every edit)
- autosaveDuration (default 30 sec, used only if doAutosave is on)
- openByDefault (if on the project will autoamtically be opened. If multiple project have this option the lates one by modification date will be opened)



menu settings

project settings
...  

then
- save locally (saves in the local storage)
- export (to allow outside storage)
- import new project (by link or by raw content)


list of other projects (excluding the current one)
- load project, loads into memory all the project informations for the selected project
- delete (deletes all the data of the selected project. if all local projects are deleted a new one is created by default)
*/