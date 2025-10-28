import { createSlice } from "@reduxjs/toolkit";
import { registerUser, signinUser, isAuthenticated, signOut } from "../actions/users";

const DEFAULT_USER_STATE = {
    data: {
        _id: null,
        firstname: null,
        lastname: null,
        email: null,
        role: null,
        age: null,
        verified: null,

    },
    loading: false,
    error: null,
    auth: null,
}

export const userSlice = createSlice({
    name: 'users',
    initialState: DEFAULT_USER_STATE,
    reducers: {
    },

    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.data = action.payload.data,
                    state.auth = action.payload.auth
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message
            })
            .addCase(signinUser.pending, (state, action) => {
                state.loading = true
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false,
                    state.data = action.payload.data,
                    state.auth = action.payload.auth
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false,
                    state.error = action.error.message

            })
            .addCase(isAuthenticated.pending, (state) => {
                state.loading = true
            })
            .addCase(isAuthenticated.fulfilled, (state, action) => {
                state.loading = false,
                    state.data = { ...state.data, ...action.payload.data }
                state.auth = action.payload.auth
            })
            .addCase(isAuthenticated.rejected, (state) => {
                state.loading = false
            })
            .addCase(signOut.fulfilled, (state, action) => {
                state.data = DEFAULT_USER_STATE.data
                state.auth = false
            })
    }
})
export default userSlice.reducer;