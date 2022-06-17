export enum RedistributionTypes {
  /** ADD **/
  ADD_REDISTRIBUTION = "@@redistribution/ADD_REDISTRIBUTION",
  ADD_REDISTRIBUTION_SUCCESS = "@@redistribution/ADD_REDISTRIBUTION_SUCCESS",
  ADD_REDISTRIBUTION_FAIL = "@@redistribution/ADD_REDISTRIBUTION_FAIL",

  /** GET **/
  GET_REDISTRIBUTION = "@@redistribution/GET_REDISTRIBUTION",
  GET_REDISTRIBUTION_SUCCESS = "@@redistribution/GET_REDISTRIBUTION_SUCCESS",
  GET_REDISTRIBUTION_FAIL = "@@redistribution/GET_REDISTRIBUTION_FAIL",

  /** UPDATE **/
  UPDATE_STATUS = "@@redistribution/UPDATE_STATUS",
  UPDATE_STATUS_SUCCESS = "@@redistribution/UPDATE_STATUS_SUCCESS",
  UPDATE_STATUS_FAIL = "@@redistribution/UPDATE_STATUS_FAIL",

  /** CLEAR **/
  CLEAR_REDISTRIBUTION = "@@contact/CLEAR_REDISTRIBUTION",

}

interface iRedistribution {
  items: Array<object>;
  pagination: Object;
}

export interface RedistributionState {
  data: iRedistribution;
  error: Object;
  loading: boolean;
  loaded: boolean;
  errorUpdate: Object;
  loadingUpdate: boolean;
  loadedUpdate: boolean;
}