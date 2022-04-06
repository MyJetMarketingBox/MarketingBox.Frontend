export enum IntegrationsTypes {
  /** GET ALL*/
  GET_INTEGRATIONS = '@@integrations/GET_INTEGRATIONS',
  GET_INTEGRATIONS_SUCCESS = '@@integrations/GET_INTEGRATIONS_SUCCESS',
  GET_INTEGRATIONS_FAIL = '@@integrations/GET_INTEGRATIONS_FAIL',

  /** GET INTEGRATION*/
  GET_INTEGRATION = '@@integrations/GET_INTEGRATION',
  GET_INTEGRATION_SUCCESS = '@@integrations/GET_INTEGRATION_SUCCESS',
  GET_INTEGRATION_FAIL = '@@integrations/GET_INTEGRATION_FAIL',

  /** ADD */
  ADD_INTEGRATION = '@@integrations/ADD_INTEGRATION',
  ADD_INTEGRATION_SUCCESS = '@@integrations/ADD_INTEGRATION_SUCCESS',
  ADD_INTEGRATION_FAIL = '@@integrations/ADD_INTEGRATION_FAIL',

  /** UPDATE */
  UPDATE_INTEGRATION = '@@integrations/UPDATE_INTEGRATION',
  UPDATE_INTEGRATION_SUCCESS = '@@integrations/UPDATE_INTEGRATION_SUCCESS',
  UPDATE_INTEGRATION_FAIL = '@@integrations/UPDATE_INTEGRATION_FAIL',

  /** DELETE */
  DELETE_INTEGRATION = '@@integrations/DELETE_INTEGRATION',
  DELETE_INTEGRATION_SUCCESS = '@@integrations/DELETE_INTEGRATION_SUCCESS',
  DELETE_INTEGRATION_FAIL = '@@integrations/DELETE_INTEGRATION_FAIL',

  /** CLEAR */
  CLEAR_INTEGRATIONS = '@@integrations/CLEAR_INTEGRATIONS'
}

interface iIntegration {
  id: number;
  name: string
}

interface iIntegrations {
  items: Array<iIntegration>,
  pagination: Object
}

export interface IntegrationsState {
  value: iIntegrations;
  item: Object;
  error : Object;
  loading: boolean;
  loaded: boolean;
  success: boolean;
}
