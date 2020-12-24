import * as actionType from './action-types';
import Axios from 'axios';

export function fetchFlashsaleProduct(data) {
  return {
    type: actionType.FETCH_FLASHSALE_PRODUCT,
    payload: data,
  };
}
export function fetchSearchProduct(data) {
  return {
    type: actionType.FETCH_SEARCH_PRODUCT,
    payload: data,
  };
}

export function fetchCategoryProduct(data) {
  return {
    type: actionType.FETCH_CATEGORY_PRODUCT,
    payload: data,
  };
}

export function fetchOmiyagoProduct(data) {
  return {
    type: actionType.FETCH_OMIYAGO_PRODUCT,
    payload: data,
  };
}

export function fetchNewProduct(data) {
  return {
    type: actionType.FETCH_NEW_PRODUCT,
    payload: data,
  };
}

export function fetchPopulerProduct(data) {
  return {
    type: actionType.FETCH_POPULER_PRODUCT,
    payload: data,
  };
}
export function fetchRecomendasiProduct(data) {
  return {
    type: actionType.FETCH_RECOMENDASI_PRODUCT,
    payload: data,
  };
}

export function fetchAllProduct(data) {
  return {
    type: actionType.FETCH_ALL_PRODUCT,
    payload: data,
  };
}

export function fetchCart(data) {
  return {
    type: actionType.FETCH_CART,
    payload: data,
  };
}

export function fetchWishlist(data) {
  return {
    type: actionType.FETCH_WISHLIST,
    payload: data,
  };
}
