import SettingsModel from "../models/Settings.model";
import ControllerGlobal from "../modules/Controllers/ControllerGlobal";
import Focus from "../modules/Focus/Focus";
import SettingsView from "../views/Settings.view";
import { p } from "../Project";


/**
 * Global definition of a project, contains all required data to differenciate it from others and open/close/quicksave/upload a project
 * This class handles the logic while the respective controller binds it to the web elements
 * it has the following functionalities:
 * 
 * new() - set up a new project
 * load() - opens an existing project and loads it in the page
 * unload() - closes a project
 * WIP
 */

export default class Settings extends ControllerGlobal {

    constructor() {
        super()
        this.Model = new SettingsModel()
        this.View = new SettingsView()
        this.modelAttributes();
    }

    /** Binds the initial events and selectors when the page is fully loaded */
    static bind() {
        p.settings.View.linkSelectors()
        p.settings.View.infoLength.onChange(Settings.changedLenght);
    }
    
    /** when the project lenght web element is changed, updates the project data and pushes back if the world time is above the new max */
    static changedLenght() {
        if (p.settings.controller.active) {
            p.settings.controller.infoLength.val()
            p.settings.length.set(parseInt(this.infoLength.val()))
            if (p.time.get() > p.settings.length.get()) {
                p.time.set(p.settings.length.get());
            }
            Timeline.draw();
        }
    }

    /** Set up new project settings */
    new() {
        this.Model.new();
    }

    /** Loads project settings of an existing project */
    load() {
        this.Model.load();
    }

    /** Opens the settings tab */
    open() {
        /** Handles the drawing of the project settings */
        let T = p.time;
        this.View.infoName.val(this.name);
        this.View.infoLength.val(this.length.get());
        this.View.infoDescription.val(this.description.get(T));
        this.View.infoImg.val(this.bgImage.get(T));
        
        this.View.boxInfo.show()
        Focus.set('settings');
    }

    /** Closes the settings tab */
    static close() {
        p.settings.View.boxInfo.hide()
        Focus.set('main');
    }
}