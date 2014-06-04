/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./Constants.ts" />
/// <reference path="./URLResolver.ts" />
/// <reference path="./MySQLRefManURLPath.ts" />

class Admonitor {
    private msg: string = "This manual version is out of range";
    private id: string = "mysql_reference_manual_version_checker_warning";

    constructor(
        public floor: number = Constants.defaultFloorVersion,
        public cap: number = Constants.defaultCapVersion
    ) {}

    private buildHTML (): string {
        return '<h1 id="' + this.id + '" style="position:absolute; top:30px; left:180px; width:600px; background-color:red">' + this.msg + '<h1>';
    }

    private appendAltPage(url: string): void {
        $('#' + this.id).append(' (Alternative page is <a href="' + url + '">here</a>)');
    }

    noticeIfOutOfVersionRange(path: MySQLRefManURLPath, version: number): void {
        if (version < this.floor || version > this.cap) {
            $("body").prepend(this.buildHTML());

            var dfd: Q.Deferred<{}> = Q.defer();
            var resolver = new URLResolver(dfd, path, version, {"floor": this.floor, "cap": this.cap});
            resolver.resolve().then((resolved) => {
                this.appendAltPage(resolved);
            }).catch(() => {
                console.log('Alternative page does not exist');
            });
        }
    }
}

