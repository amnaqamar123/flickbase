import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'

const preventSignin = (props) => {
    const location = useLocation()
    return (
        <>
            {
                props.users.auth ?
                    <Navigate to="/dashboard" state={{ from: location }} replace />
                    :
                    <>
                        {props.children}
                    </>
            }
        </>
    )
}

export default preventSignin