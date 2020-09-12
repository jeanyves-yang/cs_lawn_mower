import {LawnMower, Orientation} from './LawnMower'
import {Action, Lawn} from './Lawn'

let position: [number, number] = [2, 2];
let orientation: Orientation = Orientation.North;
let goodLawnMower = new LawnMower(position, orientation);

// Init a lawn
let corner: [number, number] = [5, 5];
let lawn: Lawn = new Lawn(corner);

lawn.addMower(goodLawnMower);

console.log(lawn.mowers.length);

let badPosition: [number, number] = [6, 6];
let badLawnMower = new LawnMower(badPosition, orientation);

console.log(lawn.mowers.length);

let action: Action = Action.Left;
lawn.moveMower(0, action);

console.log(lawn.mowers[0].orientation);