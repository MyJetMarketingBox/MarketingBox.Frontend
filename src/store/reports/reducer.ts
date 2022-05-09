import {ReportsTypes, ReportsState} from "../reports/actionTypes";

export const INIT_STATE : ReportsState = {
  reports: {items: [], pagination: {}},
  reportProfile: {},
  error: {},
  loading: false,
  loaded: false,
}

const reports = (state = INIT_STATE, action :any) => {
  switch (action.type) {

    case ReportsTypes.GET_REPORTS:
      return {
        ...state,
        loading: true
      }

    case ReportsTypes.GET_REPORTS_SUCCESS:
      return {
        ...state,
        reports: {
          items: [ ...state.reports.items, ...action.payload.items ],
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true
      }

    case ReportsTypes.GET_REPORTS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false
      }

    case ReportsTypes.CLEAR_REPORTS:
      return INIT_STATE

    default:
      return state
  }
}

export default reports