import {IntegrationsTypes} from "./actionTypes";

export const getIntegrations = (nextUrl: any, filter: object) => ({
  type: IntegrationsTypes.GET_INTEGRATIONS,
  nextUrl,
  filter,
})

export const getIntegrationsSuccess = (integrations: any) => ({
  type: IntegrationsTypes.GET_INTEGRATIONS_SUCCESS,
  payload: integrations
})

export const getIntegrationsFail = (error: any) => ({
  type: IntegrationsTypes.GET_INTEGRATIONS_FAIL,
  payload: error,
})

export const getIntegration = (id: number) => ({
  type: IntegrationsTypes.GET_INTEGRATION,
  id
})

export const getIntegrationSuccess = (integration: any) => ({
  type: IntegrationsTypes.GET_INTEGRATION_SUCCESS,
  payload: integration
})

export const getIntegrationFail = (error: any) => ({
  type: IntegrationsTypes.GET_INTEGRATION_FAIL,
  payload: error,
})

export const addIntegration = (integration: any) => ({
  type: IntegrationsTypes.ADD_INTEGRATION,
  payload: integration
})

export const addIntegrationSuccess = (integration: any) => ({
  type: IntegrationsTypes.ADD_INTEGRATION_SUCCESS,
  payload: integration
})

export const addIntegrationFail = (error: any) => ({
  type: IntegrationsTypes.ADD_INTEGRATION_FAIL,
  payload: error
})

export const updateIntegration = (integration: any, id: number) => ({
  type: IntegrationsTypes.UPDATE_INTEGRATION,
  payload: integration,
  id: id
})

export const updateIntegrationSuccess = (integration: any) => ({
  type: IntegrationsTypes.UPDATE_INTEGRATION_SUCCESS,
  payload: integration
})

export const updateIntegrationFail = (error: any) => ({
  type: IntegrationsTypes.UPDATE_INTEGRATION_SUCCESS,
  payload: error
})

export const deleteIntegration = (id: number) => ({
  type: IntegrationsTypes.DELETE_INTEGRATION,
  payload: id
})

export const deleteIntegrationSuccess = (id: number) => ({
  type: IntegrationsTypes.DELETE_INTEGRATION_SUCCESS,
  payload: id,
})

export const deleteIntegrationFail = (error: any) => ({
  type: IntegrationsTypes.DELETE_INTEGRATION_FAIL,
  payload: error
})

export const clearIntegrations = () => ({
  type: IntegrationsTypes.CLEAR_INTEGRATIONS
})