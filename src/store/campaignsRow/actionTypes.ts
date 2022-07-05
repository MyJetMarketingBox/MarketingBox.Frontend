import { ICampaignItem } from "./../campaigns/actionTypes";
import { OrderEnum } from "../../enums/OrderEnum";
import { CapTypeEnum } from "../../enums/CapTypeEnum";
import { DayOfWorkEnum } from "../../enums/DayOfWorkEnum";
import { IGeoItem } from "../geo/actionTypes";
import { ActivityHoursType } from "src/types/ActivityHoursType";
import { PaginationType } from "src/types/PaginationType";

export enum CampaignRowsActionEnum {
  GET_CAMPAIGN_ROW = "@@campaignRows/get-campaign-rows",
  GET_CAMPAIGN_ROW_SUCCESS = "@@campaignRows/get-campaign-rows-success",
  GET_CAMPAIGN_ROW_FAIL = "@@campaignRows/get-campaign-rows-fail",

  ADD_CAMPAIGN_ROW = "@@campaignRows/add-campaign-row",
  ADD_CAMPAIGN_ROW_SUCCESS = "@@campaignRows/add-campaign-row-success",

  EDIT_CAMPAIGN_ROW = "@@campaignRows/edit-campaign-row",
  EDIT_CAMPAIGN_ROW_SUCCESS = "@@campaignRows/edit-campaign-row-success",

  DELETE_CAMPAIGN_ROW = "@@campaignRows/delete-campaign-rows",
  DELETE_CAMPAIGN_ROW_SUCCESS = "@@campaignRows/delete-campaign-rows-success",

  CAMPAIGN_ROW_OPEN_MODAL = "@@campaignRows/open-edit-modal",
  CAMPAIGN_ROW_CLOSE_MODAL = "@@campaignRows/open-close-modal",

  CAMPAIGN_ROW_ENABLE_TRAFFIC = "@@campaignRows/CAMPAIGN_ROW_ENABLE_TRAFFIC",
  CAMPAIGN_ROW_ENABLE_TRAFFIC_SUCCESS = "@@campaignRows/CAMPAIGN_ROW_ENABLE_TRAFFIC_SUCCESS",
  CAMPAIGN_ROW_ENABLE_TRAFFIC_FAIL = "@@campaignRows/CAMPAIGN_ROW_ENABLE_TRAFFIC_FAIL",
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

export interface IAddCampaignRowAction {
  type: CampaignRowsActionEnum.ADD_CAMPAIGN_ROW;
  payload: CampaignRowValues;
}

export interface IAddCampaignRowSuccessAction {
  type: CampaignRowsActionEnum.ADD_CAMPAIGN_ROW_SUCCESS;
  payload: ICampaignRowItem;
}

export interface IOpenCampaignRowModalAction {
  type: CampaignRowsActionEnum.CAMPAIGN_ROW_OPEN_MODAL;
  payload?: number;
}

export interface ICloseCampaignRowModalAction {
  type: CampaignRowsActionEnum.CAMPAIGN_ROW_CLOSE_MODAL;
}

export interface IEditCampaignRowAction {
  type: CampaignRowsActionEnum.EDIT_CAMPAIGN_ROW;
  payload: {
    id: number;
    data: CampaignRowValues;
  };
}
export interface IEditCampaignRowSuccessAction {
  type: CampaignRowsActionEnum.EDIT_CAMPAIGN_ROW_SUCCESS;
  payload: ICampaignRowItem;
}

export interface IEditCampaignRowEnableTraffic {
  type: CampaignRowsActionEnum.CAMPAIGN_ROW_ENABLE_TRAFFIC;
  id: number;
  status: boolean;
}

export interface IEditCampaignRowEnableTrafficSuccessAction {
  type: CampaignRowsActionEnum.CAMPAIGN_ROW_ENABLE_TRAFFIC_SUCCESS;
  payload: ICampaignRowItem;
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

export interface CampaignRowValues {
  brandId: number | null;
  campaignId: number | null;
  priority: number | null;
  weight: number | null;
  capType: CapTypeEnum | null;
  dailyCapValue?: number | null;
  activityHours: ActivityHoursType[] | null;
  information: string | null;
  geoId: number | null;
  enableTraffic: boolean;
}
//
export interface ICampaignRowDTO {
  pagination: PaginationType;
  items: ICampaignRowItem[];
}

export interface ICRAction {
  type: CampaignRowsActionEnum;
  payload: any;
}
//

export interface ICampaignRowStore {
  isLoading: boolean;
  isEditCRModal: boolean;
  editableCRid: number | null;

  pagination: PaginationType | null;
  items: ICampaignRowItem[];
}
