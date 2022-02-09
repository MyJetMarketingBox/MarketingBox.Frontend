import {CampaignsTypes, CampaignsState} from "./actionTypes";

export const INIT_STATE : CampaignsState = {
  campaigns : { items: [], pagination: {} },
  error : null,
  loading: false,
  loaded: false,
  success: false,
}

const campaigns = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case CampaignsTypes.GET_CAMPAIGNS:
      return {
        ...state,
      }

    case CampaignsTypes.GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
      }

    case CampaignsTypes.GET_CAMPAIGNS_FAIL:
      return {
        ...state,
      }

    case CampaignsTypes.ADD_CAMPAIGN:
      return {
        ...state,
      }

    case CampaignsTypes.ADD_CAMPAIGN_SUCCESS:
      return {
        ...state,
      }

    case CampaignsTypes.ADD_CAMPAIGN_FAIL:
      return {
        ...state,
      }

    case CampaignsTypes.DELETE_CAMPAIGN:
      return {
        ...state,
      }

    case CampaignsTypes.DELETE_CAMPAIGN_SUCCESS:
      return {
        ...state,
      }

    case CampaignsTypes.DELETE_CAMPAIGN_FAIL:
      return {
        ...state,
      }

    default:
      return state
  }
}

export default campaigns;
