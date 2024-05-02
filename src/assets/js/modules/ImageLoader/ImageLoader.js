import { p } from "../../Project";

export default class ImageLoader {

    // random images
    // https://toppng.com/uploads/preview/question-marks-png-11552247920xwjr8vuvf8.png
    // https://photographylife.com/wp-content/uploads/2020/03/Ultra-Wide-Angle-Panoramas-1.jpg
    // https://static.kodami.it/wp-content/uploads/sites/31/2021/03/iStock-140469307.jpg
    constructor () {}
    
    new() {
        this.urls = []
    }

    /** when opening an existing project looks for all the url in the various places and loads them in the url array, while loading each single image */
    loadBatch() {

    }

    /** Adds a new url to the list of images to be loaded and loads it */
    static addURL(URL) {

        if (URL != "" && !p.imageLoader.urls.includes(URL)) {
            p.imageLoader.urls.push(URL)
            ImageLoader.#getImage(URL)
        }
        
    }

    /** Requests a single image */
    static #getImage(URL) {
        let img = new Image();
        img.src = URL;
    }
}
