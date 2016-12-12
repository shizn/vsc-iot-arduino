//
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { ArduinoDebug } from '../../src/lib/arduinodebug/arduinodebug';

// Defines a Mocha test suite to group tests of similar kind together
suite("ArdDbg", () => {
    var idbg: ArduinoDebug = new ArduinoDebug("ardexe_path", "ino_path", "bui_path");
    // Defines a Mocha unit test
    test("Build", () => {
        let r = idbg.Build("ardexe_path").then((ret) => {
            assert.equal("not implemented", ret);
        });
    });
});