import {CampaignsTypes, CampaignsState} from "./actionTypes";

export const INIT_STATE : CampaignsState = {
  campaigns : { items: [], pagination: null },
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
        loading: true,
        error: null,
      }

    case CampaignsTypes.GET_CAMPAIGNS_SUCCESS:
      return {
        ...state,
        campaigns: {
          ...state.campaigns,
          items: [...state.campaigns.items, ...action.payload.items],
          pagination: action.payload.pagination,
        },
        loading: false,
        loaded: true,
      }

    case CampaignsTypes.GET_CAMPAIGNS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }

    case CampaignsTypes.ADD_CAMPAIGN:
      return {
        ...state,
      }

    case CampaignsTypes.ADD_CAMPAIGN_SUCCESS:
      return {
        ...state,
        campaigns: {
          ...state.campaigns,
          items: [action.payload, ...state.campaigns.items],
        },
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
        campaigns : {
          ...state.campaigns,
          items: state.campaigns.items.filter((item: any) => item.id !== action.payload),
        },
      }

    case CampaignsTypes.DELETE_CAMPAIGN_FAIL:
      return {
        ...state,
      }

    case CampaignsTypes.CLEAR_CAMPAIGNS:
      return INIT_STATE

    default:
      return state
  }
}

export default campaigns;
