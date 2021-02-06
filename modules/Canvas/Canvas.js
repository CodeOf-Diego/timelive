class Canvas {
    constructor() {

    }

    draw() {
        //redraw graph with the new element
    }

    addElement(elementInput) {
        let html = `<div class="element" data-id="`+elementInput.ID+`"></div>`;
        $('.container').append(html);
        $(`.element[data-id='`+elementInput.ID+`']`).click((e) => {
            p.elementInput.open(parseInt(e.currentTarget.dataset['id']));
            p.elementInput.load();
        });
        this.draw();
    }
}