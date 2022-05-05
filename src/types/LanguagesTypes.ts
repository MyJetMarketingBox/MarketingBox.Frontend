import { OrderEnum } from "src/enums/OrderEnum";

export interface LanguageParamsType {
  Name?: string;
  order?: OrderEnum;
  cursor?: number;
  limit?: number;
}