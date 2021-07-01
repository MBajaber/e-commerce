import { TOGGLE_NAVBAR, GET_USER, LOGOUT_USER, PAGE_INFO  } from '../actions/actionTypes';

const initialState = {
    toggleNav: false,
    user: null,
    pageInfo: ''
}

const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case TOGGLE_NAVBAR:
            if(action.value === undefined) {
                return {...state, toggleNav: !state.toggleNav }
            } else {
                return {...state, toggleNav: action.value }
            }
        case GET_USER:
            return { ...state, user: action.user }
        case LOGOUT_USER:
            return { ...state, user: null }
        case PAGE_INFO:
            return { ...state, pageInfo: action.info }
        default:
        return state
    }
}

export default userReducer;