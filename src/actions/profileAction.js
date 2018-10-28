import {GET_PROFILE,PROFILE_LOADING,CLEAR_CURRENT_PROFILE} from './types';
import axios from 'axios';


export const getCurrentProfile = () => dispatch =>{
    dispatch(setProfileLoading());
    axios.get("https://testapp-imanjithreddy.c9users.io:8081/api/profile")
    .then(res =>dispatch({
        type: GET_PROFILE,
        payload: res.data
    }))
    .catch(err=>
    dispatch({
        type: GET_PROFILE,
        payload:{}
    }))
}

export const setProfileLoading = () =>{
    return{
        type: PROFILE_LOADING
    }
}
export const clearCurrentProfile = () =>{
    return{
        type: CLEAR_CURRENT_PROFILE
    }
}