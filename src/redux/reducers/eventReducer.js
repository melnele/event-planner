import { GET_EVENTS, ADD_EVENT, OPEN_EVENT, UPDATE_EVENT, DELETE_EVENT } from '../actions/types';

const initialState = {
    items: [],
    item: {},
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                items: action.payload
            }
        case DELETE_EVENT:
        case ADD_EVENT:
        case UPDATE_EVENT:
        case OPEN_EVENT:
            return {
                ...state,
                item: action.payload
            }
        default:
            return state;
    }
}