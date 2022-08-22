

import { onOpenMenu ,onCloseMenu } from "./uiSlice";

export const openMenu = () =>{
    return (dispatch, getState) => {
        console.log("openMenu")
		dispatch(onOpenMenu());
	};
    
} 

export const closeMenu = () =>{
    return (dispatch, getState) => {
        dispatch(onCloseMenu());
    }
} 
