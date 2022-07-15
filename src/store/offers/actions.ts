import {
  IGetOffersAction,
  IOffersDTO,
  IOffersItem,
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

export const getOffer = (payload: number) => ({
  type: OffersActionEnum.GET_OFFER,
  payload,
});

export const getOfferSuccess = (payload: IOffersItem) => ({
  type: OffersActionEnum.GET_OFFER_SUCCESS,
  payload,
});

export const getOfferUrl = (payload: number) => ({
  type: OffersActionEnum.GET_OFFER_URL,
  payload,
});

export const getOfferUrlSuccess = (payload: { url: string }) => ({
  type: OffersActionEnum.GET_OFFER_URL_SUCCESS,
  payload,
});

export const deleteOffer = (payload: number) => ({
  type: OffersActionEnum.DELETE_OFFER,
  payload,
});

export const deleteOfferSuccess = (payload: number) => ({
  type: OffersActionEnum.DELETE_OFFER_SUCCESS,
  payload,
});

export const addOffer = (payload: any) => ({
  type: OffersActionEnum.ADD_OFFERS,
  payload,
});

export const addOfferSuccess = (payload: any) => ({
  type: OffersActionEnum.ADD_OFFERS_SUCCESS,
  payload,
});

export const addOfferFail = (error: any) => ({
  type: OffersActionEnum.ADD_OFFERS_FAIL,
  payload: error?.response?.data,
});

export const modalOfferAction = (status: boolean) => ({
  type: OffersActionEnum.MODAL_OFFER,
  status
})