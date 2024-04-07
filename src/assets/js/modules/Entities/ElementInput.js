import Element from "./Element";
import ElementInputController from "./ElementInputController";

/*
 The class handles the creation of an element and it's interaction with the input box
 */
 export default class ElementInput extends Element{

    constructor() {
        super();
        this.controller = new ElementInputController();
    }

    new() {
        let T = p.globalTime;
        this.setName('',T);
        this.setDescription('',T);
        this.setStart(0,T);
        this.setEnd(0,T);
        this.setImg('',T);
        this.ID = 0;
    }

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
        $('#boxInputElement').show();
        this.writeVariables()
        p.focus.set('element');
    }

    unload() {
        $('#boxInputElement').hide();
        p.focus.set('main');
        if (this.newElement)
            p.canvas.addElement(this);
        //refresh
    }

    writeVariables() {
        let T = p.globalTime;
        $('#elementName').val(this.getName(T)).focus();
        $('#elementDescription').val(this.getDescription(T));
        $('#elementStart').val(this.getStart(T));
        $('#elementEnd').val(this.getEnd(T));
        $('#elementImg').val(this.getImg(T));
    }

    readVariables() {
        let T = p.globalTime;
        this.setName($('#elementName').val(),T);
        this.setDescription($('#elementDescription').val(),T);
        this.setStart($('#elementStart').val(),T);
        this.setEnd($('#elementEnd').val(),T);
        this.setImg($('#elementImg').val(),T);
    }

    /* New elements are appended at the end of the public array,
       In existing elements are updated only the attributes with changed values */
    save() {
        let T = p.globalTime;
        this.newElement = this.ID === 0;
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