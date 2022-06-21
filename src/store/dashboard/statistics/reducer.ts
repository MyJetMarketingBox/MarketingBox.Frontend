import {DashStatisticsTypes, DashStatisticsState} from "./actionTypes";

export const INIT_STATE: DashStatisticsState = {
  statistics: {
    clicks: {
      actual: 0,
      diffType: 0,
      percent: 0,
    },
    registrationsCount: {
      actual: 0,
      diffType: 0,
      percent: 0,
    },
    failedCount: {
      actual: 0,
      diffType: 0,
      percent: 0,
    },
    ftdCount: {
      actual: 0,
      diffType: 0,
      percent: 0,
    },
    cr: {
      actual: 0,
      diffType: 0,
      percent: 0,
    },
    payouts: {
      actual: 0,
      diffType: 0,
      percent: 0,
    }
  },
  loading: false,
  loaded: false,
  error: {}
}

const dashStatistics = (state = INIT_STATE, action: any) => {
  switch (action.type) {
    case DashStatisticsTypes.GET_DASH_STATISTICS:
      return {
        ...state,
        loading: true
      }

    case DashStatisticsTypes.GET_DASH_STATISTICS_SUCCESS:
      return{
        ...state,
        statistics: action.payload,
        loading: false,
        loaded: true,
      }

    case DashStatisticsTypes.GET_DASH_STATISTICS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: false,
      }

    case DashStatisticsTypes.CLEAR_DASH_STATISTICS:
      return INIT_STATE

    default:
      return state
  }
}

export default dashStatistics