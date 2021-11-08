import PlateTransferClass from "plate-data-transfer";
import getGeneratorOfTransferInstructions from "./getNextPlateInstructions";
import {
  DEST_PLATE_KEY,
  DEST_WELL_KEY,
  SRC_PLATE_KEY,
  SRC_WELL_KEY,
  VOL_KEY,
  USER_DEST_PLATE_KEY,
  USER_DEST_WELL_KEY,
  USER_SRC_PLATE_KEY,
  USER_SRC_WELL_KEY,
  USER_VOL_KEY,
} from "./keys/InstructionKeys";
import {
  PLATE_ID_KEY,
  WELL_ID_KEY,
  USER_PLATE_ID_KEY,
  USER_WELL_ID_KEY,
} from "./keys/LayoutKeys";
import { KeySetType, PlateIdConfigType } from "./mainTypes";

let userKeySet: KeySetType = {
  plateIdKey: PLATE_ID_KEY,
  wellIdKey: WELL_ID_KEY,
  sourePlateKey: SRC_PLATE_KEY,
  destPlateKey: DEST_PLATE_KEY,
  volumeKey: VOL_KEY,
  sourceWellKey: SRC_WELL_KEY,
  destWellKey: DEST_WELL_KEY,
};

let platesMap: PlateIdConfigType[] = [];
