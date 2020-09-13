/**
 * An object that specifies the orientation of the lawn mower. It can be any of the 4 cardinal directions.
 */
export const ori = { N: "N", E: "E", S: "S", W: "W" };
export type Orientation = keyof typeof ori;

export function isOrientation(x: string): x is Orientation {
  return ori.hasOwnProperty(x);
}

/**
 * A class that represents a lawn mower. It is defined by a position and an orientation.
 * It can perform two actions:
 * - rotate left or right, which updates its orientation accordingly,
 * - move front, which updates its position accordingly.
 */
export class LawnMower {
  public position: [number, number];
  public orientation: Orientation;

  /*
   * Default constructor, initialized by a position and an orientation.
   */
  constructor(public pos: [number, number], public dir: Orientation) {
    this.position = pos;
    this.orientation = dir;
  }
}
