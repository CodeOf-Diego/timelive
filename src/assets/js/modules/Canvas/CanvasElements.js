import { p } from "../../Project";
import ElementInput from "../Entities/ElementInput";

/**
 * Class that connects the element to their corresponding 'DOM elements' and handles all the graphical updates
 */
export default class CanvasElements {
    
    /** Loads all the drawn elements into memory */
    constructor() {
        /* Search and loads in memory the DOM elements to be used later */
        this.pElements = p.elements;
        this.elements = {};
        document.querySelectorAll('.element').forEach(element => {
            this.elements[element.getAttribute('data-id')] = element;
        });
    }

    /** Updates the graphical properties of the elements for the current Time */
    update() {
        
        // loops all elements
            // for each element check if in the new requested time there are difference
                // in which case redraws the differences

            for (let ID in this.elements) {
//            this.elements.forEach((element, ID) => {
                this.#updateElement(parseInt(ID))

        }
    }

    /* Main element drawing function */
    #updateElement(ID) {
        let T = p.time

        let element = this.elements[ID]

        // if the actual output of an element is different from the data corresponding the new time the element's attribute gets updated
        
        // image
        
        // title
        if (element.querySelector('.name').innerHTML !== p.elements[ID].getName(T)) {
            element.querySelector('.name').innerHTML = p.elements[ID].getName(T)
        }
        
        //description
        if (element.querySelector('.description').innerHTML !== p.elements[ID].getDescription(T)) {
            element.querySelector('.description').innerHTML = p.elements[ID].getDescription(T)
        }

        // image
        if (element.style.backgroundImage !== "url('"+p.elements[ID].getImg(T)+"')")
            element.style.backgroundImage = "url('"+p.elements[ID].getImg(T)+"')";
        

        // shows the element only in the range of existence (possible performance improvements)
        // not sure if start and end should be 1 dimensional, i reasoned on this 3 years ago
        let start = p.elements[ID].getStart(T)
        let end = p.elements[ID].getEnd(T)
        element.style.scale = 
            (start === null || T.get() < start) || 
            (end !== null && end != 0 && T.get() > end) 
        ? "0" : "1"

    }

    /** Find positions of all currently placed elements and add offset for new position */
    static newPosition() {
        let pos = [];
        let found = false;
        let container = document.querySelector('.container').getBoundingClientRect().left;
        let max = container;
        
        document.querySelectorAll('.element').forEach(function(element) {
            let offsetLeft = element.getBoundingClientRect().left;
            max = Math.max(max, offsetLeft);
            found = true;
        });        


    //        console.log(pos, container, max, found)
        return max - container + (found ? p.canvas.separation : 0);
    }


    /** Adds an element to the list of drawn elements 
     * this could probably be optimized by passing to react/vue/similar
     * @param {ElementInput} elementInput
    */
    static add(elementInput) {
        let style = 'style="left:'+ CanvasElements.newPosition().toString() +'px"';
        let html = `<div class="element"  ${style}
        data-id="${elementInput.ID}" 
        >
            <div class="name"></div>                
            <div class="description"></div>
        </div>`;
        document.querySelector('.container').innerHTML+= html 
        
        /** Finds the element for the just added html */
        let element = document.querySelector('.element[data-id="'+elementInput.ID+'"]');
        /** Makes the new component interactable */
        element.addEventListener("click", CanvasElements.onClick); 
        /** Adds the element for the new element in the known list */
        p.canvas.cElements.elements[element.getAttribute('data-id')] = element;

    }

    static onClick(e) {
        p.elementInput.open(parseInt(e.currentTarget.dataset['id']));
        p.elementInput.load();
    }
}
