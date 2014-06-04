/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./lib/MySQLRefManURLPath.ts" />
/// <reference path="./lib/Admonitor.ts" />

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
                var admonitor = new Admonitor(floor, cap);
                admonitor.noticeIfOutOfVersionRange(path, version);
            });
        });
    }
}

document.addEventListener("DOMContentLoaded", Main.run);

