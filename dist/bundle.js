/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/assets/js/TimeX.js
/*
Definition of the variable that describes time for this project
for now the object contains one int value that directly correspond to the time description of the objects
*/
class TimeX {

	constructor() {
	   this.data = 0;
	}

	set(data) {
	   this.data = parseInt(data);
	}

	get() {
		return this.getTimeValue();
	}

	getTimeValue() {
		return this.data;
	}
}

;// CONCATENATED MODULE: ./src/assets/js/modules/Utils/ElementUtils.js
class ElementUtils {
    
    constructor(id = "") {
        if (id !== "") {
            this.el = ElementUtils.byID(id)
        }
    }

    show() {
    this.el.style.display = "block"
    }

    hide() { 
        this.el.style.display = "none"
    }

    ready(callback) {
        window.addEventListener('load', callback);
    }

    /** Adds an onClick event to the main element of the class, if specified */
    onClick(callback) {
        this.el.addEventListener('click',callback);
    }
    
    onChange(callback) {
        this.el.addEventListener('change',callback);
    }
    focus() {
        this.el.focus()
    }

    val(value = null) {
        if (value === null) 
            return this.el.value
        this.el.value = value
    }

    static byID(el) {
        return document.getElementById(el);
    }
}
;// CONCATENATED MODULE: ./src/assets/js/modules/Controllers/ControllerGlobal.js


class ControllerGlobal extends ElementUtils {
  
  constructor() {
    super()
    this.active = 1;
  }
  
  enable() {
    this.active = 1;
  }
  disable() {
    this.active = 0;
  }
  
  modelAttributes() {
    for (let attribute in this.Model) {
      Object.defineProperty(this, attribute, {
        get: function()   {return this.Model[attribute]}
      });
    } 
  }
}

;// CONCATENATED MODULE: ./src/assets/js/modules/Menu/MenuController.js




/** Handles the interactions with the main menu */
class MenuController extends ControllerGlobal {

