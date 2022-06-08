import { ReportsState } from "./reports/actionTypes";
import { RedistributionState } from "./redistribution/actionTypes";
import { IntegrationsState } from "./integrations/actionTypes";
import { CountriesState } from "./countries/actionTypes";
import { CampaignsState } from "./campaigns/actionTypes";
import { BrandsState } from "./brands/actionTypes";
import { BrandProfileState } from "./brands/profile/actionTypes";
import { AffPayoutsState } from "./affiliatePayouts/actionTypes";
import { AffiliatesState } from "./affiliates/actionTypes";
import { BrandPayoutsState } from "./brandPayouts/actionTypes";
import { ICampaignRowStore } from "./campaignsRow/actionTypes";
import { GeoState } from "./geo/actionTypes";
import { LanguagesStateType } from "./languages/actionTypes";
import { LayoytState } from "./layout/actionTypes";
import { PostbackState } from "./postback/actionTypes";
import { PostbackLogsState } from "./postback_logs/actionTypes";
import { RegistrationsState } from "./registrations/actionTypes";
import { IBadRequestStore } from "./badRequests/actionTypes";
import { IOffersStore } from "./offers/actionTypes";
import { RegFilesState } from "./regFiles/actionTypes"
import { AffProfileState } from "./affiliates/profile/actionTypes";

export interface RootStoreType {
  AffPayouts: AffPayoutsState;
  Affiliates: AffiliatesState;
  BrandPayouts: BrandPayoutsState;
  BrandProfile: BrandProfileState;
  Brands: BrandsState;
  Campaigns: CampaignsState;
  CampaignRows: ICampaignRowStore;
  Countries: CountriesState;
  Geo: GeoState;
  Integrations: IntegrationsState;
  Languages: LanguagesStateType;
  Layout: LayoytState;
  Postback: PostbackState;
  PostbackLogs: PostbackLogsState;
  Redistribution: RedistributionState;
  Registrations: RegistrationsState;
  Reports: ReportsState;
  badRequests: IBadRequestStore;
  forgetPassword: any;
  login: any;
  affProfile: AffProfileState;
  register: any;
  Offers: IOffersStore;
  RegFiles: RegFilesState;
  profile: any;
}
