import * as product from './actionTypes';

export const searchProducts = (value) => ({type: product.SEARCH_PRODUCTS, value: value});
export const addToProducts = (item) => ({type: product.ADD_TO_CART, product: item});
export const removeFromProducts = (item) => ({type: product.REMOVE_FROM_CART, product: item});
export const currentProduct = (item) => ({type: product.CURRENT_PRODUCT, product: item});
export const currentProductNull = () => ({type: product.CURRENT_PRODUCT_NULL});
export const getTotal = (value) => ({type: product.GET_TOTAL, total: value});
export const increaseQuantity = (value) => ({type: product.INCREASE_QUANTITY, body: value});
export const decreaseQuantity = (value) => ({type: product.DECREASE_QUANTITY, body: value});