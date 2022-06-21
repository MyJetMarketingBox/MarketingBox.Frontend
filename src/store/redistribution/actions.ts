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

export const addRedistribution = (data: any, history: any) => ({
  type: RedistributionTypes.ADD_REDISTRIBUTION,
  data,
  history
})

export const addRedistributionSuccess = (data: any) => ({
  type: RedistributionTypes.ADD_REDISTRIBUTION_SUCCESS,
  payload: data
})

export const addRedistributionFail = (error: any) => ({
  type: RedistributionTypes.ADD_REDISTRIBUTION_FAIL,
  payload: error
})

export const updateRedistributionStatus = (data: object) => ({
  type: RedistributionTypes.UPDATE_STATUS,
  data
})

export const updateRedistributionStatusSuccess = (data: any) => ({
  type: RedistributionTypes.UPDATE_STATUS_SUCCESS,
  payload: data
})

export const updateRedistributionStatusFail = (error: any) => ({
  type: RedistributionTypes.UPDATE_STATUS_FAIL,
  payload: error
})

export const clearRedistribution = () => ({
  type: RedistributionTypes.CLEAR_REDISTRIBUTION
})