import {CampaignsTypes} from "./actionTypes"

export const getCampaigns = (filter: object) => ({
  type: CampaignsTypes.GET_CAMPAIGNS,
  payload: filter
})

export const getCampaignsSuccess = (campaigns : any) => ({
  type: CampaignsTypes.GET_CAMPAIGNS_SUCCESS,
  payload: campaigns,
})

export const getCampaignsFail = (error : any) => ({
  type: CampaignsTypes.GET_CAMPAIGNS_FAIL,
  payload: error,
})

export const addCampaign = (campaign : any) => ({
  type: CampaignsTypes.ADD_CAMPAIGN,
  payload: campaign,
})

export const addCampaignSuccess = (campaign : any) => ({
  type: CampaignsTypes.ADD_CAMPAIGN_SUCCESS,
  payload: campaign,
})

export const addCampaignFail = (error : any) => ({
  type: CampaignsTypes.ADD_CAMPAIGN_FAIL,
  payload: error,
})

export const deleteCampaign = (id : number) => ({
  type: CampaignsTypes.DELETE_CAMPAIGN,
  payload: id,
})

export const deleteCampaignSuccess = (id : any) => ({
  type: CampaignsTypes.DELETE_CAMPAIGN_SUCCESS,
  payload: id,
})

export const deleteCampaignFail = (error : any) => ({
  type: CampaignsTypes.DELETE_CAMPAIGN_FAIL,
  payload: error,
})
