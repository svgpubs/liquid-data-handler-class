import { PlateIdConfigType, KeySetType } from "../mainTypes";

export let keysConfig: KeySetType = {
  plateIdKey: "plate_id",
  wellIdKey: "well_id",
  sourePlateKey: "src",
  destPlateKey: "dst",
  volumeKey: "v",
  sourceWellKey: "swell",
  destWellKey: "Destination Well",
};

export let platesConfig: PlateIdConfigType[] = [
  {
    id: "ss",
    layoutId: "plate96",
    instructionId: "splate-96-1",
    size: 96,
    suffix: "",
    isEmpty: false,
  },
  {
    id: "qqq",
    layoutId: "",
    instructionId: "dplate-24-1",
    size: 24,
    suffix: "_d24",
    isEmpty: true,
  },
  {
    id: "bb",
    layoutId: "",
    instructionId: "dplate-6-2",
    size: 6,
    suffix: "_d6",
    isEmpty: true,
  },
  {
    id: "dd",
    layoutId: "media",
    instructionId: "smedia bottle",
    size: 1,
    suffix: "",
    isEmpty: false,
  },
  {
    id: "ff",
    layoutId: "destmap24",
    instructionId: "dplate-24-1",
    size: 24,
    suffix: "",
    isEmpty: false,
  },
];
