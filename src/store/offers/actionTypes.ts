import { CurrencyEnum } from "src/enums/CurrencyEnum";
import { OfferPrivacyEnum } from "src/enums/OfferPrivacyEnum";
import { OfferActiveStateEnum } from "src/enums/OfferStateEnum";
import { OrderEnum } from "src/enums/OrderEnum";
import { PaginationType } from "src/types/PaginationType";
import { IGeoItem } from "../geo/actionTypes";
import { LanguageItemType } from "../languages/actionTypes";
import { IOfferAffiliateItem } from "../offerAffiliates/actionTypes";

export enum OffersActionEnum {
  GET_OFFERS = "offers/get-offers",
  GET_OFFERS_SUCCESS = "offers/get-offers-success",
  GET_OFFERS_FAIL = "offers/get-offers-fail",

  GET_OFFER = "offers/get-offer",
  GET_OFFER_SUCCESS = "offers/get-offer-success",
  GET_OFFER_FAIL = "offers/get-offer-fail",

  GET_OFFER_URL = "offers/get-offer-url",
  GET_OFFER_URL_SUCCESS = "offers/get-offer-url-success",
  GET_OFFER_URL_FAIL = "offers/get-offer-url-fail",

  ADD_OFFERS = "offers/add-offers",
  ADD_OFFERS_SUCCESS = "offers/add-offers-success",
  ADD_OFFERS_FAIL = "offers/add-offers-fail",

  EDIT_OFFERS = "offers/edit-offers",
  EDIT_OFFERS_SUCCESS = "offers/edit-offers-success",
  EDIT_OFFERS_FAIL = "offers/edit-offers-fail",

  DELETE_OFFER = "offers/delete-offer",
  DELETE_OFFER_SUCCESS = "offers/delete-offer-success",
  DELETE_OFFER_FAIL = "offers/delete-offer-fail",

  CLEAR_OFFER_STORE = "offers/clear-offers-state",
}

export interface ICLearOffersAction {
  type: OffersActionEnum.CLEAR_OFFER_STORE;
}

export interface IGetOffersAction {
  type: OffersActionEnum.GET_OFFERS;
  nextUrl: string | null;
  params: IOffersParams;
}

export interface IGetOffersSuccessAction {
  type: OffersActionEnum.GET_OFFERS_SUCCESS;
  payload: IOffersDTO;
}

export interface IGetOfferAction {
  type: OffersActionEnum.GET_OFFER;
  payload: number;
}

export interface IGetOfferSuccessAction {
  type: OffersActionEnum.GET_OFFER_SUCCESS;
  payload: IOffersItem;
}

export interface IGetOfferUrlAction {
  type: OffersActionEnum.GET_OFFER_URL;
  payload: number;
}

export interface IGetOfferUrlSuccessAction {
  type: OffersActionEnum.GET_OFFER_URL_SUCCESS;
  payload: { url: string };
}

export interface IRemoveOfferAction {
  type: OffersActionEnum.DELETE_OFFER;
  payload: number;
}

export interface IRemoveOfferSuccessAction {
  type: OffersActionEnum.DELETE_OFFER_SUCCESS;
  payload: number;
}

export interface IOffersParams {
  offerName?: string;
  languageIds?: string;
  privacies?: string;
  states?: string;
  brandIds?: string;
  geoIds?: string;
  offerId?: number;
  order?: OrderEnum;
  cursor?: number;
  limit?: number;
}

export interface IOffersItem {
  id: number;
  brandId: number;
  name: string;
  geos: IGeoItem[];
  offerAffiliates: IOfferAffiliateItem[];
  currency: CurrencyEnum;
  language: LanguageItemType;
  privacy: OfferPrivacyEnum;
  state: OfferActiveStateEnum;
  createdAt: string;
}

export interface IOffersDTO {
  pagination: PaginationType;
  items: IOffersItem[];
}

export interface IOffersStore {
  isLoading: boolean;
  editableOffer: IOffersItem | null;
  offerUrl: string;
  pagination: PaginationType | null;
  items: IOffersItem[];
}
