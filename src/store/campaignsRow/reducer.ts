import { Reducer } from "react";
import {
  CampaignRowsActionEnum,
  ICampaignRowStore,
  IDeleteCampaignRowAction,
  IDeleteCampaignRowSuccessAction,
  IGetCampaignRowAction,
  IGetCampaignRowSuccessAction,
} from "./actionTypes";

const initialStore: ICampaignRowStore = {
  isLoading: false,
  pagination: null,
  items: [],
};

type action =
  | IGetCampaignRowAction
  | IGetCampaignRowSuccessAction
  | IDeleteCampaignRowAction
  | IDeleteCampaignRowSuccessAction;

const CampaignRows: Reducer<ICampaignRowStore, action> = (
  store = initialStore,
  action
) => {
  switch (action.type) {
    case CampaignRowsActionEnum.GET_CAMPAIGN_ROW:
      return {
        ...store,
        isLoading: true,
      };

    case CampaignRowsActionEnum.GET_CAMPAIGN_ROW_SUCCESS:
      return {
        ...store,
        pagination: action.payload.pagination,
        items: action.payload.items,
        isLoading: false,
      };

    case CampaignRowsActionEnum.DELETE_CAMPAIGN_ROW_SUCCESS:
      action.id;
      return {
        ...store,
        items: store.items.filter(item => item.campaignRowId !== action.id),
      };

    default:
      return store;
  }
};

export default CampaignRows;
