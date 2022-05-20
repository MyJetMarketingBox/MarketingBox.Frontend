import { ICampaignItem } from "./../campaigns/actionTypes";
import { OrderEnum } from "../../enums/OrderEnum";
import { CapTypeEnum } from "../../enums/CapTypeEnum";
import { DayOfWorkEnum } from "../../enums/DayOfWorkEnum";
import { IGeoItem } from "../geo/actionTypes";
import { ActivityHoursType } from "src/types/ActivityHoursType";

export enum CampaignRowsActionEnum {
  GET_CAMPAIGN_ROW = "@@campaignRows/get-campaign-rows",
  GET_CAMPAIGN_ROW_SUCCESS = "@@campaignRows/get-campaign-rows-success",
  GET_CAMPAIGN_ROW_FAIL = "@@campaignRows/get-campaign-rows-fail",

  DELETE_CAMPAIGN_ROW = "@@campaignRows/delete-campaign-rows",
  DELETE_CAMPAIGN_ROW_SUCCESS = "@@campaignRows/delete-campaign-rows-success",
}

export interface IGetCampaignRowAction {
  type: CampaignRowsActionEnum.GET_CAMPAIGN_ROW;
  nextUrl: string | null;
  params: ICampaignRowParams;
}

export interface IGetCampaignRowSuccessAction {
  type: CampaignRowsActionEnum.GET_CAMPAIGN_ROW_SUCCESS;
  payload: ICampaignRowDTO;
}

export interface IDeleteCampaignRowAction {
  type: CampaignRowsActionEnum.DELETE_CAMPAIGN_ROW;
  id: number;
}

export interface IDeleteCampaignRowSuccessAction {
  type: CampaignRowsActionEnum.DELETE_CAMPAIGN_ROW_SUCCESS;
  id: number;
}

export interface ICampaignRowParams {
  Id?: number;
  CampaignIds?: string;
  BrandId?: number;
  Priority?: number;
  Weight?: number;
  CapType?: 0 | 1 | 2 | 3 | 4;
  EnableTraffic?: boolean;
  GeoIds?: string;
  DailyCapValue?: number;
  Order?: OrderEnum;
  Cursor?: number;
  Limit?: number;
}

export interface ICampaignRowPagination {
  cursor: number;
  count: number;
  total: number;
  order: OrderEnum;
  nextUrl: string;
}

export interface ICampaignRowItem {
  campaignRowId: number;
  brandId: number;
  campaign: ICampaignItem;
  priority: number;
  weight: number;
  capType: CapTypeEnum;
  dailyCapValue: number;
  activityHours: ActivityHoursType[];
  information: string;
  enableTraffic: boolean;
  geo: IGeoItem;
}
//
export interface ICampaignRowDTO {
  pagination: ICampaignRowPagination;
  items: ICampaignRowItem[];
}

export interface ICRAction {
  type: CampaignRowsActionEnum;
  payload: any;
}
//

export interface ICampaignRowStore {
  isLoading: boolean;

  pagination: ICampaignRowPagination | null;
  items: ICampaignRowItem[];
}
