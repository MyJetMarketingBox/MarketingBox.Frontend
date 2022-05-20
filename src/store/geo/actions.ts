import { GeoTypes } from "./actionTypes";

export const getGeo = (nextUrl: string | null = null, filter: object = {}) => ({
  type: GeoTypes.GET_GEO,
  nextUrl,
  filter,
});

export const getGeoSuccess = (geo: any) => ({
  type: GeoTypes.GET_GEO_SUCCESS,
  payload: geo,
});

export const getGeoFail = (error: any) => ({
  type: GeoTypes.GET_GEO_FAIL,
  payload: error,
});

export const addGeo = (geo: any) => ({
  type: GeoTypes.ADD_GEO,
  payload: geo,
});

export const addGeoSuccess = (geo: any) => ({
  type: GeoTypes.ADD_GEO_SUCCESS,
  payload: geo,
});

export const addGeoFail = (error: any) => ({
  type: GeoTypes.ADD_GEO_FAIL,
  payload: error,
});

export const clearGeo = () => ({
  type: GeoTypes.CLEAR_GEO,
});
