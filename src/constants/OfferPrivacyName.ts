import { OfferPrivacyEnum } from "./../enums/OfferPrivacyEnum";
const OfferPrivacyName = {
  [OfferPrivacyEnum.Private]: "Private",
  [OfferPrivacyEnum.Public]: "Public",
};

Object.freeze(OfferPrivacyName);
export default OfferPrivacyName;
