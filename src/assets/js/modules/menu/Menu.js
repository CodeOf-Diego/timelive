import MenuController from "../Menu/MenuController";
import { p } from "../../Project";

/** Handles the interactions with the main menu */
export default class Menu {

    constructor() {
        this.controller = new MenuController()
    }


    /** Load the existing projects from local storage */
    static #loadFromMemory() {
        return localStorage.getItem('projects');
    }

    /** Shows the menu of the app */
    static show() {
        // Reads and displays a list of the existing projects 
        let projects = Menu.#loadFromMemory();
        if (projects) {
            
        }


    }

    
    static hide(){ 
        p.menu.controller.menu.hide()
    }
}