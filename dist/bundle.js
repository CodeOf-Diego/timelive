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

;// CONCATENATED MODULE: ./src/assets/js/modules/ProjectInfo/ControllerProjectInfo.js



class ControllerProjectInfo extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    controllers() {
        $(document).ready(function(){
            $('#infoLength').change((e) => {
                if (Project_p.projectInfo.controller.active) {
                    Project_p.projectInfo.length.set(parseInt($(Project_p.projectInfo.el).val()))
                    if (Project_p.globalTime.get() > Project_p.projectInfo.length.get()) {
                        Project_p.globalTime.set(Project_p.projectInfo.length.get());

                    }
                    Project_p.timeline.draw();
                }
            });
        });
    }
}
;// CONCATENATED MODULE: ./src/assets/js/modules/ProjectInfo/ProjectInfo.js




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
        this.controller = new ControllerProjectInfo();
        this.el = '#infoLength'
    }

    new() {
        let T = Project_p.globalTime;
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
        Project_p.focus.set('info');
    }

    unload() {
        $('#boxInfo').hide();
        Project_p.focus.set('main');
        //refresh

    }

    writeVariables() {
        let T = Project_p.globalTime;
        $('#infoName').val(this.name);
        $('#infoLength').val(this.length.get());
        $('#infoDescription').val(this.description.get(T));
        $('#infoImg').val(this.bgImage.get(T));
    }

}
;// CONCATENATED MODULE: ./src/assets/js/modules/Toolbox/ControllerToolbox.js



