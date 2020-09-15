import * as fs from "fs";
import * as rd from "readline";
import { once } from "events";

import { isOrientation, LawnMower, Orientation, Coord } from "./LawnMower";
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
    const reader = rd.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity,
    });

    let lineNumber = 1;

    return new Promise((resolve, reject) => {
      // Sequentially read the file.
      reader.on("line", (l: string) => {
        // First line of the file: sets the corner of the grid
        if (lineNumber === 1) {
          const tokens = l.split(" ");
          // Check that parsed position is valid.
          if (
            isNaN(parseInt(tokens[0], 10)) ||
            isNaN(parseInt(tokens[1], 10))
          ) {
            reject(
              new Error(
                "Position read at line " +
                  lineNumber +
                  " bad format. The line should be [int] [int]."
              )
            );
          }

          const corner: Coord = [
            parseInt(tokens[0], 10),
            parseInt(tokens[1], 10),
          ];
          this.lawn.dimensions = corner;
        } else {
          // Can be an issue with big numbers.
          // Normally: odd line means a new lawn mower initialization, even line means an action.
          if (lineNumber % 2 === 1) {
            // Manages initialization of new lawn mower.
            resolve(
              this.parseOddLines(l, lineNumber).catch((error) => reject(error))
            );
          } else {
            // Manages movement of the current lanw mower.
            resolve(
              this.parseEvenLines(l, lineNumber).catch((error) => reject(error))
            );
          }
        }
        lineNumber++;
      });
      resolve(once(reader, "close").catch((error) => reject(error)));
    });
  }

  /*
   * Method to parse even lines.
   * Even lines define a new lawn mower.
   */
  async parseEvenLines(line: string, index: number) {
    return new Promise((resolve, reject) => {
      // Should be parsed as follow: x coord - y coord - orientation, delimited by space.
      const tokens = line.split(" ");

      // Check that parsed position is valid.
      if (isNaN(parseInt(tokens[0], 10)) || isNaN(parseInt(tokens[1], 10))) {
        reject(
          new Error(
            "Position read at line " +
              index +
              " bad format. The line should be [int] [int] [N|E|S|W]."
          )
        );
      }

      const position: Coord = [
        parseInt(tokens[0], 10),
        parseInt(tokens[1], 10),
      ];

      // Check that parsed arguments are valid.
      if (!isOrientation(tokens[2])) {
        reject(
          new Error(
            "Orientation read at line " +
              index +
              " bad format. The line should be [int] [int] [N|E|S|W]."
          )
        );
      } else {
        const orientation: Orientation = tokens[2];
        // Initialize new lawn mower.
        const goodLawnMower = new LawnMower(position, orientation);

        // Add it to the lawn.
        this.lawn.addMower(goodLawnMower);
      }
    });
  }

  /*
   * Function to parse odd lines.
   * Odd lines define the movement of a lawn mower.
   */
  async parseOddLines(line: string, index: number) {
    return new Promise((resolve, reject) => {
      // Should be parsed as follow: succession of L|F|R, with no delimiter.
      const tokens = line.split("");

      tokens.forEach((token) => {
        // Check that parsed arguments are valid.
        if (!isAction(token)) {
          reject(
            new Error(
              "Commands list read at line " +
                index +
                " bad format. The line should be only composed of L, R or F."
            )
          );
        } else {
          const action: Action = token;

          // There are two lines for each mower, after excluding line 0,
          // we can deduce mower index based on that.
          const mowerIndex: number = (index - 1) / 2 - 1;
          this.lawn.moveMower(mowerIndex, action);
          resolve();
        }
      });
    });
  }
}
