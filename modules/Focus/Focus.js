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