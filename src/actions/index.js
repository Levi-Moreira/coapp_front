import { checkHttpStatus, parseJSON } from '../utils';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();
// import { pushState } from 'redux-router';

const BASE_URL = 'http://cohabitat.com.br/api/v1/';

const MASTER_TOKEN = 'Token 3795120644e36ad156daac35a989db2dad78e154'

const SIGN_IN_ENDPOINT = `${BASE_URL}users/sign_in`;

const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
const LOGOUT_USER = 'LOGOUT_USER';

export function loginUserSuccess(token, user, coworking) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', user);
  localStorage.setItem('coworking', coworking);
  //  alert('A name was submitted: '+token);
  return {
    type: LOGIN_USER_SUCCESS,
    payload: {
      token: token,
      user : user,
      coworking : coworking,
    }
  }
}

export function loginUserFailure(error) {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('coworking');
  return {
    type: LOGIN_USER_FAILURE,
    payload: {
      status: error.response.status,
      statusText: error.response.statusText
    }
  }
}

export function loginUserRequest() {
  return {
    type: LOGIN_USER_REQUEST
  }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('coworking');
    return {
        type: LOGOUT_USER
    }
}

export function logoutAndRedirect() {
    return (dispatch, state) => {
        dispatch(logout());
        history.push('/home');
    }
}

export function loginUser(email, password, redirect="/home") {

    return function(dispatch) {

        dispatch(loginUserRequest());
        return fetch(SIGN_IN_ENDPOINT, {
            method: 'post',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authentication': MASTER_TOKEN
            },
                body: JSON.stringify({email: email, password: password})
            })
            .then(checkHttpStatus)
            .then(parseJSON)
            .then(response => {
                try {
                    // let decoded = jwtDecode(response.token);
                    dispatch(loginUserSuccess(response.token));
                    // dispatch(pushState(null, redirect));
                } catch (e) {
                    dispatch(loginUserFailure({
                        response: {
                            status: 403,
                            statusText: 'Invalid token'
                        }
                    }));
                }
            })
            .catch(error => {
                dispatch(loginUserFailure(error));
            })
    }
}
