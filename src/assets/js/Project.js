import TimeX from "./TimeX";
import ProjectSettings from "./modules/ProjectSettings/ProjectSettings";
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
        this.globalTime = new TimeX();
        this.projectSettings = new ProjectSettings();
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
        this.projectSettings.new();
        //this.projectSettings = this.createNewProjectSettings();
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

export {Project, p}