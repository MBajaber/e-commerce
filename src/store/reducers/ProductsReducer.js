import * as actionTypes from '../actions/actionTypes';

const initialState = {
    search: '',
    products: [],
    currentProduct: [],
    total: 0,
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SEARCH_PRODUCTS:
            return { ...state, search: action.value };
        case actionTypes.ADD_TO_CART:
            let isThereItem = state.products.some(item => item.image === action.product.image);
            if (!isThereItem) {
                return { ...state, products: state.products.concat(action.product) };
            }
            return state;
        case actionTypes.REMOVE_FROM_CART:
            let removeItemFromProducts = state.products.filter(item => item.image !== action.product.image && item.id !== action.product.id);
            return { ...state, products: removeItemFromProducts };
        case actionTypes.CURRENT_PRODUCT:
            return { ...state, currentProduct: action.product };
        case actionTypes.CURRENT_PRODUCT_NULL:
            return { ...state, currentProduct: [] };
        case actionTypes.GET_TOTAL:
            return { ...state, total: action.total }
        case actionTypes.INCREASE_QUANTITY:
            let items = [];
            state.products.map(el => {
                if (el.id === action.body.id && el.image === action.body.image && el.price === action.body.price) {
                    el.quantity = el.quantity + 1;
                }
                return items.push(el);
            });
            return {...state, products: items}    
        case actionTypes.DECREASE_QUANTITY:
            let item = [];
            state.products.map(el => {
                if (el.id === action.body.id && el.image === action.body.image && el.price === action.body.price) {
                    el.quantity = el.quantity - 1;
                }
                return item.push(el);
            });
            return {...state, products: item}
        default:
            return state;
    }
}

export default productReducer;