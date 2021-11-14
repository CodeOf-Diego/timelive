class Canvas {
    constructor() {
        this.separation = 40;
    }

    draw() {
        //redraw graph with the new element
    }


    /** Find positions of all currently placed elements and add offset for new position */
    newPosition() {
        let pos = [], found = false,
        container = $('.container').offset().left;
        let max = container;

        $('.element').each(function() {
            max = Math.max(max, $(this).offset().left);
            found = true
        });


//        console.log(pos, container, max, found)
        return max - container + (found ? this.separation : 0);
    }


    addElement(elementInput) {
        let style = 'style="left:'+ this.newPosition().toString() +'px"';
        let html = `<div class="element" data-id="`+elementInput.ID+`" `+ style +`></div>`;
        $('.container').append(html);
        $(`.element[data-id='`+elementInput.ID+`']`).click((e) => {
            p.elementInput.open(parseInt(e.currentTarget.dataset['id']));
            p.elementInput.load();
        });
        this.draw();
    }
}