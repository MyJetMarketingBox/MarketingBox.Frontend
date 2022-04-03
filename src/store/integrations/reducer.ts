import {IntegrationsTypes, IntegrationsState} from "./actionTypes";

export const INIT_STATE: IntegrationsState = {
  value: { items: [], pagination: {} },
  item: {},
  error : {},
  loading: false,
  loaded: false,
  success: false,
}

const integrations = ( state = INIT_STATE, action: any) => {
  switch (action.type){

    case IntegrationsTypes.GET_INTEGRATIONS:
      return {
        ...state,
        loading: true,
      }

    case IntegrationsTypes.GET_INTEGRATIONS_SUCCESS:
      return {
        ...state,
        value: {
          items: [...state.value.items, ...action.payload.items],
          pagination: { ...action.payload.pagination }
        },
        loading: false,
        loaded: true,
      }

    case IntegrationsTypes.GET_INTEGRATIONS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
      }

    case IntegrationsTypes.GET_INTEGRATION:
      return {
        ...state,
        loading: true,
      }

    case IntegrationsTypes.GET_INTEGRATION_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
        loaded: true,
      }

    case IntegrationsTypes.GET_INTEGRATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: true,
      }

    case IntegrationsTypes.ADD_INTEGRATION:
      return {
        ...state
      }

    case IntegrationsTypes.ADD_INTEGRATION_SUCCESS:
      return {
        ...state,
        value: {
          ...state.value,
          items: [action.payload, ...state.value.items],
        },
      }

    case IntegrationsTypes.ADD_INTEGRATION_FAIL:
      return {
        ...state,
        error: action.payload,
      }

    case IntegrationsTypes.UPDATE_INTEGRATION:
      return {
        ...state,
        loading: true,
      }

    case IntegrationsTypes.UPDATE_INTEGRATION_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false,
        loaded: true,
      }

    case IntegrationsTypes.UPDATE_INTEGRATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
        loaded: true,
      }

    case IntegrationsTypes.DELETE_INTEGRATION:
      return {
        ...state,
      }

    case IntegrationsTypes.DELETE_INTEGRATION_SUCCESS:
      return {
        ...state,
        value : {
          ...state.value,
          items: state.value.items.filter((item : any) => item.id !== action.payload),
        },
      }

    case IntegrationsTypes.DELETE_INTEGRATION_FAIL:
      return {
        ...state,
        error: action.payload
      }


    case IntegrationsTypes.CLEAR_INTEGRATIONS:
      return INIT_STATE;

    default:
      return state;
  }
}

export default integrations;