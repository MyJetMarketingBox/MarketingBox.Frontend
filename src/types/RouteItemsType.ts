import { RouteLayoutTypeEnum } from "../enums/RouteLayoutTypeEnum";

export interface RouteItemsType {
  path: string;
  component: any;
  layoutType: RouteLayoutTypeEnum;
  exact: boolean;
  strict: boolean;
}
