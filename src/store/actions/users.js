import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { errorGlobal, successGlobal } from "../reducers/notifications";
import { getAuthHeader, removeTokenCookie } from "../../utils/tools";

export const registerUser = createAsyncThunk(
    'users/registerUser', async ({ email, password }, { dispatch }) => {
        console.log(email, password)
        try {
            const request = await axios.post('/api/auth/register', { email, password })

            dispatch(successGlobal('User signed up successfully, welcome! to check the indox for confirmation message '))
            return { data: request.data.user, auth: true }
        }
        catch (error) {
            dispatch(errorGlobal(error.response.data.message || 'an error occured while signing up'))
            throw error
        }

    }
)
export const signinUser = createAsyncThunk(
    "users/signinUser",
    async ({ email, password }, { dispatch }) => {
        try {
            const request = await axios.post('/api/auth/signin', { email, password })
            console.log("Signin response:", request);

            dispatch(successGlobal('user signed in successfully, welcome! to check the inbox for confirmation message'))
            return { data: request.data.user, auth: true }
        }
        catch (error) {

            dispatch(errorGlobal(error.response.data.message || 'an error occured while signing in'))
            throw error
        }
    }
)

export const isAuthenticated = createAsyncThunk(
    'users/isAuthenticated',
    async () => {
        try {
            const request = await axios.get('/api/auth/isauth', getAuthHeader())
            return { data: request.data, auth: true }
        }
        catch (error) {
            return { data: {}, auth: false }
        }
    }
)

export const signOut = createAsyncThunk(
    'users/signOut',
    async () => {
        removeTokenCookie()
    }
)