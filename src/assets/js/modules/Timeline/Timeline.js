import ControllerTimeline from "./ControllerTimeline";
import { p } from "../../Project";

export default class Timeline {
    constructor() {
        this.controller = new ControllerTimeline();
    }

    draw() {
        // update graphics of the timeline
        this.controller.timeline.el.innerHTML = ""
        let T = p.globalTime;
        for (let i = 0; i <= p.projectSettings.length.get() ; i++) {
            this.controller.timeline.el.appendChild(new Option(i.toString(), i.toString(),false, T.get() === i))
        }
    }

}