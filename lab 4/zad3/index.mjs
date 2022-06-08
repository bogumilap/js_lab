import {Operation} from "./module.mjs";

let arr = process.argv;
let x = parseInt(arr[2]);
let y= parseInt(arr[3]);
const o = new Operation(x, y);
console.log(o.sum());
