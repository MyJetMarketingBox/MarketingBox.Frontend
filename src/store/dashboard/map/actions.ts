import {DashMapTypes} from "./actionTypes";

export const getDashMap = (filter: object) => ({
  type: DashMapTypes.GET_DASH_MAP,
  filter
})

export const getDashMapSuccess = (data: any) => ({
  type: DashMapTypes.GET_DASH_MAP_SUCCESS,
  payload: data
})

export const getDashMapFail = (error: any) => ({
  type: DashMapTypes.GET_DASH_MAP_FAIL,
  payload: error
})

export const clearDashMap = () => ({
  type: DashMapTypes.CLEAR_DASH_MAP
})