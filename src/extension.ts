'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { TreeNode } from './treemodel/treedef';
import { SampleNodeProvider } from './nodeprovider/nodeproviderdef';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "vsc-iot-arduino" is now active!');
  let path = "C:\\Work\\Projects\\vscodeext\\vsc-iot-arduino\\test\\tree.json";

  vscode.window.registerTreeExplorerNodeProvider('sampleTree', new SampleNodeProvider(path));
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