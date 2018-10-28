import {GET_ERRORS,SET_CURRENT_USER} from './types';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
//Register user
export const registerUser =  (userData,history) => dispatch =>{
       axios.post("https://testapp-imanjithreddy.c9users.io:8081/api/users/register",userData ).then(res =>{
           history.push('/login');
           dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .catch(err=> {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const loginUser =  (userData) => dispatch =>{
       axios.post("https://testapp-imanjithreddy.c9users.io:8081/api/users/login",userData ).then(res =>{
            const {token} = res.data;
            //set token to LocalStorage
            localStorage.setItem("jwttoken",token);
            //set token auth header
            setAuthToken(token);
            const decoded = jwt_decode(token);
            //set current user
            dispatch(setCurrentUser(decoded));
            dispatch({
                type: GET_ERRORS,
                payload: {}
            });
        })
        .catch(err=> {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        });
};
export const setCurrentUser = (decoded) =>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const logoutUser = () =>dispatch => {
    //remove the toke from localstorage
    localStorage.removeItem('jwttoken');
    setAuthToken(false);
    //set current user to empty
    dispatch(setCurrentUser({}))
};