class ControllerToolbox extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    newElement() {
        if (Project_p.toolbox.controller.active) {
            Project_p.elementInput.new();
            Project_p.elementInput.load();
        }
    }


    controllers() {
        $(document).ready(function(){
            $('#newElement').on('click',Project_p.toolbox.controller.newElement);
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
        if (Project_p.timeline.controller.active) {
          Project_p.globalTime.set(parseInt($(Project_p.timeline.el).val()));
          Project_p.timeline.draw();
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
        let T = Project_p.globalTime;
        for (let i = 0; i <= Project_p.projectInfo.length.get() ; i++) {
            $("#timeline").append(new Option(i.toString(), i.toString(),false, T.get() === i));
        }
        $('#timeline')

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
        if (Project_p.keyboard.last_timeout !== 0) {
            clearTimeout(Project_p.keyboard.last_timeout);
        }
        switch (Project_p.focus.get()) {
            case "main": Project_p.keyboard.mainControls(e); break;
            case "info": Project_p.keyboard.infoControls(e); break;
            case "element": Project_p.keyboard.elementControls(e); break;
        }
        Project_p.keyboard.last_timeout = setTimeout(Project_p.keyboard.getWord, Project_p.keyboard.countdown);
        Project_p.keyboard.keyList.push(e.key);
    }

    getWord() {
        if (Project_p.keyboard.keyList.length > 0) {
            let keyword = Project_p.keyboard.keyList.join("");
            Project_p.keyboard.keyList = [];
            if (Project_p.keyboard.debug)
                Project_p.keyboard.search(keyword);
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
                Project_p.elementInput.new();
                Project_p.elementInput.load();
                break;
            case 's':
                Project_p.projectInfo.new();
                Project_p.projectInfo.load();
                break;
            case 'ArrowLeft':
                if (Project_p.globalTime.get() > 0) {
                    Project_p.globalTime.set(Project_p.globalTime.get() - 1);
                    Project_p.timeline.draw();
                }
                break;
            case 'ArrowRight':
                if (Project_p.globalTime.get() < Project_p.projectInfo.length.get()) {
                    Project_p.globalTime.set(Project_p.globalTime.get() + 1);
                    Project_p.timeline.draw();
                }
                break;
        }
    }

    infoControls(e) {
        switch (e.key) {
            case 'Escape':
                Project_p.projectInfo.unload();
                break;
        }
    }

    elementControls(e) {
        switch (e.key) {
            case 'Escape':
                Project_p.elementInput.unload();
                break;
                // TODO FIX enter doesn't save the element
            case 'Enter':
                $('#newElement').click();
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
                Project_p.toolbox.controller.enable();
                Project_p.projectInfo.controller.disable();
                break;
            case 'element':
                Project_p.toolbox.controller.enable();
                Project_p.projectInfo.controller.disable();
                break;
            case 'info':
                Project_p.toolbox.controller.disable();
                Project_p.projectInfo.controller.enable();
                break;


        }
    }

}
;// CONCATENATED MODULE: ./src/assets/js/modules/Canvas/Canvas.js
class Canvas {
    constructor() {
        this.separation = 40;
    }

    draw() {
        //redraw graph with the new element
    }


    /** Find positions of all currently placed elements and add offset for new position */
    newPosition() {
        let pos = [], found = false,
        container = $('.container').offset().left;
        let max = container;

        $('.element').each(function() {
            max = Math.max(max, $(this).offset().left);
            found = true
        });


//        console.log(pos, container, max, found)
        return max - container + (found ? this.separation : 0);
    }


    addElement(elementInput) {
        let style = 'style="left:'+ this.newPosition().toString() +'px"';
        let html = `<div class="element" data-id="`+elementInput.ID+`" `+ style +`></div>`;
        $('.container').append(html);
        $(`.element[data-id='`+elementInput.ID+`']`).click((e) => {
            p.elementInput.open(parseInt(e.currentTarget.dataset['id']));
            p.elementInput.load();
        });
        this.draw();
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
    return this.name.get(timeX);
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

;// CONCATENATED MODULE: ./src/assets/js/modules/Entities/ElementInputController.js



class ElementInputController extends ControllerGlobal{
    constructor() {
        super();
        this.controllers();
    }

    controllers() {
        $(document).ready(function(){
            $('#saveElement').click(() => {

                if (Project_p.elementInput.controller.active) {
                    Project_p.elementInput.readVariables();
                    Project_p.elementInput.save();
                    Project_p.elementInput.unload();
                }
            });
        });
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
    }

    new() {
        let T = Project_p.globalTime;
        this.setName('',T);
        this.setDescription('',T);
        this.setStart(0,T);
        this.setEnd(0,T);
        this.setImg('',T);
        this.ID = 0;
    }

    open(idOpen) {
        if (Project_p.elements[parseInt(idOpen)] !== undefined) {
            this.ID = idOpen;
            this.name = Project_p.elements[idOpen].name.duplicate();
            this.description = Project_p.elements[idOpen].description.duplicate();
            this.start = Project_p.elements[idOpen].start.duplicate();
            this.end = Project_p.elements[idOpen].end.duplicate();
            this.img = Project_p.elements[idOpen].img.duplicate();
        }
        else {
            this.new();
        }
    }

    /* Load the element input box, showing the variables */
    load() {
        $('#boxInputElement').show();
        this.writeVariables()
        Project_p.focus.set('element');
    }

    unload() {
        $('#boxInputElement').hide();
        Project_p.focus.set('main');
        if (this.newElement)
            Project_p.canvas.addElement(this);
        //refresh
    }

    writeVariables() {
        let T = Project_p.globalTime;
        $('#elementName').val(this.getName(T)).focus();
        $('#elementDescription').val(this.getDescription(T));
        $('#elementStart').val(this.getStart(T));
        $('#elementEnd').val(this.getEnd(T));
        $('#elementImg').val(this.getImg(T));
    }

    readVariables() {
        let T = Project_p.globalTime;
        this.setName($('#elementName').val(),T);
        this.setDescription($('#elementDescription').val(),T);
        this.setStart($('#elementStart').val(),T);
        this.setEnd($('#elementEnd').val(),T);
        this.setImg($('#elementImg').val(),T);
    }

    /* New elements are appended at the end of the public array,
       In existing elements are updated only the attributes with changed values */
    save() {
        let T = Project_p.globalTime;
        this.newElement = this.ID === 0;
        if(this.ID === 0) {
            let newElement = new Element();
            newElement.setName(this.getName(T),T);
            newElement.setDescription(this.getDescription(T),T);
            newElement.setStart(this.getStart(T),T);
            newElement.setEnd(this.getEnd(T),T);
            newElement.setImg(this.getImg(T),T);
            this.ID = Project_p.elements.push(newElement) - 1;
        }
        else {
            let currElement = Project_p.elements[this.ID];
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

const Project_p = new Project();


;// CONCATENATED MODULE: ./src/assets/js/index.js
// Import modules



Project_p.new();
/******/ })()
;