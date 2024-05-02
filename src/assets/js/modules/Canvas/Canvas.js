import { p } from "../../Project";
import CanvasElements from "./CanvasElements";

/* Handles the drawing of the data inside the canvas */
export default class Canvas {
    constructor() {
        this.separation = 40;
    }
    
    /** When opening an existing or a new project binds all the CanvasElements to each respective element */
    loadProject() {
        this.cElements = new CanvasElements()
    }


    draw() {
        //redraw graph with the new element
        this.cElements.update();
    }


    addElement(elementInput) {
        CanvasElements.add(elementInput)
        this.draw();
    }
}