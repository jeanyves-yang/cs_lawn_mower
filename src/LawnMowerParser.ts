import * as fs from "fs";
import * as rd from "readline";
import { once } from "events";


import { isOrientation, LawnMower, Orientation } from "./LawnMower";
import { Action, isAction, Lawn } from "./Lawn";

/**
 * A class that represents parser for lawn mowers.
 */
export class LawnMowerParser {
  public lawn: Lawn;

  /*
   * Default constructor, initialized by the upper right corner position.
   */
  constructor(public obj: Lawn) {
    this.lawn = obj;
  }

  /*
   * Method to read command line interface.
   * It perform actions on the lawn based on the commands.
   */
  public async interpretCommandFile(filePath: string) {
    let reader = rd.createInterface({input: fs.createReadStream(filePath), crlfDelay: Infinity}
    );

    let lineNumber = 0;
    // Sequentially read the file.
    reader.on("line", (l: string) => {
      // First line of the file: sets the corner of the grid
      if (lineNumber === 0) {
        let tokens = l.split(" ");
        let corner: [number, number] = [
          parseInt(tokens[0]),
          parseInt(tokens[1]),
        ];
        this.lawn.dimensions = corner;
      } else {
        // Can be an issue with big numbers.
        // Normally: odd line means a new lawn mower initialization, even line means an action.
          if (lineNumber % 2 === 1) {
            // Manages initialization of new lawn mower.
            this.parseOddLines(l, lineNumber);
          } else {
            // Manages movement of the current lanw mower.
            this.parseEvenLines(l, lineNumber);
          }
      }
      lineNumber++;
    });

    await once(reader, 'close');
  }

  /*
   * Method to parse odd lines.
   * Odd lines define a new lawn mower.
   */
  parseOddLines(line: string, index: number) {
    // Should be parsed as follow: x coord - y coord - orientation, delimited by space.
    let tokens = line.split(" ");

    // Check that parsed position is valid.
    if (isNaN(parseInt(tokens[0])) || isNaN(parseInt(tokens[1]))) {
      throw new Error(
        "Position read at line " +
          index +
          " bad format. The line should be [int] [int] [N|E|S|W]."
      );
    }

    let position: [number, number] = [parseInt(tokens[0]), parseInt(tokens[1])];

    // Check that parsed arguments are valid.
    if (!isOrientation(tokens[2])) {
      throw new Error(
        "Orientation read at line " +
          index +
          " bad format. The line should be [int] [int] [N|E|S|W]."
      );
    }

    let orientation: Orientation = tokens[2];

    // Initialize new lawn mower.
    let goodLawnMower = new LawnMower(position, orientation);

    // Add it to the lawn.
    this.lawn.addMower(goodLawnMower);
  }

  /*
   * Function to parse even lines.
   * Odd lines define the movement of a lawn mower.
   */
  parseEvenLines(line: string, index: number) {
    // Should be parsed as follow: succession of L|F|R, with no delimiter.
    let tokens = line.split("");

    tokens.forEach((token) => {
      // Check that parsed arguments are valid.
      if (!isAction(token)) {
        throw new Error(
          "Commands list read at line " +
            index +
            "bad format. The line should be only composed of L, R or F."
        );
      }
      let action: Action = token;

      // There are two lines for each mower, after excluding line 0,
      // we can deduce mower index based on that.
      let mowerIndex: number = index / 2 - 1; 
      this.lawn.moveMower(mowerIndex, action);
    });
  }
}
