import {
  CampaignRowsActionEnum,
  ICampaignRowDTO,
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
