/// <reference path="../../typings/tsd.d.ts" />

class Admonitor {
    msg : string = "This manual version is out of range";
    private id : string = "mysql_reference_manual_version_checker_warning";

    constructor() {}

    private buildHTML () : string {
        return '<h1 id="' + this.id + '" style="position:absolute; top:30px; left:180px; width:600px; background-color:red">' + this.msg + '<h1>';
    }

    notice() : void {
        $("body").prepend(this.buildHTML());
    }

    appendAltPage(url : string) : void {
        $('#' + this.id).remove();
        this.msg = this.msg + ' (Alternative page is <a href="' + url + '">here</a>)';
        this.notice();
    }
}

