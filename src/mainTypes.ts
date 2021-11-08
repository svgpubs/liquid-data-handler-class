import {
  PlateSizeType,
  TransferInstructionsRowType,
  PlateMapRowType,
  ClashStrategyType,
  StrategyType,
} from "plate-data-transfer";

interface KeySetType {
  plateIdKey: string;
  wellIdKey: string;
  sourePlateKey: string;
  destPlateKey: string;
  volumeKey: string;
  sourceWellKey: string;
  destWellKey: string;
}
interface PlateIdConfigType {
  id: string;
  layoutId: string;
  instructionId: string;
  size: PlateSizeType;
  suffix: string;
  isEmpty: boolean;
}

interface AnyStringObjectType {
  [key: string]: string;
}
export type {
  TransferInstructionsRowType,
  KeySetType,
  PlateIdConfigType,
  AnyStringObjectType,
  PlateMapRowType,
  ClashStrategyType,
  StrategyType,
};
