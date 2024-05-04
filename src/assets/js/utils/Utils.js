export default class Utils {
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