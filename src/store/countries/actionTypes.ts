export enum CountriesType{
  /** Get Countries **/
  GET_COUNTRIES = '@@countries/GET_COUNTRIES',
  GET_COUNTRIES_SUCCESS = '@@countries/GET_COUNTRIES_SUCCESS',
  GET_COUNTRIES_FAIL = '@@countries/GET_COUNTRIES_FAIL',

}

interface iCountry {
  id: number
}

interface iCountries {
  items  : Array<iCountry>;
  pagination : Object;
}

export interface CountriesState {
  value: iCountries,
  error: Object,
  loading: boolean,
  loaded: boolean,
  success: boolean
}