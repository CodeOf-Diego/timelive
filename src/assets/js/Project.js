import TimeX from "./TimeX";
import Settings from "./modules/Settings/Settings";
import Menu from "./modules/Menu/Menu";
import Toolbox from "./modules/Toolbox/Toolbox";
import Timeline from "./modules/Timeline/Timeline";
import Keyboard from "./modules/Keyboard/Keyboard";
import Focus from "./modules/Focus/Focus";
import Canvas from "./modules/Canvas/Canvas";
import ElementInput from "./modules/Entities/ElementInput";
import Element from "./modules/Entities/Element";
import ImageLoader from "./modules/ImageLoader/ImageLoader";

class Project {
    constructor() {
        this.time = new TimeX();
        this.projectView;
        
        this.menu = new Menu();
        this.toolbox = new Toolbox();
        this.timeline = new Timeline();
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
        Timeline.draw()
        Timeline.show()
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

    /** Starts the engine */
    start() {
        // first thing todo is to check if the app is in view-only mode
        // for now it will never be

        if(0) {}
        else {
            Menu.show()
            Focus.set('menu')
        }
        // next local storage is checked to find existing projects to open
        // lastly a "New Project" button is always present
    }

}

const p = new Project();

export {Project, p}