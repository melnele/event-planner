import { GET_EVENTS, ADD_EVENT, OPEN_EVENT, UPDATE_EVENT, DELETE_EVENT } from './types';
import Axios from 'axios';

export const getEvents = () => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (token) {
        config.headers["authorization"] = token;
    }
    Axios.get('http://localhost:8080/api/events/getall', config).then(res => {
        dispatch({
            type: GET_EVENTS,
            payload: res.data.data
        })
    }).catch(err => {
        alert(err.response.data.msg)
    })
}

export const addEvent = (event) => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (token) {
        config.headers["authorization"] = token;
    }
    Axios.post('http://localhost:8080/api/events/add', event, config).then(res => {
        dispatch({
            type: ADD_EVENT,
            payload: res.data.data
        });
    }).catch(err => {
        alert(err.response.data.msg)
    }).then(() => Axios.get('http://localhost:8080/api/events/getall', config).then(res => {
        dispatch({
            type: GET_EVENTS,
            payload: res.data.data
        })
    }));
}

export const openEvent = (event) => dispatch => {
    dispatch({
        type: OPEN_EVENT,
        payload: event
    });
}

export const updateEvent = (event) => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (token) {
        config.headers["authorization"] = token;
    }
    Axios.patch('http://localhost:8080/api/events/update', event, config).then(res => {
        dispatch({
            type: UPDATE_EVENT,
            payload: res.data.data
        });
    }).catch(err => {
        alert(err.response.data.msg)
    }).then(() => Axios.get('http://localhost:8080/api/events/getall', config).then(res => {
        dispatch({
            type: GET_EVENTS,
            payload: res.data.data
        })
    }));
}

export const deleteEvent = (event) => (dispatch, getState) => {
    const token = getState().auth.token;

    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    if (token) {
        config.headers["authorization"] = token;
    }
    Axios.post('http://localhost:8080/api/events/delete', event, config).then(res => {
        dispatch({
            type: DELETE_EVENT,
            payload: res.data.data
        });
    }).catch(err => {
        alert(err.response.data.msg)
    }).then(() => Axios.get('http://localhost:8080/api/events/getall', config).then(res => {
        dispatch({
            type: GET_EVENTS,
            payload: res.data.data
        })
    }));
}