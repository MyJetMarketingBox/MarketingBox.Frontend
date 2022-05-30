import { Reducer } from "react";
import {
  ICLearOffersAction,
  IGetOffersAction,
  IGetOffersSuccessAction,
  IOffersStore,
  OffersActionEnum,
} from "./actionTypes";

const initialStore: IOffersStore = {
  isLoading: false,
  pagination: null,
  items: [],
};

type action = IGetOffersAction | IGetOffersSuccessAction | ICLearOffersAction;

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

    case OffersActionEnum.CLEAR_OFFER_STORE:
      return initialStore;

    default:
      return store;
  }
};

export default Offers;
