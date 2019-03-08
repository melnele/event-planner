import { AUTH_SUCCESS, AUTH_ERROR, LOGOUT } from '../actions/types';
import axios from 'axios';

export const login = (username, password) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
        }
    };
    axios.post('http://localhost:8080/api/login', JSON.stringify({ username, password }), config)
        .then(res => {
            dispatch({
                type: AUTH_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            alert(err.response.data.msg)
            dispatch({ type: AUTH_ERROR })
        })
}

export const logout = () => dispatch => { dispatch({ type: LOGOUT }) }