import * as t from './actionsTypes';

export const setLoginState = (payload) => dispatch => {
    console.log({ payload });
    dispatch({
        type: t.SET_LOGIN_STATE, payload
    });
};

export const setIsLoaded = (payload) => dispatch => {
    dispatch({
        type: t.SET_LOADED, payload
    });
};