import {
  PlateSizeType,
  TransferInstructionsRowType,
  PlateMapRowType,
  ClashStrategyType,
  StrategyType,
  SeparatorType,
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

interface SpecificColumnClashesType {
  source: string;
  destination: string;
  column: string;
  strategy: StrategyType;
  concatenation_separator: SeparatorType;
}

interface PlateColumnSuffixObjectType {
  [key: string]: string[][];
}
// interface plateMapColumnType {
// "Plate": []
// }
export type {
  TransferInstructionsRowType,
  KeySetType,
  PlateIdConfigType,
  AnyStringObjectType,
  PlateMapRowType,
  ClashStrategyType,
  StrategyType,
  SpecificColumnClashesType,
  PlateColumnSuffixObjectType,
};
