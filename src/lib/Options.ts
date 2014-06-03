/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./Constants.ts" />

module Options {
    class Dom {
        floor : JQuery = $('#floor');
        cap : JQuery = $('#cap');
        saveButton : JQuery = $('#save');

        constructor () {}

        fill () {
            ['floor', 'cap'].forEach((key) => {
                chrome.storage.local.get(key, (result) => {
                    this[key].val(result[key]);
                });
            });
        }
    }

    export class Event {
        private dom : Dom;

        start () : void {
            this.dom = new Dom();
            this.dom.fill();
            this.dom.saveButton.click(() => {
                var floorVersion = this.dom.floor.val() || Constants.defaultFloorVersion;
                var capVersion = this.dom.cap.val() || Constants.defaultCapVersion

                if (_.isNaN(Number(floorVersion)) || _.isNaN(Number(capVersion))) {
                    this.dom.saveButton.text('Some settings are wrong');
                    return;
                }

                chrome.storage.local.set({
                    "floor": floorVersion,
                    "cap": capVersion
                }, () => {
                    this.dom.saveButton.text('Saved!');
                });
            });
        }
    }
}

new Options.Event().start();

