import * as t from '../actionsTypes';

const initState = {
    counter: 0,
    isLoggedIn: false,
}

export default function authReducer(state = initState, action) {
    switch (action.type) {
        case "INCREMENT_COUNTER":
            return {
                counter: state.counter++
            }
        case t.SET_LOGIN_STATE:
            return {
                ...state,
                isLoggedIn: true, // we set this as true on login
            };

        default:
            return state
    }
} 