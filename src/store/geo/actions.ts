import {GeoTypes} from "./actionTypes";

export const getGeo = (nextUrl: any, filter: object) => ({
  type: GeoTypes.GET_GEO,
  nextUrl,
  filter
})

export const getGeoSuccess = (geo: any) => ({
  type: GeoTypes.GET_GEO_SUCCESS,
  payload: geo
})

export const getGeoFail = (error: any) => ({
  type: GeoTypes.GET_GEO_FAIL,
  payload: error
})

export const clearGeo = () => ({
  type: GeoTypes.CLEAR_GEO
})