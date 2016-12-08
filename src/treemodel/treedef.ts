export type TreeNode = Root // Root node
  | Node // Non-Root Non-Leaf
  | Leaf // Leaf node
  ;
//export interface NodeKey {
//  key: string
//}
export class Root {
  kind: 'root' = 'root';

  constructor(
    public keyName: string
  ) {
  }
}

export class Node {
  kind: 'node' = 'node';

  constructor(
    public keyName: string
  ) {
  }
}

export class Leaf {
  kind: 'leaf' = 'leaf';

  constructor(
    public keyName: string,
    public enabled: boolean
  ) {
  }
}