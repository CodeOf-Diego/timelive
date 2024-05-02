import { p } from "../../Project";

export default class Focus {
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
            'info',
            'menu'
        ].includes(newFocus)

    }

    static updateControllers() {
        switch (Focus.get()) {
            case 'main':
                p.toolbox.controller.enable();
                p.settings.controller.disable();
                break;
            case 'element':
                p.toolbox.controller.enable();
                p.settings.controller.disable();
                break;
            case 'info':
                p.toolbox.controller.disable();
                p.settings.controller.enable();
                break;
            case 'menu':
                p.toolbox.controller.disable();
                p.settings.controller.disable();
                p.menu.controller.enable();
                break;

        }
    }

}