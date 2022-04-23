export enum GeoTypes {
  /** GET **/
  GET_GEO = '@geo/GET_GEO',
  GET_GEO_SUCCESS = '@geo/GET_GEO_SUCCESS',
  GET_GEO_FAIL = '@geo/GET_GEO_FAIL',


  /** CLEAR **/
  CLEAR_GEO = '@@geo/CLEAR_GEO',
}

interface Item {

}

interface iGeo {
  items: Array<Item>,
  pagination: Object
}

export interface GeoState {
  geo: iGeo,
  error: Object,
  loading: boolean;
  loaded: boolean;
}