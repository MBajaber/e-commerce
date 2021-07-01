import { TOGGLE_NAVBAR, GET_USER, LOGOUT_USER, PAGE_INFO } from '../actions/actionTypes';

export const navToggle = (value) => ({type: TOGGLE_NAVBAR, value: value });
export const getUser = (user) => ({ type: GET_USER, user: user });
export const logOutUser = () => ({ type: LOGOUT_USER });
export const pageInfo = (value) => ({type: PAGE_INFO, info: value});