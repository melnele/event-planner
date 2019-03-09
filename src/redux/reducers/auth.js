import { AUTH_SUCCESS, AUTH_ERROR, LOGOUT } from '../actions/types';

const initialState = {
    token: sessionStorage.getItem('token'),
    isAuthenticated: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            sessionStorage.setItem('token', action.payload)
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true
            }
        case LOGOUT:
        case AUTH_ERROR:
            sessionStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                token: null,
            }
        default:
            return state;
    }
}