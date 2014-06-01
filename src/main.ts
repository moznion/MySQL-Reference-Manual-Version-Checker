/// <reference path="../typings/tsd.d.ts" />
/// <reference path="./lib/MySQLRefManURLPath.ts" />
/// <reference path="./lib/Admonitor.ts" />

class Main {
    static run() : void {
        var path = new MySQLRefManURLPath(location.pathname);
        var version : number = path.retrieveManVersion();
        if (isNaN(version)) {
            console.error("! Fail to fetch version number");
            return;
        }

        var lowerLimitVersion : number = 5.0;
        var upperLimitVersion : number = Infinity;
        if (version < lowerLimitVersion || version > upperLimitVersion) {
            Admonitor.notice();
        }
    }
}

document.addEventListener("DOMContentLoaded", Main.run);

