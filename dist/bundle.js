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
		return jQuery.extend(true, new TypeX, this)
	}
}

;// CONCATENATED MODULE: ./src/assets/js/modules/Controllers/ControllerGlobal.js
class ControllerGlobal {
  constructor() {
    this.active = 1;
  }

  enable() {
    this.active = 1;
  }
  disable() {
    this.active = 0;
  }
}

;// CONCATENATED MODULE: ./src/assets/js/modules/ProjectSettings/ControllerProjectSettings.js



class ControllerProjectSettings extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    controllers() {
        $(document).ready(function(){
            $('#infoLength').change((e) => {
                if (p.projectInfo.controller.active) {
                    p.projectInfo.length.set(parseInt($(p.projectInfo.el).val()))
                    if (p.globalTime.get() > p.projectInfo.length.get()) {
                        p.globalTime.set(p.projectInfo.length.get());

                    }
                    p.timeline.draw();
                }
            });
        });
    }

    show() {
        
    }
}
;// CONCATENATED MODULE: ./src/assets/js/modules/ProjectSettings/ProjectSettings.js




/**
 * Global definition of a project, contains all required data to differenciate it from others and open/close/quicksave/upload a project
 * it has the following functionalities:
 * 
 * new() - set up a new project
 * load() - opens an existing project and loads it in the page
 * unload() - closes a project
 * WIP
 */

class ProjectInfo {

    constructor() {
        this.name;
        this.length = new TimeX();
        this.timeType;
        this.tags;
        this.description = new TypeX();
        this.bgImage = new TypeX();
        this.controller = new ControllerProjectSettings();
        this.el = '#infoLength'
    }

    new() {
        let T = p.globalTime;
        this.name = "New Project";
        this.length.set(10);
        this.timeType = 'episode';
        this.tags = [];
        this.description.set("", T);
        this.bgImage.set("", T);
    }

    load() {
        $('#boxInfo').show();
        this.writeVariables()
        p.focus.set('info');
    }

    unload() {
        $('#boxInfo').hide();
        p.focus.set('main');
        //refresh

    }

    writeVariables() {
        let T = p.globalTime;
        $('#infoName').val(this.name);
        $('#infoLength').val(this.length.get());
        $('#infoDescription').val(this.description.get(T));
        $('#infoImg').val(this.bgImage.get(T));
    }

}




/*

when opening for the first time a new untitled project is created with default autosave after every 30 sec




info diventa settings



project saving options

project settings contiente
let T = p.globalTime;
this.name = "New Project";
this.length.set(10);
this.timeType = 'episode';
this.tags = [];
this.description.set("", T);
this.bgImage.set("", T);

- doAutosave (default yes, updates the locally stored data of the project after every edit)
- autosaveDuration (default 30 sec, used only if doAutosave is on)
- openByDefault (if on the project will autoamtically be opened. If multiple project have this option the lates one by modification date will be opened)



menu settings

project settings
...  

then
- save locally (saves in the local storage)
- export (to allow outside storage)
- import new project (by link or by raw content)


list of other projects (excluding the current one)
- load project, loads into memory all the project informations for the selected project
- delete (deletes all the data of the selected project. if all local projects are deleted a new one is created by default)
*/
;// CONCATENATED MODULE: ./src/assets/js/modules/Toolbox/ControllerToolbox.js



class ControllerToolbox extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    newElement() {
        if (p.toolbox.controller.active) {
            p.elementInput.new();
            p.elementInput.load();
        }
    }


    controllers() {
        $(document).ready(function(){
            $('#newElement').on('click',p.toolbox.controller.newElement);
        });
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
    this.controllers();
  }

  controllers() {
    $(document).ready(function(){

      $('#timeline').change(() => {
        if (p.timeline.controller.active) {
          p.globalTime.set(parseInt($(p.timeline.el).val()));
          p.timeline.draw();
        }
      });
    });
  }
}

;// CONCATENATED MODULE: ./src/assets/js/modules/Timeline/Timeline.js



class Timeline {
    constructor() {
        this.controller = new ControllerTimeline();
        this.el = '#timeline';
        this.draw();
    }

    draw() {
        // update graphics of the timeline
        $('#timeline option').remove();
        let T = p.globalTime;
        for (let i = 0; i <= p.projectInfo.length.get() ; i++) {
            $("#timeline").append(new Option(i.toString(), i.toString(),false, T.get() === i));
        }
        $('#timeline')

    }

}
;// CONCATENATED MODULE: ./src/assets/js/modules/ImageLoader/ImageLoader.js


class ImageLoader {

