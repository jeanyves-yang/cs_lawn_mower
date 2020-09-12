/**
 * An enum that specifies the orientation of the lawn mower. It can be any of the 4 cardinal directions.
 */
export enum Orientation {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}

/**
 * An enum that specifies the actions the lawn mower can perform.
 */
export enum Action {
  Left = "L",
  Right = "R",
  Front = "F",
}

/*
 * Function that checks if a given position (tuple of two numbers) is within the lawn dimensions.
 */
function isPositionValid(
  position: [number, number],
  lawnDimensions: [number, number]
): boolean {
  if (
    position[0] < lawnDimensions[0] &&
    position[1] < lawnDimensions[1] &&
    position[0] >= 0 &&
    position[1] >= 0
  ) {
    return true;
  }
  return false;
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

  perform(action: Action, lawnDimensions: [number, number]) {
    switch (action) {
      // To improve somehow in readability ... not use a string in the enum and just -1 or + 1 ?
      case Action.Left:
        if (this.orientation == Orientation.North) {
          this.orientation = Orientation.West;
        } else if (this.orientation == Orientation.East) {
          this.orientation = Orientation.North;
        } else if (this.orientation == Orientation.South) {
          this.orientation = Orientation.East;
        } else if (this.orientation == Orientation.West) {
          this.orientation = Orientation.South;
        }
        break;

      case Action.Right:
        if (this.orientation == Orientation.North) {
          this.orientation = Orientation.East;
        } else if (this.orientation == Orientation.East) {
          this.orientation = Orientation.South;
        } else if (this.orientation == Orientation.South) {
          this.orientation = Orientation.West;
        } else if (this.orientation == Orientation.West) {
          this.orientation = Orientation.North;
        }
        break;

      case Action.Front:
        let newPosition: [number, number] = { ...this.position };
        if (this.orientation == Orientation.North) {
          newPosition[1] += 1;
        } else if (this.orientation == Orientation.East) {
          newPosition[0] += 1;
        } else if (this.orientation == Orientation.South) {
          newPosition[1] -= 1;
        } else if (this.orientation == Orientation.West) {
          newPosition[0] -= 1;
        }
        if (isPositionValid(newPosition, lawnDimensions)) {
          this.position = newPosition;
        }
        break;

      default:
        throw new Error("First argument of perform should be an enum Action");
    }
  }
}
