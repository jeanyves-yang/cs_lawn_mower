import {Action, Lawn} from '../src/Lawn';

import * as mocha from 'mocha';
import * as chai from 'chai';
import { LawnMower, Orientation } from '../src/LawnMower';

const expect = chai.expect;
mocha.describe('Lawn class', () => {

  it('shall be able to add a mower in any position within its dimension' , () => {
    // Init a lawn mower
    let position: [number, number] = [2, 2];
    let orientation: Orientation = Orientation.North;
    let goodLawnMower = new LawnMower(position, orientation);

    // Init a lawn
    let corner: [number, number] = [5, 5];
    let lawn: Lawn = new Lawn(corner);

    lawn.addMower(goodLawnMower);
    // Tests that a mower with position inside the lawn can be added. 
    expect(lawn.mowers.length).to.eql(1);

    let badPosition: [number, number] = [6, 6];
    let badLawnMower = new LawnMower(badPosition, orientation);

    // Tests that a mower with position outside the lawn cannot be added and an exception is returned.
    expect(lawn.addMower(badLawnMower)).to.throw();
  });

  it('shall be able to rotate a mower using L or R' , () => {
    // Init a lawn mower
    let position: [number, number] = [2, 2];
    let orientation: Orientation = Orientation.North;
    let goodLawnMower = new LawnMower(position, orientation);

    // Init a lawn
    let corner: [number, number] = [5, 5];
    let lawn: Lawn = new Lawn(corner);

    lawn.addMower(goodLawnMower);

    let action: Action = Action.Left;
    lawn.moveMower(0, action);

    // Tests that a mower with position outside the lawn cannot be added and an exception is returned.
    expect(lawn.mowers[0].orientation).to.eql(Orientation.West);
  });
});
