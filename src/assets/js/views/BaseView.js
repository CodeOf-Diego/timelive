import Utils from "../utils/Utils"

export default class BaseView {

    /**
     * if an object structure of the elements is defined in the view
     * binds them to allow interaction with them
     * @param {id:[string]} this._selectors 
     */
    linkSelectors() {
        if (this._selectors !== undefined) {
            for (let i in this._selectors.id) 
                this[this._selectors.id[i]] = new Utils(this._selectors.id[i]) 
        }
    }

}