import React from "react";
import { useSelector } from "react-redux";
import { useLocation,Navigate } from "react-router-dom";

function AuthGaurd(props){
    const users=useSelector((state)=> state.users);
    const location=useLocation()

    if(!users.auth){
        return <Navigate to='/auth' state={{from:location}} replace />

       
    }
     return props.children;

}

export default AuthGaurd;