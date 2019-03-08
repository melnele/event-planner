import { GET_EVENTS } from './types';
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
        console.log(res);
        dispatch({
            type: GET_EVENTS,
            payload: res.data.data
        })
    }).catch(err => {
        alert(err.response.data.msg)
    })


}
