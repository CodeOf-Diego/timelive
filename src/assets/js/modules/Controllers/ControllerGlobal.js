import ElementUtils from "../Utils/ElementUtils";

export default class ControllerGlobal extends ElementUtils {
  
  constructor() {
    super()
    this.active = 1;
  }
  
  enable() {
    this.active = 1;
  }
  disable() {
    this.active = 0;
  }
  
  modelAttributes() {
    for (let attribute in this.Model) {
      Object.defineProperty(this, attribute, {
        get: function()   {return this.Model[attribute]}
      });
    } 
  }
}
