import ControllerTimeline from "./ControllerTimeline";
import { p } from "../../Project";

export default class Timeline {
    constructor() {
        this.controller = new ControllerTimeline();
        this.el = '#timeline';
        this.draw();
    }

    draw() {
        // update graphics of the timeline
        $('#timeline option').remove();
        let T = p.globalTime;
        for (let i = 0; i <= p.projectInfo.length.get() ; i++) {
            $("#timeline").append(new Option(i.toString(), i.toString(),false, T.get() === i));
        }
        $('#timeline')

    }

}