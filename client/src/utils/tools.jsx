import { CircularProgress } from "@mui/material";
import { toast } from 'react-toastify';
import cookie from 'react-cookies'


export const errorHelper = (formik, values) => (
    {
        error: formik.errors[values] && formik.touched[values] ? true : false,
        helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
    }
)

export const Loader = () => {
    return (
        <div className="root_loader">
            <CircularProgress
                style={{
                    color: "#3f51b5",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)"
                }} />
        </div>
    )
}


export const showToast = (type, message) => {
    switch (type) {
        case "SUCCESS":
            toast.success(message, {
                position: 'bottom-right'
            })
            break;

        case "ERROR":
            toast.error(message, {
                position: 'bottom-right'
            })
            break;

        default:
            return false;

    }
}

export const getTokenCookie = () => cookie.load('x-access-token')
export const removeTokenCookie = () => cookie.remove('x-access-token', { path: '/' })
export const getAuthHeader = () => {
    return { headers: { 'Authorization': `Bearer ${getTokenCookie()}` } }
}

export const AdminTitle=({title})=>{
    return(
        <div className="d-flex justify-content-between align-items-center mb-5 border-bottom flex-wrap flex-md-nowrap">
            <h1 className="h2">{title}</h1>
        </div>
    )
}