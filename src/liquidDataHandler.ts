import _, { chunk, isEmpty } from "lodash";
import { arrayToObject, objectToArray } from "array-object-transformer";
import PlateTransformer from "plate-data-transfer/dist/tsc/main";
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
  SpecificColumnClashesType,
  PlateColumnSuffixObjectType,
} from "./mainTypes";
import { keysConfig } from "./__test__/configs";
import { TransferInstructionsType } from "plate-data-transfer";
import { getPlate } from "well-id-formatter";

class liquidDataHander {
  inputInstructions: AnyStringObjectType[] = [];
  inputLayouts: AnyStringObjectType[][] = []; //each plate in its own
  instructions: TransferInstructionsRowType[] = [];
  layouts: PlateMapRowType[][] = [];
  layoutsSuffix: PlateMapRowType[][] = [];
  plateInfo: PlateIdConfigType[];
  keySet: KeySetType;
  clashStrategy: StrategyType;
  columnSuffixNames: PlateColumnSuffixObjectType;
  clashColumnStrategies: ClashStrategyType[];
  finalDestPlates: PlateMapRowType[][] = [];
  constructor(
    inputLayouts: AnyStringObjectType[][],
    inputInstructions: AnyStringObjectType[],
    platesInfo: PlateIdConfigType[],
    keySet: KeySetType,
    clashColumnStrategies: ClashStrategyType[] = []
  ) {
    this.inputLayouts = inputLayouts;
    this.inputInstructions = inputInstructions;
    this.plateInfo = platesInfo;
    this.keySet = keySet;
    this.layouts = [];
    this.layoutsSuffix = []; //layouts but colnames all have plate suffix
    this.columnSuffixNames = {};
    this.instructions = [];
    this.clashStrategy = "suffix";
    this.clashColumnStrategies = clashColumnStrategies; // not implemented yet
    this.finalDestPlates = [];
    this.setup();
  }

  setup() {
    this.createLayouts();
    this.createInstructions();
    this.assertUniqueSuffixes();
    this.setLayoutSuffix();

  }

  assertUniqueSuffixes() {
    let suffixes = this.plateInfo.map((p) => p.suffix);
    let suffixSet = new Set(...suffixes);
    if (suffixSet.size < suffixes.length) {
      throw "Error: All plates must have a unique suffix.";
    }
  }

  setLayoutSuffix() {
    //create a copy of plate layouts with changed column names to contain plate suffix in all columns
    _.cloneDeep(this.layouts).forEach((layout) => {
      let columnLayout = arrayToObject(layout);
      let suffix = this.plateInfo.filter(
        (plate) => plate.layoutId === columnLayout["Plate"][0]
      )[0].suffix;
      let colnames = Object.keys(columnLayout).map((col) => {
        let col_suff = ["Plate", "Well"].includes(col)
          ? col
          : `${col}_${suffix}`;
        return [col, col_suff];
      });
      //record the columns and column_suffixes
      this.columnSuffixNames[columnLayout["Plate"][0]] = colnames;

      //change the column names to include the suffix
      colnames.forEach((colArr) => {
        columnLayout[colArr[1]] = columnLayout[colArr[0]];
        delete columnLayout[colArr[0]];
      });

      let rowLayout: any = objectToArray(columnLayout);
      if (rowLayout[0]["Plate"] && rowLayout[0]["Well"]) {
        this.layoutsSuffix.push(rowLayout);
      } else {
        throw "Report This Error to www.github.com/svgpubs: Missing Plate and Well : this is a problem with the program. ";
      }
    });
  }

  runLiquidDataHandler() {
    //initiate the recorded clashes
    let recordedClashes: SpecificColumnClashesType[] = [];
    let listOfInstructionChunks: TransferInstructionsRowType[][] = [];
    let plateInstructionChunk = getGeneratorOfTransferInstructions(
      this.instructions
    );
    let stillRunning: boolean = true;
    while (stillRunning) {
      let nextChunk: any = plateInstructionChunk.next();
      if (nextChunk) {
        //get sourceLayout, getDestLayout, chunkInstructions sourcePlateInfo, destPlateInf

        let chunkInstructions : TransferInstructionsRowType[] = nextChunk;
          // let d = new PlateTransformer()

        // let sourceInstructionPlateName = chunkInstructions[0]['Source Plate'];
        // let destinationInstructionPlateName = chunkInstructions[0]['Destination Plate'];
        // // let sourceLayout = this.layoutsSuffix.filter(layout => layout[0]['Plate'] === sourcePlateName);
        // // let destinationLayout = this.layoutsSuffix.filter(layout => layout[0]['Plate'] === sourcePlateName);

      //   if (sourceLayout.length === 0) {
      //     //this is an empty plate, create a new one.
      //   }
      //   if (destinationPlateName)
      // } else {
      //   stillRunning = false;
      // }
    }
  }

  get columnClashes() {
    //runLiquidDataHandler and records clashes
    return this.clashColumnStrategies;
  }

  set columnClashStragtegies(strats: ClashStrategyType[]) {
    this.clashColumnStrategies = strats;
  }

  addMissingPlateLayouts() {
    this.plateInfo.forEach(plate => {
      if (plate.isEmpty && plate.layoutId === "") {
        let newPlate = getPlate(plate.size).map(wellrow => {
          return {Plate: plate.instructionId, Well: wellrow['padded']}
        })
        plate.layoutId = plate.instructionId; //now it has a layout id
        //add the empty plate layout to this.layouts
        this.layouts.push(newPlate);
      } else if (plate.isEmpty || plate.layoutId === "") {
        throw(`Error: Plate Config plate "isEmpty = ${plate.isEmpty}"" but layoutId = ${plate.layoutId}. This is an error.`)
      }
    })
  }

  createLayouts() {
    // create empty plates for destinatios that are missing plate layouts
    this.addMissingPlateLayouts();
    var inputLayoutsCopy = _.cloneDeep(this.inputLayouts);

    //ensure well data has correct Plate and Well keys
    inputLayoutsCopy.forEach((layout, layoutIndex) => {
      this.layouts.push([]);
      layout.forEach((wellRow) => {
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
}

export default liquidDataHander;
