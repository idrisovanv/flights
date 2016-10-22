import * as types from './types';
import jsonData from '../data.json';

export function getFlights(filter) {
    let flights;
    if (!filter || filter === 'все') {
        flights = jsonData.flights;
    }else {
        flights = jsonData.flights.filter((val) => {
            return val.carrier === filter;
        });
    }
    return {
        type: types.GET_FLIGHTS,
        data: flights
    };
}

export function getCarriers() {
    const carriers = [];
    jsonData.flights.forEach((val) => {
       if(carriers.indexOf(val.carrier) === -1) {
           carriers.push(val.carrier);
       }
    });
    return{
        type: types.GET_CARRIERS,
        data: carriers
    };
}
