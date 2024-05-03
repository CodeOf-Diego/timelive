import ControllerTimeline from "./ControllerTimeline";
import { p } from "../../Project";

export default class Timeline {
    constructor() {
        this.controller = new ControllerTimeline();
    }

    /** Builds dinamically the timeline component depending on the project settings */
    static draw() {
        // update graphics of the timeline
        p.timeline.controller.timeline.el.innerHTML = ""
        let T = p.time;
        for (let i = 0; i <= p.settings.length.get() ; i++) {
            p.timeline.controller.timeline.el.appendChild(new Option(i.toString(), i.toString(),false, T.get() === i))
        }
    }

    static show() {
        p.timeline.controller.timelineContainer.show()
    }

    static hide() {
        p.timeline.controller.timelineContainer.hide()
    }

}