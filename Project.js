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
