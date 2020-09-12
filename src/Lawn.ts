import { LawnMower, Orientation } from "./LawnMower";

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
    position[0] <= lawnDimensions[0] &&
    position[1] <= lawnDimensions[1] &&
    position[0] >= 0 &&
    position[1] >= 0
  ) {
    return true;
  }
  return false;
}

/**
 * A class that represents a lawn, which is a 2d rectangular grid.
 * It is defined by one point, the upper right corner.
 * Bottom left corner is at (0,0).
 * It is responsible of managing the lawn mowers (moving them).
 *  They are moved according to two type of actions:
 * - rotate left or right, which updates their orientation accordingly,
 * - move front, which updates their position accordingly.
 */
export class Lawn {
  public dimensions: [number, number];
  public mowers: LawnMower[];

  /*
   * Default constructor, initialized by the upper right corner position.
   */
  constructor(public corner: [number, number]) {
    this.dimensions = corner;
    this.mowers = [];

  }

  /*
   * Method to add a lawn mower in the lawn.
   * Needs to check that position of the lawn mower respects the lawn dimensions.
   */
  public addMower(mower: LawnMower) {
    if (isPositionValid(mower.position, this.dimensions)) {
      this.mowers.push(mower);
    } else {
      throw new Error(
        "Lawn mower position needs to be within the lawn dimensions. \
       Trying to add a lawn mower at (" +
          mower.position[0] +
          "," +
          mower.position[1] +
          "), \
        but lawn dimensions are: (" +
          this.dimensions[0] +
          "," +
          this.dimensions[1] +
          ")."
      );
    }
  }

  moveMower(index: number, action: Action) {
    // Check that it is trying to access an existing mower.
    let mower: LawnMower;
    if (index < this.mowers.length) {
      mower = this.mowers[index];
    } else {
      throw new Error(
        "Trying to move mower " +
          index +
          " but this lawn only has " +
          this.mowers.length +
          " mowers"
      );
    }

    switch (action) {
      // To improve somehow in readability ... not use a string in the enum and just -1 or + 1 ?
      case Action.Left:
        if (mower.orientation === Orientation.North) {
            mower.orientation = Orientation.West;
        } else if (mower.orientation === Orientation.East) {
            mower.orientation = Orientation.North;
        } else if (mower.orientation === Orientation.South) {
            mower.orientation = Orientation.East;
        } else if (mower.orientation === Orientation.West) {
            mower.orientation = Orientation.South;
        }
        break;

      case Action.Right:
        if (mower.orientation === Orientation.North) {
            mower.orientation = Orientation.East;
        } else if (mower.orientation === Orientation.East) {
            mower.orientation = Orientation.South;
        } else if (mower.orientation === Orientation.South) {
            mower.orientation = Orientation.West;
        } else if (mower.orientation === Orientation.West) {
            mower.orientation = Orientation.North;
        }
        break;

      case Action.Front:
        const newPosition: [number, number] = { ...mower.position };
        if (mower.orientation === Orientation.North) {
          newPosition[1] += 1;
        } else if (mower.orientation === Orientation.East) {
          newPosition[0] += 1;
        } else if (mower.orientation === Orientation.South) {
          newPosition[1] -= 1;
        } else if (mower.orientation === Orientation.West) {
          newPosition[0] -= 1;
        }
        if (isPositionValid(newPosition, this.dimensions)) {
            mower.position = newPosition;
        }
        break;

      default:
        throw new Error("Second argument of moveMower should be an enum Action");
    }
  }
}
