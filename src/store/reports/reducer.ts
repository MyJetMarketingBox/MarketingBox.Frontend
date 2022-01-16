import {ReportsTypes, ReportsState} from "../reports/actionTypes";

export const INIT_STATE : ReportsState = {
  reports: {items: [], pagination: {}},
  reportProfile: {},
  error: {},
}

const reports = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case ReportsTypes.GET_REPORTS_SUCCESS:
      return {
        ...state,
        reports: {
          items: [ ...state.reports.items, ...action.payload.items ],
          pagination: { ...action.payload.pagination }
        },
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