import {ReportsTypes, ReportsState} from "../reports/actionTypes";

export const INIT_STATE : ReportsState = {
  reports: [],
  reportProfile: {},
  error: {},
}

const reports = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case ReportsTypes.GET_REPORTS_SUCCESS:
      return {
        ...state,
        affiliates: action.payload,
      }

    case ReportsTypes.GET_REPORTS_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    default:
      return state
  }
}

export default reports