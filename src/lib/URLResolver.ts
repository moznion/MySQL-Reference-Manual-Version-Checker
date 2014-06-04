/// <reference path="../../typings/tsd.d.ts" />
/// <reference path="./MySQLRefManURLPath.ts" />

class URLResolver {
    refManVersions: Array<number> = [3.23, 4.0, 4.1, 5.0, 5.1, 5.5, 5.6, 5.7];
    version: number;
    dfd : Q.Deferred<any>;
    info: any;
    path: MySQLRefManURLPath;

    constructor(dfd : Q.Deferred<any>, path : MySQLRefManURLPath, version : number, info : any) {
        this.dfd = dfd;
        this.path = path;
        this.version = version;
        this.info = info;

        this.refManVersions = _.filter(this.refManVersions, (v) => { return info.cap >= v });
        if (this.version < info.floor) {
            this.refManVersions = _.filter(this.refManVersions, (v) => { return this.version < v });
        }
    }

    resolve() {
        if (_.isEmpty(this.refManVersions)) {
            this.dfd.reject(undefined);
            return;
        }

        var max : number = _.max(this.refManVersions);
        _.remove(this.refManVersions, (version) => { return version == max });

        this._resolve(max).then(() => {
            this.dfd.resolve(this.path.buildURLWithVersion(max));
        }).catch(() => {
            this.resolve();
        });

        return this.dfd.promise;
    }

    private _resolve(max : number) : Q.Promise<any> {
        var self = this;
        return Q($.ajax({
            url: self.path.buildURLWithVersion(max),
            type: 'HEAD',
        }));
    }
}

