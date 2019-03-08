import { GET_EVENTS } from '../actions/types';

const initialState = {
    items: [],
    item: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                items: action.payload
            }
        default:
            return state;
    }
}