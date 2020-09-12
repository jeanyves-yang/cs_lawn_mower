import {LawnMower} from './LawnMower'


let position: [string, string];
position = ["2", "2"];
let lawnMower = new LawnMower(position, orientation);

console.log(lawnMower.position[0], " ", lawnMower.position[1]);
