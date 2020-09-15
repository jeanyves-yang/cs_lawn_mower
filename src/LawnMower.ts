/**
 * A type that specifies the orientation of the lawn mower. It can be any of the 4 cardinal directions.
 */
const ori = { N: "N", E: "E", S: "S", W: "W" };
export type Orientation = keyof typeof ori;

export function isOrientation(x: string): x is Orientation {
  return ori.hasOwnProperty(x);
}

/**
 * A type that specifies 2D coordinates in the lawn.
 */
export type Coord = [number, number];

/**
 * A class that represents a lawn mower. It is defined by a position and an orientation.
 */
export class LawnMower {
  public position: Coord;
  public orientation: Orientation;

  /*
   * Default constructor, initialized by a position and an orientation.
   */
  constructor(public pos: Coord, public dir: Orientation) {
    this.position = pos;
    this.orientation = dir;
  }
}
