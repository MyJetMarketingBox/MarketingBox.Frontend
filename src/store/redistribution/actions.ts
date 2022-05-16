import {RedistributionTypes} from "./actionTypes";

export const getRedistribution = (nextUrl: any, filter: object) => ({
  type: RedistributionTypes.GET_REDISTRIBUTION,
  nextUrl,
  filter
})

export const getRedistributionSuccess = (data: any) => ({
  type: RedistributionTypes.GET_REDISTRIBUTION_SUCCESS,
  payload: data,
})

export const getRedistributionFail = (error: any) => ({
  type: RedistributionTypes.GET_REDISTRIBUTION_FAIL,
  payload: error,
})

export const clearRedistribution = () => ({
  type: RedistributionTypes.CLEAR_REDISTRIBUTION
})