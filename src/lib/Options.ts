/// <reference path="../../typings/tsd.d.ts" />

module Options {
    class Dom {
        floor : JQuery = $('#floor');
        cap : JQuery = $('#cap');
        saveButton : JQuery = $('#save');

        constructor () {}

        fill () {
            this.floor.val(localStorage.getItem('floor'));
            this.cap.val(localStorage.getItem('cap'));
        }
    }

    export class Event {
        private dom : Dom;

        start () : void {
            this.dom = new Dom();
            this.dom.fill();
            var self = this;
            this.dom.saveButton.click(() => {
                var floorVersion = self.dom.floor.val() || 0.0;
                var capVersion = self.dom.cap.val() || Infinity;

                if (_.isNaN(Number(floorVersion)) || _.isNaN(Number(capVersion))) {
                    self.dom.saveButton.text('Some settings are wrong');
                    return;
                }

                localStorage.setItem('floor', self.dom.floor.val() || 0.0);
                localStorage.setItem('cap', self.dom.cap.val() || Infinity);
                self.dom.saveButton.text('Saved!');
            });
        }
    }
}

new Options.Event().start();

