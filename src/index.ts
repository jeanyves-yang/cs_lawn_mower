import * as fs from "fs";

import { Lawn } from "./Lawn";
import { LawnMowerParser } from "./LawnMowerParser";

// Parse the command file
import * as data from "../config.json";

(async () => {
  // Init the grid

  let corner: [number, number] = [0, 0];
  let lawn: Lawn = new Lawn(corner);
  // Init the parser and interpret the commands read.
  let lawnParser: LawnMowerParser = new LawnMowerParser(lawn);
  try {
  await lawnParser.interpretCommandFile(data.inputPath);
  console.log(lawnParser);
  } catch (error) 
{
  // Simplistic way of handling errors, it hides the exception.
  console.log("Error: Parsing of the command file failed: " + error);
}

  console.log("Commands file parsed.");

  // Read the final positions of the mower and output them.
  let outputString: string = "";
  console.log(lawnParser.lawn.mowers.length);

  lawnParser.lawn.mowers.forEach((mower) => {
    outputString +=
      mower.position[0].toString() +
      " " +
      mower.position[1].toString() +
      " " +
      mower.orientation.toString() +
      "\n";
  });

  fs.writeFile(data.outputPath, outputString, (error) => {
    // throws an error, you could also catch it here
    if (error) {
      console.log("Error: writing output file failed: " + error);
    } else {
      // success case, the file was saved
      console.log("Output file written.");
    }
  });
})();
