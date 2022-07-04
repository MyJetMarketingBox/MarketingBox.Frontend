import { CampaignRowValues } from "src/store/campaignsRow/actionTypes";
import {
  CampaignRowsActionEnum,
  ICampaignRowDTO,
  ICampaignRowItem,
  ICampaignRowParams,
  IDeleteCampaignRowAction,
} from "./actionTypes";

export const getCampaignRowByCampaignId = (
  nextUrl: string | null,
  params: ICampaignRowParams
) => ({
  type: CampaignRowsActionEnum.GET_CAMPAIGN_ROW,
  nextUrl,
  params,
});

export const getCampaignRowsSuccess = (payload: ICampaignRowDTO) => ({
  type: CampaignRowsActionEnum.GET_CAMPAIGN_ROW_SUCCESS,
  payload,
});

export const getCampaignRowsFail = () => ({
  type: CampaignRowsActionEnum.GET_CAMPAIGN_ROW_FAIL,
});

export const deleteCampaignRow = (id: number) => ({
  type: CampaignRowsActionEnum.DELETE_CAMPAIGN_ROW,
  id,
});

export const deleteCampaignRowSuccess = (id: number) => ({
  type: CampaignRowsActionEnum.DELETE_CAMPAIGN_ROW_SUCCESS,
  id,
});

export const addCampaignRow = (payload: any) => ({
  type: CampaignRowsActionEnum.ADD_CAMPAIGN_ROW,
  payload,
});

export const addCampaignRowSuccess = (payload: ICampaignRowItem) => ({
  type: CampaignRowsActionEnum.ADD_CAMPAIGN_ROW_SUCCESS,
  payload,
});

export const editCampaignRow = (payload: {
  id: number;
  data: any;
}) => ({
  type: CampaignRowsActionEnum.EDIT_CAMPAIGN_ROW,
  payload,
});

export const editCampaignRowSuccess = (payload: ICampaignRowItem) => ({
  type: CampaignRowsActionEnum.EDIT_CAMPAIGN_ROW_SUCCESS,
  payload,
});

export const openEditCampaignRowModal = (payload: number | null = null) => ({
  type: CampaignRowsActionEnum.CAMPAIGN_ROW_OPEN_MODAL,
  payload,
});

export const closeEditCampaignRowModal = () => ({
  type: CampaignRowsActionEnum.CAMPAIGN_ROW_CLOSE_MODAL,
});
