import { p } from "../../Project";
import ElementInputController from "../Entities/ElementInputController";
import Focus from "../Focus/Focus";
import Timeline from "../Timeline/Timeline";

/**
 * Handles keyboard interactions
 * The class has a listener that records inputs and execute any possible action related to it
 * The avalilable inputs depend on the current focus in the project, main/new element/settings
 * 
 * If a specific focus has multiple input that start with the same part, there will be a small delay before executing the shorter input
 * otherwise, if there is only one possible action for that imput it'll be executed immediately
 * 
 */

export default class Keyboard {
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
                    Timeline.draw();
                    p.canvas.draw();
                }
                break;
            case 'ArrowRight':
                if (p.time.get() < p.settings.length.get()) {
                    p.time.set(p.time.get() + 1);
                    Timeline.draw();
                    p.canvas.draw();
                }
                break;
        }
    }

    settingsControls(e) {
        switch (e.key) {
            case 'Escape':
                p.settings.unload();
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