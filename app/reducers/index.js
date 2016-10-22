import { combineReducers } from 'redux';
import * as types from '../actions/types';

const carriers = (state = [], action) => {
    switch (action.type) {
        case types.GET_CARRIERS:
            return action.data;
        default:
            return state;
    }
};

const filteredData = (state = [], action) => {
    switch (action.type) {
        case types.GET_FLIGHTS:
            return action.data;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    filteredData,
    carriers
});

export default rootReducer;
