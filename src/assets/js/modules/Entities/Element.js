import TypeX from "../../TypeX";

export default class Element {

  constructor() {
    this.ID;
    this.name = new TypeX;
    this.description = new TypeX;
    this.img = new TypeX;
    this.start = new TypeX;
    this.end = new TypeX;
  }

  /* Set the name attribute */
  setName(name, timeX) {
    this.name.set(name, timeX);
  }
  /* Get the name attribute */
  getName(timeX) {
    return this.name.get(timeX);
  }

  /* Set the description attribute */
  setDescription(description, timeX) {
    this.description.set(description, timeX);
  }
  /* Get the description attribute */
  getDescription(timeX) {
    return this.name.get(timeX);
  }

  /* Set the img attribute */
  setImg(img, timeX) {
    this.img.set(img, timeX);
  }
  /* Get the img attribute */
  getImg(timeX) {
    return this.img.get(timeX);
  }

  /* Set the start attribute */
  setStart(start, timeX) {
    this.start.set(start, timeX);
  }
  /* Get the start attribute */
  getStart(timeX) {
    return this.start.get(timeX);
  }

  /* Set the end attribute */
  setEnd(end, timeX) {
    this.end.set(end, timeX);
  }
  /* Get the end attribute */
  getEnd(timeX) {
    return this.end.get(timeX);
  }
}
