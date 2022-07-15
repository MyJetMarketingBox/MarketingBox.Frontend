import { Reducer } from "react";
import {
  IAddOfferAction,
  IAddOfferFailAction,
  IAddOfferSuccessAction,
  ICLearOffersAction,
  IGetOfferAction,
  IGetOffersAction,
  IGetOffersSuccessAction,
  IGetOfferSuccessAction,
  IGetOfferUrlAction,
  IGetOfferUrlSuccessAction,
  IOffersStore,
  IRemoveOfferAction,
  IRemoveOfferSuccessAction,
  OffersActionEnum,
  IModalOfferAction
} from "./actionTypes";

const initialStore: IOffersStore = {
  isLoading: false,
  isLoadingAdd: false,
  isLoadedAdd: false,
  editableOffer: null,
  offerUrl: "",
  pagination: null,
  items: [],
  error: {},
  modalOffer: false,
};

type action =
  | IGetOffersAction
  | IGetOffersSuccessAction
  | ICLearOffersAction
  | IGetOfferAction
  | IGetOfferSuccessAction
  | IGetOfferUrlAction
  | IGetOfferUrlSuccessAction
  | IRemoveOfferAction
  | IRemoveOfferSuccessAction
  | IAddOfferAction
  | IAddOfferSuccessAction
  | IAddOfferFailAction
  | IModalOfferAction;

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

    case OffersActionEnum.GET_OFFER_URL: {
      return {
        ...store,
        isLoading: true,
      };
    }

    case OffersActionEnum.DELETE_OFFER:
      return {
        ...store,
        isLoading: true,
      };

    case OffersActionEnum.DELETE_OFFER_SUCCESS:
      const items = store.items.filter(item => item.id !== action.payload);
      return {
        ...store,
        items,
        isLoading: false,
      };

    case OffersActionEnum.GET_OFFER_URL_SUCCESS: {
      return {
        ...store,
        offerUrl: action.payload.url,
      };
    }

    case OffersActionEnum.ADD_OFFERS:
      return {
        ...store,
        isLoadingAdd: true,
      };

    case OffersActionEnum.ADD_OFFERS_SUCCESS:
      return {
        ...store,
        items: [action.payload, ...store.items],
        isLoadingAdd: false,
        isLoadedAdd: true
      };

    case OffersActionEnum.ADD_OFFERS_FAIL:
      return {
        ...store,
        error: action.payload,
        isLoadingAdd: false,
        isLoadedAdd: false,
      }

    case OffersActionEnum.MODAL_OFFER:
      return {
        ...store,
        modalOffer: action.status,
      }


    case OffersActionEnum.CLEAR_OFFER_STORE:
      return initialStore;

    default:
      return store;
  }
};

export default Offers;
