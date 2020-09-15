import {Action, Lawn} from '../src/Lawn';

import * as mocha from 'mocha';
import * as chai from 'chai';
import { LawnMower, Orientation, Coord } from '../src/LawnMower';

const expect = chai.expect;
mocha.describe('Lawn class', () => {

  it('shall be able to add a mower in any position within its dimension' , () => {
    // Init a lawn mower
    let position: Coord = [2, 2];
    let orientation: Orientation = "N";
    let goodLawnMower = new LawnMower(position, orientation);

    // Init a lawn
    let corner: Coord = [5, 5];
    let lawn: Lawn = new Lawn(corner);

    lawn.addMower(goodLawnMower);
    // Tests that a mower with position inside the lawn can be added. 
    expect(lawn.mowers.length).to.eql(1);

    let badPosition: Coord = [6, 6];
    let badLawnMower = new LawnMower(badPosition, orientation);

    // Tests that a mower with position outside the lawn cannot be added and an exception is returned.
    expect(lawn.addMower.bind(lawn, badLawnMower)).to.throw();
  });

  it('shall be able to rotate a mower using L or R' , () => {
    // Init a lawn mower
    let position: Coord = [2, 2];
    let orientation: Orientation = "N";
    let goodLawnMower = new LawnMower(position, orientation);

    // Init a lawn
    let corner: Coord = [5, 5];
    let lawn: Lawn = new Lawn(corner);

    lawn.addMower(goodLawnMower);

    let action: Action = "L";
    lawn.moveMower(0, action);

    // Tests that the mower orientation has changed.
    expect(lawn.mowers[0].orientation).to.eql("W");

    // Tests that the mower position has not changed.
    expect(lawn.mowers[0].position).to.eql(position);

    // Repeat for an action to the right.
    action = "R";
    lawn.moveMower(0, action);

    // Tests that the mower orientation has changed.
    expect(lawn.mowers[0].orientation).to.eql("N");

    // Tests that the mower position has not changed.
    expect(lawn.mowers[0].position).to.eql(position);
  });

  it('shall be able to move forward a mower using F' , () => {
    // Init a lawn mower
    let position: Coord = [2, 2];
    let orientation: Orientation = "N";
    let goodLawnMower = new LawnMower(position, orientation);

    // Init a lawn
    let corner: Coord = [5, 5];
    let lawn: Lawn = new Lawn(corner);

    lawn.addMower(goodLawnMower);

    let action: Action = "F";
    lawn.moveMower(0, action);

    // Tests that the mower orientation has not changed.
    expect(lawn.mowers[0].orientation).to.eql(orientation);

    // Tests that the mower position has changed.
    let expectedPosition: Coord = [2, 3];
    expect(lawn.mowers[0].position).to.eql(expectedPosition);
  });

  it('shall not be able to move a mower that it does not have' , () => {
    // Init a lawn
    let corner: Coord = [5, 5];
    let lawn: Lawn = new Lawn(corner);

    let action: Action = "F";

    // Tests that an exception is returned when trying to move a non existant mower.
    expect(lawn.moveMower.bind(lawn, 0, action)).to.throw();
  });
});
