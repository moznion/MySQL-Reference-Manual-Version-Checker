/// <reference path="../../typings/tsd.d.ts" />

class Admonitor {
    static notice() : void {
        $("body").prepend('<h1 style="position:absolute; top:30px; left:180px; width:500px; background-color:red">This manual version is out of range<h1>');
    }
}

