import { createAsyncThunk } from "@reduxjs/toolkit";
import { errorGlobal } from "../reducers/notifications";
import { getAuthHeader } from "../../utils/tools";
import axios from 'axios'

export const getCategories = createAsyncThunk(
    'articles/getCategories',
    async (obj, { dispatch }) => {
        try {
            const response = await axios.get('/articles/categories', getAuthHeader())
            console.log(response)

            return response.data;
        }
        catch (error) {
            dispatch(errorGlobal(error.response.data.message || "failed to fetch categories"))
            throw error;
        }
    }
)