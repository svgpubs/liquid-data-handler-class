import liquidDataHandler from "../liquidDataHandler";
import instructionsArray from "./instructions";
import {
  destPlateMap24,
  srcPlateMap12,
  srcPlateMap96,
  srcResevoir1,
  srcPlateMap6,
} from "./platelayouts";
import { keysConfig, platesConfig } from "./configs";
import { AnyStringObjectType } from "../mainTypes";

let layouts: AnyStringObjectType[][] = [
  destPlateMap24,
  srcPlateMap12,
  srcPlateMap96,
  srcResevoir1,
  srcPlateMap6,
];

let instructions: AnyStringObjectType[] = instructionsArray;

//now run the whole process
// let resq  = liquidDataHandler()
let handleLiquidData = new liquidDataHandler(
  layouts,
  instructions,
  platesConfig,
  keysConfig
);
