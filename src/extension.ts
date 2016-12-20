'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as cp from 'child_process';

import { TreeNode } from './treemodel/treedef';
import { SampleNodeProvider } from './nodeprovider/nodeproviderdef';

var deviceDiscoveryBarItem;

var demoConfig = {
  additionalBoardsManagerURLs:[
    'https://adafruit.github.io/arduino-board-index/package_adafruit_index.json'
  ],
  boardsManager:[
    {
      name:'Arduino SAMD Boards', 
      version:'1.6.2'
    }
  ],
  com: 'COM5',
  platform: 'Huzzah Feather M0'
}

var channel;

function localExecCmd(cmd, args, verbose, cb) {
  try {
    var cp = require('child_process').spawn(cmd, args);

    if (verbose) {
      if (channel == null)
        channel = vscode.window.createOutputChannel("arduino result");
      channel.show(false);
      channel.appendLine('-------------------------------------------------');
    }

    var stdout = '';
    cp.stdout.on('data', function (data) {
      if (verbose) channel.append(String(data));
      stdout += String(data);
    });

    var stderr = '';
    cp.stderr.on('data', function (data) {
      if (verbose) channel.append(String(data));
      stderr += String(data);
    });

    cp.on('close', function (code) {
      if (cb) {
        if (0 == code) {
          cb();
        } else {
          var message = `External command failed\nFailed command: ${cmd}\n` +
            (stdout ? `stdout: ${stdout}` : '') +
            (stderr ? `stderr: ${stderr}` : '');
          var e = new Error(message);
          e.stack = e.message;
          cb(e);
        }
      }
    });
  } catch (e) {
    e.stack = "ERROR: " + e;
    if (cb) cb(e);
  }
}

function demoGen(com: string, plat: string)
{
  if (vscode.workspace.rootPath == null)
  {
    vscode.window.showErrorMessage("Not in a workplace");
    return;
  }

  var path = vscode.workspace.rootPath;
  var ws = fs.createWriteStream(path + '/config.json');
  ws.write(JSON.stringify(demoConfig, null, 2));
  ws.end();

  if (!fs.existsSync(path + '/main'))
    fs.mkdirSync(path + '/main');
  var ws = fs.createWriteStream(path + '/main/main.ino');
  ws.write("void setup()\n");
  ws.write("{\n");
  ws.write("  // put your setup code here, to run once:\n\n")
  ws.write("}\n");
  ws.write("void loop()\n");
  ws.write("{\n");
  ws.write("  // put your main code here, to run repeatedly:\n\n")
  ws.write("}\n");
  ws.end();

}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vsc-iot-arduino" is now active!');

  // for DeviceDiscovery
  let deviceDiscoveryCmd = vscode.commands.registerCommand('extension.devdiscovery',() =>{
      vscode.window.showQuickPick(['Huzzah Feather M0 : COM5', 'Create a new project without device']).then(
        val => {
          deviceDiscoveryBarItem.text = "Device: " + val;
          demoGen('COM5', 'Huzzah Feather M0');
        }
      );
  })
  context.subscriptions.push(deviceDiscoveryCmd);

  deviceDiscoveryBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 0);
  deviceDiscoveryBarItem.text = "Device Discovery";
  deviceDiscoveryBarItem.command = 'extension.devdiscovery';
  deviceDiscoveryBarItem.show();

  // for arduino verify
  let verifyCmd = vscode.commands.registerCommand('extension.arduinoVerify',() =>{
      localExecCmd('c:/Program\ Files\ (x86)/Arduino/arduino_debug.exe', ['--verify', vscode.workspace.rootPath + '/main/main.ino', '-v'], true, () => { return; });
  })
  context.subscriptions.push(deviceDiscoveryCmd);

  let uploadCmd = vscode.commands.registerCommand('extension.arduinoUpload',() =>{
      var config = require(vscode.workspace.rootPath + '/config.json')
      localExecCmd('c:/Program\ Files\ (x86)/Arduino/arduino_debug.exe', ['--upload', vscode.workspace.rootPath + '/main/main.ino', '-v', '--board', 'adafruit:samd:adafruit_feather_m0', '--port', config.com], true, () => { return; });
  })
  context.subscriptions.push(uploadCmd);

  vscode.window.registerTreeExplorerNodeProvider('sampleTree', new SampleNodeProvider());
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.dosth', (node: TreeNode) => {
    //if (node.kind === 'leaf') {
    //vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${node.moduleName}`));
    vscode.window.showQuickPick(['Create Device', 'Delete Device', 'Ping Device', 'Enable/Disable Device'])
      .then(choice => {
        var myOutputChannel = vscode.window.createOutputChannel('IoT Explorer');
        myOutputChannel.show();

        switch (choice) {
          case 'Create Device':
            vscode.window.showInputBox({ prompt: 'Device ID' })
              .then(id => {
                myOutputChannel.appendLine('Sign in to Azure IoT Hub...');
                myOutputChannel.appendLine("You need to open the page https://aka.ms/devicelogin and enter the code GWQ5RG3BB to authenticate.");
                myOutputChannel.appendLine('Succeed!');
                myOutputChannel.appendLine('Creating the device...');
                myOutputChannel.appendLine('{');
                myOutputChannel.appendLine('  "authentication": {');
                myOutputChannel.appendLine('    "symmetricKey": {');
                myOutputChannel.appendLine('      "primaryKey": "P136I2oWo3XOLD6RrjqcxPsXnUX82cmYJ60wtkX+TkY=",');
                myOutputChannel.appendLine('      "secondaryKey": "96/YpPZqCN90dWD5TtxFvijrMjANIleUZ9D1D1McPHQ="');
                myOutputChannel.appendLine('    },');
                myOutputChannel.appendLine('    "x509Thumbprint": null');
                myOutputChannel.appendLine('  },');
                myOutputChannel.appendLine('  "cloudToDeviceMessageCount": 0,');
                myOutputChannel.appendLine('  "connectionState": "Disconnected",');
                myOutputChannel.appendLine('  "connectionStateUpdatedTime": "0001-01-01T00:00:00",');
                myOutputChannel.appendLine('  "deviceId": "testdev",');
                myOutputChannel.appendLine('  "generationId": "636167767056934431",');
                myOutputChannel.appendLine('  "lastActivityTime": "0001-01-01T00:00:00",');
                myOutputChannel.appendLine('  "statusUpdatedTime": "0001-01-01T00:00:00"');
                myOutputChannel.appendLine('}');
                myOutputChannel.appendLine('Device is created!');
              });
            break;
          case 'Delete Device':
            myOutputChannel.appendLine('Authenticating to Azure IoT Hub...');
            myOutputChannel.appendLine('Device is deleted!');
            break;
          case 'Ping Device':
            break;
          case 'Enable/Disable Device':
            break;
        }
      });
    //}
  });
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {
}