    // random images
    // https://toppng.com/uploads/preview/question-marks-png-11552247920xwjr8vuvf8.png
    // https://photographylife.com/wp-content/uploads/2020/03/Ultra-Wide-Angle-Panoramas-1.jpg
    // https://static.kodami.it/wp-content/uploads/sites/31/2021/03/iStock-140469307.jpg
    constructor () {
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
        this.controllers();
    }

    controllers() {
        $(document).ready(function(){
            $('#saveElement').click(ElementInputController.onSave);
        });
    }

    /** Elaborates the data present in the input form */
    static onSave() {
        if (p.elementInput.controller.active) {
            p.elementInput.readVariables();
            p.elementInput.save();
            ImageLoader.addURL(p.elementInput.getImg(p.globalTime))
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
        switch (p.focus.get()) {
            case "main": p.keyboard.mainControls(e); break;
            case "info": p.keyboard.infoControls(e); break;
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
            case 's':
                p.projectInfo.new();
                p.projectInfo.load();
                break;
            case 'ArrowLeft':
                if (p.globalTime.get() > 0) {
                    p.globalTime.set(p.globalTime.get() - 1);
                    p.timeline.draw();
                    p.canvas.draw();
                }
                break;
            case 'ArrowRight':
                if (p.globalTime.get() < p.projectInfo.length.get()) {
                    p.globalTime.set(p.globalTime.get() + 1);
                    p.timeline.draw();
                    p.canvas.draw();
                }
                break;
        }
    }

    infoControls(e) {
        switch (e.key) {
            case 'Escape':
                p.projectInfo.unload();
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
;// CONCATENATED MODULE: ./src/assets/js/modules/Focus/Focus.js


class Focus {
    constructor() {
        this.focus = "main";
    }

    set(newFocus) {
        if (this.isValidFocus(newFocus) && this.focus !== newFocus) {
            this.focus = newFocus;
            this.updateControllers();
        }
    }

    get() {
        return this.focus;
    }

    isValidFocus(newFocus) {
        return [
            'main',
            'element',
            'info'
        ].includes(newFocus)

    }

    updateControllers() {
        switch (this.focus) {
            case 'main':
                p.toolbox.controller.enable();
                p.projectInfo.controller.disable();
                break;
            case 'element':
                p.toolbox.controller.enable();
                p.projectInfo.controller.disable();
                break;
            case 'info':
                p.toolbox.controller.disable();
                p.projectInfo.controller.enable();
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
        let T = p.globalTime;
        this.setName('',T);
        this.setDescription('',T);
        this.setStart(p.globalTime.get(),T);
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
        $('#boxInputElement').show();
        this.writeVariables()
        p.focus.set('element');
    }

    unload() {
        $('#boxInputElement').hide();
        p.focus.set('main');
        if (this.isNewElement)
            p.canvas.addElement(this);
            this.isNewElement = false
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
        let T = p.globalTime

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
        let pos = [], found = false,
        container = $('.container').offset().left;
        let max = container;

        $('.element').each(function() {
            max = Math.max(max, $(this).offset().left);
            found = true
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
        $('.container').append(html);
        
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
        /* $(`.element[data-id='`+elementInput.ID+`']`).click((e) => {
            p.elementInput.open(parseInt(e.currentTarget.dataset['id']));
            p.elementInput.load();
        }); */
        this.draw();
    }
}
;// CONCATENATED MODULE: ./src/assets/js/Project.js











class Project {
    constructor() {
        this.globalTime = new TimeX();
        this.projectInfo = new ProjectInfo();
        this.projectSettings;
        this.projectView;

        this.toolbox;
        this.timeline;
        this.settings;
        this.keyboard;
        this.focus;
        this.imageLoader;

        this.elements;
        this.bonds;
        this.elementInput;

        this.bondInput;
    }

    new() {
        this.globalTime.set(1);
        // Fill all global project variables with newly created data
        this.projectInfo.new();
        this.projectSettings = this.createNewProjectSettings();
        this.projectView = this.createNewProjectView();

        this.toolbox = new Toolbox();
        this.timeline = new Timeline();
        this.keyboard = new Keyboard();
        this.focus = new Focus();
        this.canvas = new Canvas();
        this.imageLoader = new ImageLoader();


         /** @type {Element[]} */
        this.elements = [null];
        this.bonds = [];

        this.elementInput = new ElementInput();
        //this.bondInput = new BondInput();

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

    }

}

const p = new Project();


;// CONCATENATED MODULE: ./src/assets/js/index.js
// Import modules


p.new();
/******/ })()
;