import {
  IGetOffersAction,
  IOffersDTO,
  IOffersParams,
  OffersActionEnum,
} from "./actionTypes";

export const getOffers = (
  nextUrl: string | null = "",
  params: IOffersParams = {}
): IGetOffersAction => ({
  type: OffersActionEnum.GET_OFFERS,
  nextUrl,
  params,
});

export const getOffersSuccess = (payload: IOffersDTO) => ({
  type: OffersActionEnum.GET_OFFERS_SUCCESS,
  payload,
});

export const clearOffersStore = () => ({
  type: OffersActionEnum.CLEAR_OFFER_STORE,
});
