import {PostbackLogsTypes} from "./actionTypes";

export const getPostbackLogs = (nextUrl: any, filter: object) => ({
  type: PostbackLogsTypes.GET_POSTBACK_LOGS,
  nextUrl,
  filter
})

export const getPostbackLogsSuccess = (postbacklogs : any) => ({
  type: PostbackLogsTypes.GET_POSTBACK_LOGS_SUCCESS,
  payload: postbacklogs,
})

export const getPostbackLogsFail = (error : any) => ({
  type: PostbackLogsTypes.GET_POSTBACK_LOGS_FAIL,
  payload: error,
})

export const clearPostbackLogs = () => ({
  type: PostbackLogsTypes.CLEAR_POSTBACK_LOGS,
})