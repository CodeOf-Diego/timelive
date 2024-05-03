import Element from "./Element";
import ElementInputController from "./ElementInputController";
import { p } from "../../Project";
import Focus from "../Focus/Focus";

/*
 The class handles the creation of an element and it's interaction with the input box
 */
 export default class ElementInput extends Element{

    constructor() {
        super();
        this.controller = new ElementInputController();
        this.isNewElement = false;
    }

    new() {
        let T = p.time;
        this.setName('',T);
        this.setDescription('',T);
        this.setStart(p.time.get(),T);
        this.setEnd(0,T);
        this.setImg('',T);
        this.ID = 0;
    }

    /* Open an element input interface, if it's an existing element the corresponding data is passed*/
    open(idOpen) {
        if (p.elements[parseInt(idOpen)] !== undefined) {
            this.ID = idOpen;
            this.name = p.elements[idOpen].name.duplicate();
            this.description = p.elements[idOpen].description.duplicate();
            this.start = p.elements[idOpen].start.duplicate();
            this.end = p.elements[idOpen].end.duplicate();
            this.img = p.elements[idOpen].img.duplicate();
        }
        else {
            this.new();
        }
    }

    /* Load the element input box, showing the variables */
    load() {
        this.controller.boxInputElement.show()
        this.writeVariables()
        Focus.set('element');
    }
    
    unload() {
        this.controller.boxInputElement.hide()
        Focus.set('main');
        if (this.isNewElement)
            p.canvas.addElement(this);
            this.isNewElement = false
        //refresh
    }

    /** Writes the variables from the data into the web page */
    writeVariables() {
        let T = p.time;
        this.controller.elementName.val(this.getName(T));
        this.controller.elementDescription.val(this.getDescription(T));
        this.controller.elementStart.val(this.getStart(T));
        this.controller.elementEnd.val(this.getEnd(T));
        this.controller.elementImg.val(this.getImg(T));
        this.controller.elementName.focus()
    }
    
    /** Reads the variables from the web page and writes it as data */
    readVariables() {
        let T = p.time;
        this.setName(this.controller.elementName.val(),T);
        this.setDescription(this.controller.elementDescription.val(),T);
        this.setStart(this.controller.elementStart.val(),T);
        this.setEnd(this.controller.elementEnd.val(),T);
        this.setImg(this.controller.elementImg.val(),T);
    }

    /* New elements are appended at the end of the public array,
       In existing elements are updated only the attributes with changed values */
    save() {
        let T = p.time;
        this.isNewElement = this.ID === 0;
        if(this.ID === 0) {
            let newElement = new Element();
            newElement.setName(this.getName(T),T);
            newElement.setDescription(this.getDescription(T),T);
            newElement.setStart(this.getStart(T),T);
            newElement.setEnd(this.getEnd(T),T);
            newElement.setImg(this.getImg(T),T);
            this.ID = p.elements.push(newElement) - 1;
        }
        else {
            let currElement = p.elements[this.ID];
            if (currElement.getName(T) !== this.getName(T))
                currElement.setName(this.getName(T), T)
            if (currElement.getDescription(T) !== this.getDescription(T))
                currElement.setDescription(this.getDescription(T), T)
            if (currElement.getStart(T) !== this.getStart(T))
                currElement.setStart(this.getStart(T), T)
            if (currElement.getEnd(T) !== this.getEnd(T))
                currElement.setEnd(this.getEnd(T), T)
            if (currElement.getImg(T) !== this.getImg(T))
                currElement.setImg(this.getImg(T), T)
        }
    }
}