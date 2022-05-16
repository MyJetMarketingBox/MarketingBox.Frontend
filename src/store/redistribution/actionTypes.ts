export enum RedistributionTypes {
  /** GET **/

  GET_REDISTRIBUTION = "@@redistribution/GET_REDISTRIBUTION",
  GET_REDISTRIBUTION_SUCCESS = "@@redistribution/GET_REDISTRIBUTION_SUCCESS",
  GET_REDISTRIBUTION_FAIL = "@@redistribution/GET_REDISTRIBUTION_FAIL",

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
}