import _ from "lodash";
import getGeneratorOfTransferInstructions from "./getNextPlateInstructions";
import {
  DEST_PLATE_KEY,
  DEST_WELL_KEY,
  SRC_PLATE_KEY,
  SRC_WELL_KEY,
  VOL_KEY,
} from "./keys/InstructionKeys";
import { PLATE_ID_KEY, WELL_ID_KEY } from "./keys/LayoutKeys";

import {
  KeySetType,
  PlateIdConfigType,
  TransferInstructionsRowType,
  AnyStringObjectType,
  PlateMapRowType,
  ClashStrategyType,
  StrategyType,
} from "./mainTypes";
import { keysConfig } from "./__test__/configs";

class liquidDataHander {
  inputInstructions: AnyStringObjectType[] = [];
  inputLayouts: AnyStringObjectType[][] = []; //each plate in its own
  instructions: TransferInstructionsRowType[] = [];
  layouts: PlateMapRowType[][] = [];
  plateInfo: PlateIdConfigType[];
  keySet: KeySetType;
  clashStrategy: StrategyType;
  clashColumnStrategies: ClashStrategyType[];
  finalDestPlates: PlateMapRowType[][] = [];
  constructor(
    inputLayouts: AnyStringObjectType[][],
    inputInstructions: AnyStringObjectType[],
    platesInfo: PlateIdConfigType[],
    keySet: KeySetType,
    clashColumnStrategies: ClashStrategyType[],
    finalDestPlates: PlateMapRowType[][]
  ) {
    this.inputLayouts = inputLayouts;
    this.inputInstructions = inputInstructions;
    this.plateInfo = platesInfo;
    this.keySet = keySet;
    this.layouts = [];
    this.instructions = [];
    this.clashStrategy = "suffix";
    this.clashColumnStrategies = clashColumnStrategies; // not implemented yet
    this.finalDestPlates = [];
    this.setup();
  }

  setup() {
    this.createLayouts();
    this.createInstructions();
    // this.lookForClashes()

    // let chunk = true;
    //while chunk
    //assign finalDestinationPlate
    //get next chunk

    //
  }

  findClashes() {}

  createLayouts() {
    var inputLayoutsCopy = _.cloneDeep(this.inputLayouts);
    inputLayoutsCopy.forEach((layout, layoutIndex) => {
      this.layouts.push([]);
      layout.forEach((wellRow) => {
        //ensure well data has correct Plate and Well keys
        let plateID = wellRow[this.keySet["plateIdKey"]];
        let wellId = wellRow[this.keySet["wellIdKey"]];
        delete wellRow[this.keySet["plateIdKey"]];
        delete wellRow[this.keySet["wellIdKey"]];
        this.layouts[layoutIndex].push({
          ...wellRow,
          [PLATE_ID_KEY]: plateID,
          [WELL_ID_KEY]: wellId,
        });
      });
    });
  }

  createInstructions() {
    var inputInstructionsCopy = _.cloneDeep(this.inputInstructions);
    let newRow;
    inputInstructionsCopy.forEach((inst) => {
      newRow = {
        [SRC_PLATE_KEY]: inst[keysConfig["sourePlateKey"]],
        [SRC_WELL_KEY]: inst[keysConfig["sourceWellKey"]],
        [VOL_KEY]: +inst[keysConfig["volumeKey"]],
        [DEST_PLATE_KEY]: inst[keysConfig["destPlateKey"]],
        [DEST_WELL_KEY]: inst[keysConfig["destWellKey"]],
      };
      this.instructions.push(newRow);
    });
  }
  addClashColumnStrategy() {}

  updateClashColumnStrategy() {}

  separatePlateLayouts() {}

  getNextInstructionChunk() {}
}

export default liquidDataHander;
