import ControllerToolbox from "./ControllerToolbox";
/*
 Handles the insertion of new elements
 the class could
 check the presence of the toolbox
 hide and show the toolbox from view
 on + element opens the popup for the new element
 on + bond opens the popup for the new bond
 instantiate the controllers

 */

export default class Toolbox {

    constructor() {
        this.controller = new ControllerToolbox();
    }
}