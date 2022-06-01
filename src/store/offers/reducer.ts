import { Reducer } from "react";
import {
  ICLearOffersAction,
  IGetOfferAction,
  IGetOffersAction,
  IGetOffersSuccessAction,
  IGetOfferSuccessAction,
  IOffersStore,
  OffersActionEnum,
} from "./actionTypes";

const initialStore: IOffersStore = {
  isLoading: false,
  editableOffer: null,
  pagination: null,
  items: [],
};

type action =
  | IGetOffersAction
  | IGetOffersSuccessAction
  | ICLearOffersAction
  | IGetOfferAction
  | IGetOfferSuccessAction;

const Offers: Reducer<IOffersStore, action> = (
  store = initialStore,
  action
) => {
  switch (action.type) {
    case OffersActionEnum.GET_OFFERS:
      return {
        ...store,
        isLoading: true,
      };

    case OffersActionEnum.GET_OFFERS_SUCCESS:
      return {
        ...store,
        isLoading: false,
        pagination: action.payload.pagination,
        items: [...store.items, ...action.payload.items],
      };

    case OffersActionEnum.GET_OFFER:
      return {
        ...store,
        isLoading: true,
      };

    case OffersActionEnum.GET_OFFER_SUCCESS:
      return {
        ...store,
        isLoading: false,
        editableOffer: action.payload,
      };
      
    case OffersActionEnum.CLEAR_OFFER_STORE:
      return initialStore;

    default:
      return store;
  }
};

export default Offers;
