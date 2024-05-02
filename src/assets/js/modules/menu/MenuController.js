import ControllerGlobal from "../Controllers/ControllerGlobal";
import EU from "../Utils/ElementUtils"
import { p } from "../../Project";

/** Handles the interactions with the main menu */
export default class MenuController extends ControllerGlobal {

    constructor() {
        super();
        this.ready(()=>{
            this.menu = new EU("menu");
            this.menuNew = new EU("menuNew");
             this.controllers();
        })
    }

    controllers() {
        this.menuNew.onClick(MenuController.newProject);
    }

    /** Initiate a new project */
    static newProject() {
        p.new();
    }

}