class Keyboard {
    constructor() {
        this.keyList = [];
        this.countdown = 200;
        this.last_timeout = 0;
        this.debug = false;
        addEventListener('keydown', this.registerKey);

    }

    registerKey(e) {
        if (p.keyboard.last_timeout !== 0) {
            clearTimeout(p.keyboard.last_timeout);
        }
        switch (p.focus.get()) {
            case "main": p.keyboard.mainControls(e); break;
            case "info": p.keyboard.infoControls(e); break;
            case "element": p.keyboard.elementControls(e); break;
        }
        p.keyboard.last_timeout = setTimeout(p.keyboard.getWord, p.keyboard.countdown);
        p.keyboard.keyList.push(e.key);
    }

    getWord() {
        if (p.keyboard.keyList.length > 0) {
            let keyword = p.keyboard.keyList.join("");
            p.keyboard.keyList = [];
            if (p.keyboard.debug)
                p.keyboard.search(keyword);
        }
    }

    search(keyword) {
        switch (keyword) {

        }
        console.log(keyword);
    }

    mainControls(e) {
        switch (e.key) {
            case 'n':
                p.elementInput.new();
                p.elementInput.load();
                break;
            case 's':
                p.projectInfo.new();
                p.projectInfo.load();
                break;
            case 'ArrowLeft':
                if (p.globalTime.get() > 0) {
                    p.globalTime.set(p.globalTime.get() - 1);
                    p.timeline.draw();
                }
                break;
            case 'ArrowRight':
                if (p.globalTime.get() < p.projectInfo.length.get()) {
                    p.globalTime.set(p.globalTime.get() + 1);
                    p.timeline.draw();
                }
                break;
        }
    }

    infoControls(e) {
        switch (e.key) {
            case 'Escape':
                p.projectInfo.unload();
                break;
        }
    }

    elementControls(e) {
        switch (e.key) {
            case 'Escape':
                p.elementInput.unload();
                break;
        }
    }
}