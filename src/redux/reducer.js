import { GET_URL } from './action.js';

const initialState = {
    apiUrl: 'https://gorest.co.in/public/v1/users'
};

export const urlReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_URL: return {
            apiUrl: action.payload
        }
        default: return state;
    }
}