/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./lib/MySQLRefManURLPath.ts" />
/// <reference path="./lib/Admonitor.ts" />
/// <reference path="./lib/URLResolver.ts" />

class Main {

    static run() : void {
        var path = new MySQLRefManURLPath(location.href);
        var version : number = path.retrieveManVersion();
        if (isNaN(version)) {
            console.error("! Fail to fetch version number");
            return;
        }

        chrome.storage.local.get('floor', (result) => {
            var floor = result['floor'];
            chrome.storage.local.get('cap', (result) => {
                var cap = result['cap'];
                if (version < floor || version > cap) {
                    var admonitor = new Admonitor();
                    admonitor.notice();

                    var dfd : any = $.Deferred();
                    var resolver = new URLResolver(dfd, path, version, {"floor": floor, "cap": cap});
                    resolver.resolve().done(() => {
                        admonitor.appendAltPage(resolver.resolved);
                    }).fail(() => {
                        console.log('Alternative page does not exist');
                    });
                }
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", Main.run);

