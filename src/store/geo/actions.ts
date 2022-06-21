import { GeoTypes } from "./actionTypes";
import Geo from "../../pages/Geo";

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

export const getGeoProfile = (id: number) => ({
  type: GeoTypes.GET_GEO_PROFILE,
  id
})

export const getGeoProfileSuccess = (geoProfile: any) => ({
  type: GeoTypes.GET_GEO_PROFILE_SUCCESS,
  payload: geoProfile
})

export const getGeoProfileFail = (error: any) => ({
  type: GeoTypes.GET_GEO_PROFILE_FAIL,
  payload: error
})

export const updateGeo = (geo : any, id: number) => ({
  type: GeoTypes.UPDATE_GEO,
  payload: geo,
  id: id
})

export const updateGeoSuccess = (geo : any) => ({
  type: GeoTypes.UPDATE_GEO_SUCCESS,
  payload: geo
})

export const updateGeoFail = (error : any) => ({
  type: GeoTypes.UPDATE_GEO_FAIL,
  payload: error
})

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

export const delGeo = (id: number) => ({
  type: GeoTypes.DEL_GEO,
  payload: id,
})

export const delGeoSuccess = (response: any) => ({
  type: GeoTypes.DEL_GEO_SUCCESS,
  payload: response,
})

export const delGeoFail = (error: any) => ({
  type: GeoTypes.DEL_GEO_FAIL,
  payload: error,
})

export const clearGeo = () => ({
  type: GeoTypes.CLEAR_GEO,
});
