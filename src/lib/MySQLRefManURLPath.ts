class MySQLRefManURLPath {
    path : string;

    constructor(path : string) {
        this.path = path;
    }

    retrieveManVersion() : number {
        var paths : Array<string> = this.path.split('/');
        return Number(paths[2]);
    }
}