    constructor() {
        super();
        this.ready(()=>{
            this.menu = new ElementUtils("menu");
            this.menuNew = new ElementUtils("menuNew");
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
;// CONCATENATED MODULE: ./src/assets/js/modules/Menu/Menu.js



/** Handles the interactions with the main menu */
class Menu {

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
;// CONCATENATED MODULE: ./src/assets/js/modules/Toolbox/ControllerToolbox.js




class ControllerToolbox extends ControllerGlobal{
    constructor() {
        super();
        this.ready(() =>{
            this.newElement = new ElementUtils("newElement")
            this.controllers();
        })
    }

    controllers() {
        this.newElement.onClick(p.toolbox.controller.addNewElement)
    }
    
    addNewElement() {
        if (p.toolbox.controller.active) {
            p.elementInput.new();
            p.elementInput.load();
        }
    }


}
;// CONCATENATED MODULE: ./src/assets/js/modules/Toolbox/Toolbox.js

/*
 Handles the insertion of new elements
 the class could
 check the presence of the toolbox
 hide and show the toolbox from view
 on + element opens the popup for the new element
 on + bond opens the popup for the new bond
 instantiate the controllers

 */

class Toolbox {

    constructor() {
        this.controller = new ControllerToolbox();
    }
}
;// CONCATENATED MODULE: ./src/assets/js/modules/Timeline/ControllerTimeline.js





/*
Imposta tutti i dati di configurazione in modo da avere tutto cio che serve
 alla stampa e all'utilizzo dei parametri altrove
*/
class ControllerTimeline extends ControllerGlobal{
  constructor() {
    super();
    this.ready(()=>{
      this.timeline = new ElementUtils("timeline")
      this.timelineContainer = new ElementUtils("timelineContainer")
      this.controllers()
    })
  }

  controllers() {
    this.timeline.onChange(() => {
      if (p.timeline.controller.active) {
        p.time.set(parseInt(p.timeline.controller.timeline.val()));
        Timeline_Timeline.draw();
        p.canvas.draw();
      }
    })
  }
}

;// CONCATENATED MODULE: ./src/assets/js/modules/Timeline/Timeline.js



class Timeline_Timeline {
    constructor() {
        this.controller = new ControllerTimeline();
    }

    /** Builds dinamically the timeline component depending on the project settings */
    static draw() {
        // update graphics of the timeline
        p.timeline.controller.timeline.el.innerHTML = ""
        let T = p.time;
        for (let i = 0; i <= p.settings.length.get() ; i++) {
            p.timeline.controller.timeline.el.appendChild(new Option(i.toString(), i.toString(),false, T.get() === i))
        }
    }

    static show() {
        p.timeline.controller.timelineContainer.show()
    }

    static hide() {
        p.timeline.controller.timelineContainer.hide()
    }

}
;// CONCATENATED MODULE: ./src/assets/js/TypeX.js
/*
 Defines a 1 dimensional abstract variable whose value can change overtime
 The variable can be divided in 1 or more regions of time, each of wich has it's own value
 that can be extracted from any point in the included region

 Note that each region starts from an included timeX to the next timeX excluded, or to infinity for the last region
*/
class TypeX {

	/* The default value of the data is a region going from 0 to infinity with null value */
	constructor() {
	   this.data = [null];
	   this.regions = 1;
	}

	/* Check if region start in given time */
	isRegionStart(timeX) {
		return Object.keys(this.data).indexOf(String(timeX.get())) >= 0;
	}

	/* Find the beginning of a region from a given time */
	findRegionStartTimeX(timeX) {
		let keyframes = Object.keys(this.data);
		return this.findRegionStartRecursive(keyframes, 0, keyframes.length -1, timeX)
	}

	/* Binary search the start time of a region given a time. The start time is included in the region */
	findRegionStartRecursive(keyframes, min, max, timeX) {
		let avg = parseInt((max + min) / 2);
		if (max - min > 1) {
			if (keyframes[avg] < timeX.get())
					return this.findRegionStartRecursive(keyframes, avg, max, timeX);
			else if (keyframes[avg] > timeX.get())
					return this.findRegionStartRecursive(keyframes, min, avg, timeX);
			else
					return keyframes[avg];
		}
		else {
			if (keyframes[max] <= timeX.get())
				return keyframes[max];
			return keyframes[min];
		}
	}

	/* Adds a new value at a specific time, changes the number of total regions */
	set(data, timeX) {
		if (!(this.isRegionStart(timeX)))
				this.regions += 1;
		this.data[timeX.get()] = data;
	}

	/* Removes a region. If removed the 1st of multiple region the next one will expand to time 0 */
	unset(timeX) {
		if (this.regions == 1) {
			this.data = [null];
		}
		else {
			let time = this.findRegionStartTimeX(timeX);
			this.regions -= 1;
			if (time > 0) {
				delete this.data[time];
			}
			else {
				 let keyframes = Object.keys(this.data);
				 this.data[keyframes[0]] = this.data[keyframes[1]];
	 			delete this.data[keyframes[1]];
			}
		}
	}

	/* Return the data value at a specific time */
	get(timeX) {
		return this.data[this.findRegionStartTimeX(timeX)];
	}

	/* Move an existing region start in the timeline. The region starting at 0 cannot be moved */
	move(timeFrom, timeTo) {
		if (this.isRegionStart(timeFrom) && timeFrom.get() != 0 && timeFrom.get() != timeTo.get()) {

			if (this.isRegionStart(timeTo))
				this.regions--;
			this.data[timeTo.get()] = this.data[timeFrom.get()];
			delete this.data[timeFrom.get()];
		}
	}

	/* Duplicates the data and returns a copy */
	duplicate() {
		return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
	}
}

;// CONCATENATED MODULE: ./src/assets/js/modules/Focus/Focus.js


class Focus {
    constructor() {
        this.focus = "menu";
    }

    static set(newFocus) {
        if (Focus.isValid(newFocus) && this.focus !== newFocus) {
            p.focus = newFocus;
            Focus.updateControllers();
        }
    }

    static get() {
        return p.focus;
    }

    static isValid(newFocus) {
        return [
            'main',
            'element',
            'settings',
            'menu'
        ].includes(newFocus)

    }

    static updateControllers() {
        switch (Focus.get()) {
            case 'main':
                p.toolbox.controller.enable();
                p.settings.disable();
                break;
            case 'element':
                p.toolbox.controller.enable();
                p.settings.disable();
                break;
            case 'settings':
                p.toolbox.controller.disable();
                p.settings.enable();
                break;
            case 'menu':
                p.toolbox.controller.disable();
                p.settings.disable();
                p.menu.controller.enable();
                break;

        }
    }

}
;// CONCATENATED MODULE: ./src/assets/js/models/Settings.model.js





class SettingsModel {
    
    constructor() {
        this.name;
        this.length = new TimeX();
        this.timeType;
        this.tags;
        this.description = new TypeX();
        this.bgImage = new TypeX();
    }

    new() {
        let T = p.time;
        this.name = "New Project";
        this.length.set(10);
        this.timeType = 'episode';
        this.tags = [];
        this.description.set("", T);
        this.bgImage.set("", T);
    }

    load() {
        
    }

}


;// CONCATENATED MODULE: ./src/assets/js/utils/Utils.js
class Utils {
    el;
    
    constructor(id = "") {
        if (id !== "") {
            this._el = Utils.byID(id)
        }
    }

    show() {
        this._el.style.display = "block"
    }

    hide() { 
        this._el.style.display = "none"
    }

    ready(callback) {
        this._el.addEventListener('load', callback);
    }

    /** Adds an onClick event to the main element of the class, if specified */
    onClick(callback) {
        this._el.addEventListener('click',callback);
    }
    
    onChange(callback) {
        this._el.addEventListener('change',callback);
    }

    focus() {
        this._el.focus()
    }

    val(value = null) {
        if (value === null) 
            return this._el.value
            this._el.value = value
    }


    static byID(elementId) {
        return document.getElementById(elementId);
    }
}
;// CONCATENATED MODULE: ./src/assets/js/views/BaseView.js


class BaseView {

    /**
     * if an object structure of the elements is defined in the view
     * binds them to allow interaction with them
     * @param {id:[string]} this._selectors 
     */
    linkSelectors() {
        if (this._selectors !== undefined) {
            for (let i in this._selectors.id) 
                this[this._selectors.id[i]] = new Utils(this._selectors.id[i]) 
        }
    }

}
;// CONCATENATED MODULE: ./src/assets/js/views/Settings.view.js



/**
 * @param {Utils} boxInfo 
 * @param {Utils} infoLength 
 * @param {Utils} infoName 
 * @param {Utils} infoDescription 
 * @param {Utils} infoImg 
 */
class SettingsView extends BaseView {

    /** Set up the class, listing the elements that will have interaction once binded */
    constructor() {
        super()
        this._selectors = {id:[
            "boxInfo",
            "infoLength",
            "infoName",
            "infoDescription",
            "infoImg",
        ]}
    }
}

;// CONCATENATED MODULE: ./src/assets/js/controllers/Settings.controller.js







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

class Settings extends ControllerGlobal {

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
;// CONCATENATED MODULE: ./src/assets/js/modules/ImageLoader/ImageLoader.js


class ImageLoader {

    // random images
    // https://toppng.com/uploads/preview/question-marks-png-11552247920xwjr8vuvf8.png
    // https://photographylife.com/wp-content/uploads/2020/03/Ultra-Wide-Angle-Panoramas-1.jpg
    // https://static.kodami.it/wp-content/uploads/sites/31/2021/03/iStock-140469307.jpg
    constructor () {}
    
    new() {
        this.urls = []
    }

    /** when opening an existing project looks for all the url in the various places and loads them in the url array, while loading each single image */
    loadBatch() {

    }

    /** Adds a new url to the list of images to be loaded and loads it */
    static addURL(URL) {

        if (URL != "" && !p.imageLoader.urls.includes(URL)) {
            p.imageLoader.urls.push(URL)
            ImageLoader.#getImage(URL)
        }
        
    }

    /** Requests a single image */
    static #getImage(URL) {
        let img = new Image();
        img.src = URL;
    }
}

;// CONCATENATED MODULE: ./src/assets/js/modules/Entities/ElementInputController.js





class ElementInputController extends ControllerGlobal{
    constructor() {
        super();
        this.ready(()=>{
            this.boxInputElement = new ElementUtils("boxInputElement")
            this.elementName = new ElementUtils("elementName")
            this.elementDescription = new ElementUtils("elementDescription") 
            this.elementStart = new ElementUtils("elementStart") 
            this.elementEnd = new ElementUtils("elementEnd") 
            this.elementImg = new ElementUtils("elementImg") 
            this.saveElement = new ElementUtils("saveElement");
            this.controllers();
        })
    }

    controllers() {
        this.saveElement.onClick(ElementInputController.onSave)
    }

    /** Elaborates the data present in the input form */
    static onSave() {
        if (p.elementInput.controller.active) {
            p.elementInput.readVariables();
            p.elementInput.save();
            ImageLoader.addURL(p.elementInput.getImg(p.time))
            p.elementInput.unload();
            p.canvas.draw()
        }
    }
}
;// CONCATENATED MODULE: ./src/assets/js/modules/Keyboard/Keyboard.js






/**
 * Handles keyboard interactions
 * The class has a listener that records inputs and execute any possible action related to it
 * The avalilable inputs depend on the current focus in the project, main/new element/settings
 * 
 * If a specific focus has multiple input that start with the same part, there will be a small delay before executing the shorter input
 * otherwise, if there is only one possible action for that imput it'll be executed immediately
 * 
 */

class Keyboard {
    constructor() {
        this.keyList = [];
        this.countdown = 200;
        this.last_timeout = 0;
        this.debug = false;
        addEventListener('keydown', this.registerKey);

    }

    registerKey(e) {
        if (p.keyboard.last_timeout !== 0) {
            clearTimeout(p.keyboard.last_timeout);
        }
        switch (Focus.get()) {
            case "main": p.keyboard.mainControls(e); break;
            case "settings": p.keyboard.settingsControls(e); break;
            case "element": p.keyboard.elementControls(e); break;
        }
        p.keyboard.last_timeout = setTimeout(p.keyboard.getWord, p.keyboard.countdown);
        p.keyboard.keyList.push(e.key);
    }

    getWord() {
        if (p.keyboard.keyList.length > 0) {
            let keyword = p.keyboard.keyList.join("");
            p.keyboard.keyList = [];
            if (p.keyboard.debug)
                p.keyboard.search(keyword);
        }
    }

    search(keyword) {
        switch (keyword) {

        }
        console.log(keyword);
    }

    mainControls(e) {
        switch (e.key) {
            case 'n':
                p.elementInput.new();
                p.elementInput.load();
                e.preventDefault();
                break;
            case 'Escape':
                p.settings.open();
                break;
            case 'ArrowLeft':
                if (p.time.get() > 0) {
                    p.time.set(p.time.get() - 1);
                    Timeline_Timeline.draw();
                    p.canvas.draw();
                }
                break;
            case 'ArrowRight':
                if (p.time.get() < p.settings.length.get()) {
                    p.time.set(p.time.get() + 1);
                    Timeline_Timeline.draw();
                    p.canvas.draw();
                }
                break;
        }
    }

    settingsControls(e) {
        switch (e.key) {
            case 'Escape':
                Settings.close();
                break;
        }
    }

    elementControls(e) {
        switch (e.key) {
            case 'Escape':
                p.elementInput.unload();
                break;
                // TODO FIX enter doesn't save the element
            case 'Enter':
                e.preventDefault()
                ElementInputController.onSave();
                break;
        }
    }
}
;// CONCATENATED MODULE: ./src/assets/js/modules/Entities/Element.js


class Element {

  constructor() {
    this.ID;
    this.name = new TypeX;
    this.description = new TypeX;
    this.img = new TypeX;
    this.start = new TypeX;
    this.end = new TypeX;
  }

  /* Set the name attribute */
  setName(name, timeX) {
    this.name.set(name, timeX);
  }
  /* Get the name attribute */
  getName(timeX) {
    return this.name.get(timeX);
  }

  /* Set the description attribute */
  setDescription(description, timeX) {
    this.description.set(description, timeX);
  }
  /* Get the description attribute */
  getDescription(timeX) {
    return this.description.get(timeX);
  }

  /* Set the img attribute */
  setImg(img, timeX) {
    this.img.set(img, timeX);
  }
  /* Get the img attribute */
  getImg(timeX) {
    return this.img.get(timeX);
  }

  /* Set the start attribute */
  setStart(start, timeX) {
    this.start.set(start, timeX);
  }
  /* Get the start attribute */
  getStart(timeX) {
    return this.start.get(timeX);
  }

  /* Set the end attribute */
  setEnd(end, timeX) {
    this.end.set(end, timeX);
  }
  /* Get the end attribute */
  getEnd(timeX) {
    return this.end.get(timeX);
  }
}

;// CONCATENATED MODULE: ./src/assets/js/modules/Entities/ElementInput.js





/*
 The class handles the creation of an element and it's interaction with the input box
 */
 class ElementInput extends Element{

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
;// CONCATENATED MODULE: ./src/assets/js/modules/Canvas/CanvasElements.js



/**
 * Class that connects the element to their corresponding 'DOM elements' and handles all the graphical updates
 */
class CanvasElements {
    
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

;// CONCATENATED MODULE: ./src/assets/js/modules/Canvas/Canvas.js



/* Handles the drawing of the data inside the canvas */
class Canvas {
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
;// CONCATENATED MODULE: ./src/assets/js/Project.js












class Project {
    constructor() {
        this.time = new TimeX();
        this.projectView;
        
        this.menu = new Menu();
        this.toolbox = new Toolbox();
        this.timeline = new Timeline_Timeline();
        this.settings = new Settings();
        this.keyboard = new Keyboard();
        this.focus = new Focus();
        this.imageLoader = new ImageLoader();
        this.canvas = new Canvas();
        
        /** @type {Element[]} */
        this.elements;
        this.elementInput = new ElementInput();
        
        this.bonds;
        this.bondInput;
    }
    
    new() {
        this.time.set(1);
        // Fill all global project variables with newly created data
       
        this.settings.new();
        this.projectView = this.createNewProjectView();

        this.canvas.loadProject()  // for now it is assumed this works on a single constant project
        this.imageLoader.new()
        this.elements = [null];
        this.bonds = [];
        //this.bondInput = new BondInput();

        Focus.set('main')
        Menu.hide()
        Timeline_Timeline.draw()
        Timeline_Timeline.show()
    }

    open(projectData) {

    }

    createNewProjectSettings() {
        return {
            timeFormat : 'episode'
        }
    }

    createNewProjectView() {
        return {
            showDeath : 1,
            showKilledBy : 1,
            showNames : 1
        }
    }

    /* Sets up all the controllers and the elements of the project */
    setUp() {
        Settings.bind()
    }

    /** Starts the engine */
    start() {
        // first thing todo is to check if the app is in view-only mode
        // for now it will never be

        if(false) {}
        else {
            Menu.show()
            Focus.set('menu')
        }
        // next local storage is checked to find existing projects to open
        // lastly a "New Project" button is always present
    }

}

const p = new Project();


;// CONCATENATED MODULE: ./src/assets/js/index.js


window.addEventListener('load', function() {
    p.setUp();
    p.start();
});
/******/ })()
;