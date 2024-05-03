import ControllerGlobal from "../Controllers/ControllerGlobal";
import { p } from "../../Project";
import UE from "../Utils/ElementUtils";
import Timeline from "./Timeline";

/*
Imposta tutti i dati di configurazione in modo da avere tutto cio che serve
 alla stampa e all'utilizzo dei parametri altrove
*/
export default class ControllerTimeline extends ControllerGlobal{
  constructor() {
    super();
    this.ready(()=>{
      this.timeline = new UE("timeline")
      this.timelineContainer = new UE("timelineContainer")
      this.controllers()
    })
  }

  controllers() {
    this.timeline.onChange(() => {
      if (p.timeline.controller.active) {
        p.time.set(parseInt(p.timeline.controller.timeline.val()));
        Timeline.draw();
        p.canvas.draw();
      }
    })
  }
}
