import {BrandsTypes, BrandsState} from "./actionTypes";
import { AffiliatesTypes } from "../affiliates/actionTypes";

export const INIT_STATE : BrandsState = {
  brands: {items: [], pagination: {}},
  brand: {},
  error: {},
  loading: false,
  addBrandsLoading: false,
  addBrandsSuccess: false,
  addBrandsError: false,
  loaded: false,
  success: false
}

const brands = (state = INIT_STATE, action :any) => {

  switch(action.type){
    case BrandsTypes.GET_BRANDS:
      return {
        ...state,
        loading: true,
      }

    case BrandsTypes.GET_BRANDS_SUCCESS:
      return {
        brands: {
          items: [...state.brands.items, ...action.payload.items],
          pagination: { ...action.payload.pagination },
          loading: false,
          loaded: true,
        }
      }

    case BrandsTypes.GET_BRANDS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: action.payload,
      }

    case BrandsTypes.UPDATE_BRAND:
      return {
        ...state,
        error: {},
        loading: true,
        success: false
      }

    case BrandsTypes.UPDATE_BRAND_SUCCESS:
      const idx = state.brands.items.findIndex(item => {
        // @ts-ignore
        return item.id === action.payload.id
      });

      let newItems = null;
      if(idx >= 0){
        newItems = [...state.brands.items]
        newItems[idx] = action.payload
      }

      return {
        ...state,
        brands: {
          ...state.brands,
          items: newItems,
        },
        error: {},
        loading: false,
        success: true
      }

    case BrandsTypes.UPDATE_BRAND_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false
      }

    case BrandsTypes.CLEAR_BRANDS:
      return INIT_STATE

    default:
      return state
  }

}

export default brands;