import { Reducer } from "react";
import {
  CampaignRowsActionEnum,
  IAddCampaignRowAction,
  IAddCampaignRowSuccessAction,
  ICampaignRowStore,
  ICloseCampaignRowModalAction,
  IDeleteCampaignRowAction,
  IDeleteCampaignRowSuccessAction,
  IEditCampaignRowSuccessAction,
  IGetCampaignRowAction,
  IGetCampaignRowSuccessAction,
  IOpenCampaignRowModalAction,
} from "./actionTypes";

const initialStore: ICampaignRowStore = {
  isLoading: false,
  isEditCRModal: false,
  pagination: null,
  editableCRid: null,
  items: [],
};

type action =
  | IGetCampaignRowAction
  | IGetCampaignRowSuccessAction
  | IDeleteCampaignRowAction
  | IDeleteCampaignRowSuccessAction
  | IAddCampaignRowAction
  | IAddCampaignRowSuccessAction
  | IOpenCampaignRowModalAction
  | ICloseCampaignRowModalAction
  | IEditCampaignRowSuccessAction;

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

    case CampaignRowsActionEnum.ADD_CAMPAIGN_ROW_SUCCESS:
      return {
        ...store,
        isEditCRModal: false,
        editableCRid: null,
        items: [action.payload, ...store.items],
      };

    case CampaignRowsActionEnum.EDIT_CAMPAIGN_ROW_SUCCESS:
      const items = store.items.map(item => {
        if (item.campaignRowId === action.payload.campaignRowId) {
          return action.payload;
        }
        return item;
      });
      return {
        ...store,
        isEditCRModal: false,
        editableCRid: null,
        items,
      };

    case CampaignRowsActionEnum.CAMPAIGN_ROW_OPEN_MODAL:
      return {
        ...store,
        isEditCRModal: true,
        editableCRid: action.payload || null,
      };

    case CampaignRowsActionEnum.CAMPAIGN_ROW_CLOSE_MODAL:
      return {
        ...store,
        isEditCRModal: false,
        editableCRid: null,
      };

    default:
      return store;
  }
};

export default CampaignRows;
