export interface IArduinoDebug {
    /**
     * Resolve the children of `node`.
     *
     * @param node The node from which the provider resolves children.
     * @return Children of `node`.
     */
    // arduino --board arduino:avr:nano:cpu=atmega168 --port /dev/ttyACM0 --upload /path/to/sketch/sketch.ino
    Build(inoPath: string): Array<string> | Thenable<Array<string>>;

    Upload(inoPath: string): Array<string> | Thenable<Array<string>>;

    GetPreference(pref: string): Array<any> | Thenable<Array<any>>;

    InstallBoard(board: string): Array<string> | Thenable<Array<string>>;

    InstallLibrary(library: string): Array<string> | Thenable<Array<string>>;

    Monitor(): Array<string> | Thenable<Array<string>>;

    Debug(): Array<string> | Thenable<Array<string>>;
}

export enum ExitStatus {
    Success = 1,
    BuildOrUploadFailed,
    SketchNotFound,
    InvalidArgumentCommandline,
    PreferenceNotExist
}

