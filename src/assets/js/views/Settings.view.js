import Utils from "../utils/Utils";
import BaseView from "./BaseView";

/**
 * @param {Utils} boxInfo 
 * @param {Utils} infoLength 
 * @param {Utils} infoName 
 * @param {Utils} infoDescription 
 * @param {Utils} infoImg 
 */
export default class SettingsView extends BaseView {

    /** Set up the class, listing the elements that will have interaction once binded */
    constructor() {
        super()
        this._selectors = {id:[
            "boxInfo",
            "infoLength",
            "infoName",
            "infoDescription",
            "infoImg",
        ]}
    }
}
