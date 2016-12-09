import { IArduinoDebug } from './iarduinodebug'

// reference: https://github.com/PaulStoffregen/Arduino-1.6.7-Teensyduino/blob/master/build/shared/manpage.adoc
// normal use: arduino --board arduino:avr:nano:cpu=atmega168 --port /dev/ttyACM0 --upload /path/to/sketch/sketch.ino
class ArduinoDebug implements IArduinoDebug {
    // The path where sketches are (usually) stored. This path can also contain some special subdirectories (see FILES below).
    public arduinoExePath: string;

    // The path where sketches are (usually) stored. This path can also contain some special subdirectories (see FILES below).
    public sketchbookPath?: string;

    // The path to use for building. This is where things like the preprocessed .cpp file, compiled .o files and the final .hex file go.
    // If set, this directory should already exist before running the arduino command.
    // arduino --pref build.path=/path/to/sketch/build --verify /path/to/sketch/sketch.ino
    public buildPath?: string;

    constructor(
        ardexepath: string,
        sketpath: string,
        buipath: string,
    ) {
        this.arduinoExePath = ardexepath;
        this.sketchbookPath = sketpath;
        this.buildPath = buipath;
    }

    // return ExitStatus or output
    Build(inoFilePath: string): Thenable<Array<string>> {
        return new Promise((resolve) => { resolve("not implemented"); });
    }

    // return ExitStatus or output
    Upload(inoFilePath: string): Thenable<Array<string>> {
        return new Promise((resolve) => { resolve("not implemented"); });
    }

    // return ExitStatus or output
    GetPreference(pref: string): Thenable<Array<any>> {
        return new Promise((resolve) => { resolve("not implemented"); });
    }

    InstallBoard(board: string): Thenable<Array<string>> {
        return new Promise((resolve) => { resolve("not implemented"); });
    }

    InstallLibrary(library: string): Thenable<Array<string>> {
        return new Promise((resolve) => { resolve("not implemented"); });
    }

    Monitor(): Thenable<Array<string>> {
        return new Promise((resolve) => { resolve("not implemented"); });
    }

    Debug(): Thenable<Array<string>> {
        return new Promise((resolve) => { resolve("not implemented"); });
    }

}

