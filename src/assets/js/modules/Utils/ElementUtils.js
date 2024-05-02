export default class ElementUtils {
    
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
        document.addEventListener('DOMContentLoaded', callback);
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