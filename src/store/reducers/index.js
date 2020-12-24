import * as actionType from '../actions/action-types';

const initialValue = {
    flashsaleProducts: [],
    searchProducts: [],
    categoryProducts: [],
    omiyagoProducts: [],
    newProducts: [],
    populerProducts: [],
    recomendasiProducts: [],
    allProducts: [],
    cart: [],
    wishlistProducts:[]
};

export default function reducer(state = initialValue, action) {
    switch (action.type) {
        case actionType.FETCH_FLASHSALE_PRODUCT:
            
            return {
                ...state,
                flashsaleProducts: action.payload
            }
            case actionType.FETCH_SEARCH_PRODUCT:

                return {
                    ...state,
                    searchProducts: action.payload
                }
                
            case actionType.FETCH_CATEGORY_PRODUCT:
    
                return {
                    ...state,
                    categoryProducts: action.payload
                }
                
            case actionType.FETCH_OMIYAGO_PRODUCT:
    
                return {
                    ...state,
                    omiyagoProducts: action.payload
                }
                
            case actionType.FETCH_NEW_PRODUCT:
    
                return {
                    ...state,
                    newProducts: action.payload
                }
                
            case actionType.FETCH_POPULER_PRODUCT:
    
                return {
                    ...state,
                    populerProducts: action.payload
                }

            case actionType.FETCH_RECOMENDASI_PRODUCT:
    
                    return {
                        ...state,
                        recomendasiProducts: action.payload
                    }

            case actionType.FETCH_ALL_PRODUCT:
    
                return {
                    ...state,
                    allProducts: action.payload
                }
            
            case actionType.FETCH_CART:
    
                return {
                    ...state,
                    cart: action.payload
                }
                
            case actionType.FETCH_WISHLIST:
    
                return {
                    ...state,
                    wishlistProducts: action.payload
                }
        default:
            return state;
    }
}