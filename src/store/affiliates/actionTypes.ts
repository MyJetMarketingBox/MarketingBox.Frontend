export enum AffiliatesTypes {
  /** Get affiliates */
  GET_AFFILIATES = '@@affiliates/GET_AFFILIATES',
  GET_AFFILIATES_SUCCESS = '@@affiliates/GET_AFFILIATES_SUCCESS',
  GET_AFFILIATES_FAIL = '@@affiliates/GET_AFFILIATES_FAIL',
}

export interface AffiliatesState {
  affiliates  : Array<any>;
  affiliatesProfile : Object;
  error : Object;
}