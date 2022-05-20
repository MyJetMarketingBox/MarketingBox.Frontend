import { PaginationType } from "src/types/PaginationType";

export enum CampaignsTypes {
  /** Get Campaigns */
  GET_CAMPAIGNS = "@@campaigns/GET_CAMPAIGNS",
  GET_CAMPAIGNS_SUCCESS = "@@campaigns/GET_CAMPAIGNS_SUCCESS",
  GET_CAMPAIGNS_FAIL = "@@campaigns/GET_CAMPAIGNS_FAIL",

  /** Add Campaigns */
  ADD_CAMPAIGN = "@@campaigns/ADD_CAMPAIGN",
  ADD_CAMPAIGN_SUCCESS = "@@campaigns/ADD_CAMPAIGN_SUCCESS",
  ADD_CAMPAIGN_FAIL = "@@campaigns/ADD_CAMPAIGN_FAIL",

  /** Delete Campaigns */
  DELETE_CAMPAIGN = "@@campaigns/DELETE_CAMPAIGN",
  DELETE_CAMPAIGN_SUCCESS = "@@campaigns/DELETE_CAMPAIGN_SUCCESS",
  DELETE_CAMPAIGN_FAIL = "@@campaigns/DELETE_CAMPAIGN_FAIL",

  /** Clear Campaigns */
  CLEAR_CAMPAIGNS = "@@campaigns/CLEAR_CAMPAIGNS",
}

export interface ICampaignItem {
  id: number;
  name: string;
  sequence?: number;
}

interface Campaigns {
  items: ICampaignItem[];
  pagination: PaginationType | null;
}

export interface CampaignsState {
  campaigns: Campaigns;
  error: Object | null;
  loading: boolean;
  loaded: boolean;
  success: boolean;
}
