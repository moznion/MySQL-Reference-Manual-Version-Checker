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

        var floor : number = 5.0;
        var cap : number = Infinity;
        var admonitor = new Admonitor();
        if (version < floor || version > cap) {
            admonitor.notice();

            var dfd : any = $.Deferred();
            var resolver = new URLResolver(dfd, path, version, {"floor": floor, "cap": cap});
            resolver.resolve().done(function () {
                admonitor.appendAltPage(resolver.resolved);
            }).fail(function () {
                console.log('Alternative page does not exist');
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", Main.run);

