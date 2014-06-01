/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./MySQLRefManURLPath.ts" />

class URLResolver {
    refManVersions: Array<number> = [3.23, 4.0, 4.1, 5.0, 5.1, 5.5, 5.6, 5.7];
    version: number;
    dfd : any;
    info: any;
    path: MySQLRefManURLPath;
    resolved: string;

    constructor(dfd : any, path : MySQLRefManURLPath, version : number, info : any) {
        this.dfd = dfd;
        this.path = path;
        this.version = version;
        this.info = info;

        if (version < info.floor) {
            this.refManVersions = _.filter(this.refManVersions, function (version) { return version >= version; });
        } else if (version > info.cap) {
            this.refManVersions = _.filter(this.refManVersions, function (version) { return version <= version; });
        }
    }

    resolve() {
        var max : number = _.max(this.refManVersions);

        if (_.isUndefined(max)) {
            this.resolved = undefined;
            this.dfd.reject();
        }

        _.remove(this.refManVersions, function (version) { return version == max; });

        var self = this;
        this._resolve(max).done(function (serviceDocument) {
            self.resolved = self.path.buildURLWithVersion(max);
            self.dfd.resolve();
        }).fail(function () {
            self.resolve();
        });

        return this.dfd.promise();
    }

    private _resolve(max : number) : any {
        var _dfd : any = $.Deferred();

        var self = this;
        $.ajax({
            url: self.path.buildURLWithVersion(max),
            type: 'HEAD',
        }).done(function () {
            _dfd.resolve();
        }).fail(function () {
            _dfd.reject();
        });

        return _dfd.promise();
    }
}

