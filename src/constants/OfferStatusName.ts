import { OfferActiveStateEnum } from "./../enums/OfferStateEnum";

const OfferStatusName = {
  [OfferActiveStateEnum.Active]: "Active",
  [OfferActiveStateEnum.NotActive]: "Not active",
};

Object.freeze(OfferStatusName);
export default OfferStatusName;
