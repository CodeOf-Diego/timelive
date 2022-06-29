/*
Imposta tutti i dati di configurazione in modo da avere tutto cio che serve
 alla stampa e all'utilizzo dei parametri altrove
*/
class ControllerTimeline extends ControllerGlobal{
  constructor() {
    super();
    this.controllers();
  }

  controllers() {
    $(document).ready(function(){

      $('#timeline').change(() => {
        if (p.timeline.controller.active) {
          p.globalTime.set(parseInt($(p.timeline.el).val()));
          p.timeline.draw();
        }
      });
    });
  }
}