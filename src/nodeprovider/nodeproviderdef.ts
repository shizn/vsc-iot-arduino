'use strict';

import * as vscode from 'vscode';
import { TreeExplorerNodeProvider } from 'vscode';

import * as fs from 'fs';
import * as path from 'path';

import { TreeNode } from "../treemodel/treedef";
import { Root } from "../treemodel/treedef";
import { Node } from "../treemodel/treedef";
import { Leaf } from "../treemodel/treedef";


export class SampleNodeProvider implements TreeExplorerNodeProvider<TreeNode> {
  constructor() {
  }

  getLabel(node: TreeNode): string {
    return node.keyName === 'undefined' ? '' : node.keyName;
  }

  /**
   * Leaf is unexpandable.
   */
  getHasChildren(node: TreeNode): boolean {
    return node.kind !== 'leaf';
  }

  /**
   * Invoke `extension.dosth` command when a Leaf node is clicked.
   */
  getClickCommand(node: TreeNode): string {
    return node.kind === 'leaf' ? 'extension.dosth' : null;
  }

  provideRootNode(): TreeNode {
    return new Root("");
  }

  //resolveChildren called when expanding the node
  resolveChildren(node: TreeNode): Thenable<TreeNode[]> {
    return new Promise((resolve) => {
      // root or node
      switch (node.kind) {
        case 'root':
          resolve(this.resolveSub(node.keyName));
          break;
        case 'node':
          resolve(this.resolveHub(node.keyName));
          break;
        case 'leaf':
          resolve([]);
          break;
      }
    });
  }

  // node
  private resolveHub(key: string): TreeNode[] {
    if(key.includes("Hub"))
    {
      // children of Hub
      return [new Leaf("myIoTDev1", true), new Leaf("myIoTDev2", true), new Leaf("myIoTDev3", true), new Leaf("myIoTDev4", true)];
    } else if (key.includes("Disabled"))
    {
      // disabled devices
      return [new Leaf("myDisabledIoTDev1", false), new Leaf("myDisabledIoTDev2", false)];
    } else {
      // children of sub
      return [new Node("myIoTHub1"), new Node("myIoTHub2"), new Node("myIoTHub3")];
    }
  }
  // root
  private resolveSub(key: string): TreeNode[] {
    if(key.includes("IoT Explorer")) {
      return [new Node("myAZSubscription1"), new Node("myAZSubscription2"), new Node("Disabled Devices")];
    } else {
      return [new Root("IoT Explorer")];
    }
    }
}