class MySQLRefManURLPath {
    path : string;

    constructor(path : string) {
        this.path = path;
    }

    retrieveManVersion() : number {
        var paths : Array<string> = this.path.split('/');
        return Number(paths[5]);
    }

    buildURLWithVersion(version : number) : string {
        var paths : Array<string> = this.path.split('/');
        paths[5] = version.toString();
        return paths.join('/');
    }
}

