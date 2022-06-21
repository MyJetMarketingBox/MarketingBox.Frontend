import {CountriesType} from "./actionTypes";

export const getCountries = (nextUrl: any, filter: object) => ({
  type: CountriesType.GET_COUNTRIES,
  nextUrl,
  filter
})

export const getCountriesSuccess = (countries: any) => ({
  type: CountriesType.GET_COUNTRIES_SUCCESS,
  payload: countries
})

export const getCountriesFail = (error: any) => ({
  type: CountriesType.GET_COUNTRIES_FAIL,
  payload: error
})

export const clearCountries = () => ({
  type: CountriesType.CLEAR_COUNTRIES,
})