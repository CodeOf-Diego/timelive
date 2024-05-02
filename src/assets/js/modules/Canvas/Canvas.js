import { p } from "../../Project";
import CanvasElements from "./CanvasElements";

/* Handles the drawing of the data inside the canvas */
export default class Canvas {
    constructor() {
        this.separation = 40;
        this.loadProject()  // for now it is assumed this works on a single constant project
    }
    
    /** When opening an existing or a new project binds all the CanvasElements to each respective element */
    loadProject() {
        this.cElements = new CanvasElements()
    }




/**
 * All'apertura di un progetto prima vengono caricate le risorse poi lanciata la draw
 * ad ogni apertura tutti i canvaselements vanno sovrascritti con gli elements presenti nella nuova apertura
 * 
 * ad ogni aggiunta o rimozione va aggiornata la lista degli elementi presenti
 * 
 * ad ogni draw vanno ciclati tutti gli elementi dom che sono presenti e ridisegnati
 * 
 * 
 * alla aggiunta l'elemento aggiunto  
 * 
 * 
 * 
 * 
 * 
 */









    draw() {
        //redraw graph with the new element
        this.cElements.update();
    }


    addElement(elementInput) {
        CanvasElements.add(elementInput)
        this.draw();
    }
}