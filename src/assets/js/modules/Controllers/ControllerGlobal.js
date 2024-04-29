import ElementUtils from "../Utils/ElementUtils";

export default class ControllerGlobal extends ElementUtils {
  
  constructor(el = undefined) {
    super()
    this.active = 1;
    if (el !== undefined) {
      this.bindID(el)
    }
  }
  
  enable() {
    this.active = 1;
  }
  disable() {
    this.active = 0;
  }
  
  bindID(el) {
    this.el = ElementUtils.byID(el);
  }
}
