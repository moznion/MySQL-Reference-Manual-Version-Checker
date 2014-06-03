/// <reference path="../../typings/tsd.d.ts" />

module Options {
    class Dom {
        floor : JQuery = $('#floor');
        cap : JQuery = $('#cap');
        saveButton : JQuery = $('#save');

        constructor () {}

        fill () {
            var self = this;

            ['floor', 'cap'].forEach((key) => {
                chrome.storage.local.get(key, (result) => {
                    self[key].val(result[key]);
                });
            });
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
                var capVersion = self.dom.cap.val() || 999.0 // XXX Chrome local storage cannot set Infinity;

                if (_.isNaN(Number(floorVersion)) || _.isNaN(Number(capVersion))) {
                    self.dom.saveButton.text('Some settings are wrong');
                    return;
                }

                chrome.storage.local.set({
                    "floor": floorVersion,
                    "cap": capVersion
                }, () => {
                    self.dom.saveButton.text('Saved!');
                });
            });
        }
    }
}

new Options.Event().start();

