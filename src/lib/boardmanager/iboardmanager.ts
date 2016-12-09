/*
AzureIoTHub - Azure IoT Hub library for Arduino
Currently supported hardware:

Atmel SAMD Based boards
Arduino/Genuino MKR1000
Arduino/Genuino Zero and WiFi Shield 101
Adafruit Feather M0

ESP8266 based boards with esp8266/arduino
SparkFun Thing
Adafruit Feather Huzzah
*/


export interface IBoardManager {
    /**
     * Resolve the children of `node`.
     *
     * @param node The node from which the provider resolves children.
     * @return Children of `node`.
     */
    // arduino --board arduino:avr:nano:cpu=atmega168 --port /dev/ttyACM0 --upload /path/to/sketch/sketch.ino
    Build(inoPath: string): Array<string> | Thenable<Array<string>>;

    Upload(inoPath: string): Array<string> | Thenable<Array<string>>;

    GetPreference(pref: string): Array<string> | Thenable<Array<string>>;

    InstallBoard(board: string): Array<string> | Thenable<Array<string>>;

    InstallLibrary(library: string): Array<string> | Thenable<Array<string>>;

    Monitor(): Array<string> | Thenable<Array<string>>;

    Debug(): Array<string> | Thenable<Array<string>>;
}

