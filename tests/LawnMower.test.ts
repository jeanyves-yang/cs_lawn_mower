import * as mocha from "mocha";
import * as chai from "chai";
import { Lawn } from "../src/Lawn";
import { LawnMowerParser } from "../src/LawnMowerParser";
import { Orientation, Coord } from "../src/LawnMower";

let chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const expect = chai.expect;

mocha.describe("LawnMower class", () => {
  it("shall be able to parse a regular input file", async () => {
    let path = "tests/goodInputCommands.txt";
    let corner: Coord = [0, 0];
    let lawn: Lawn = new Lawn(corner);
    // Init the parser and interpret the commands read.
    let lawnParser: LawnMowerParser = new LawnMowerParser(lawn);
    await lawnParser.interpretCommandFile(path);

    // Tests that the lawn parser's lawn has (5,5) dimensions.
    let expectedDimensions: Coord = [5, 5];
    expect(lawnParser.lawn.dimensions).to.eql(expectedDimensions);

    // Tests that the lawn parser's lawn has 2 mowers.
    let expectedNbMowers = 2;
    expect(lawnParser.lawn.mowers.length).to.eql(expectedNbMowers);

    // Tests that the lawn parser's lawn mowers are at (1, 3, N) and (5, 1, E).
    let expectedPos: Coord = [1, 3];
    expect(lawnParser.lawn.mowers[0].position).to.eql(expectedPos);
    let expectedOri: Orientation = "N";
    expect(lawnParser.lawn.mowers[0].orientation).to.eql(expectedOri);

    expectedPos = [5, 1];
    expectedOri = "E";
    expect(lawnParser.lawn.mowers[1].position).to.eql(expectedPos);
    expect(lawnParser.lawn.mowers[1].orientation).to.eql(expectedOri);
  });

  it("shall throw if bad inputs are given for the lawn dimensions", async () => {
    let path = "tests/BadFirstLineInputCommands.txt";
    let corner: Coord = [0, 0];
    let lawn: Lawn = new Lawn(corner);
    // Init the parser and interpret the commands read.
    let lawnParser: LawnMowerParser = new LawnMowerParser(lawn);

    // Expect to throw an error due to the first line.
    try {
        await lawnParser.interpretCommandFile(path);
    } catch(error) {
        expect(error).not.to.be.null;
    }
  });

  it("shall throw if bad inputs are given for a lawn mower movement", async () => {
    let path = "tests/BadOddLineInputCommands.txt";
    let corner: Coord = [0, 0];
    let lawn: Lawn = new Lawn(corner);
    // Init the parser and interpret the commands read.
    let lawnParser: LawnMowerParser = new LawnMowerParser(lawn);

    // Expect to throw an error due to the first line.
    try {
        await lawnParser.interpretCommandFile(path);
    } catch(error) {
        expect(error).not.to.be.null;
    }
  });

  
  it("shall throw if bad inputs are given for a lawn mower initialization", async () => {
    let path = "tests/BadEvenLineInputCommands.txt";
    let corner: Coord = [0, 0];
    let lawn: Lawn = new Lawn(corner);
    // Init the parser and interpret the commands read.
    let lawnParser: LawnMowerParser = new LawnMowerParser(lawn);

    // Expect to throw an error due to the first line.
    try {
        await lawnParser.interpretCommandFile(path);
    } catch(error) {
        expect(error).not.to.be.null;
    }
  });
});
