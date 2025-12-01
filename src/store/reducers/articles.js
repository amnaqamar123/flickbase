import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../actions/articles";

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        homeSort: {
            sortby: "_id",
            order: "desc",
            limit: 8,
            skip: 0
        },
        loading: false,
        articles: [],
        current: null,
        categories: []
    },
    reducers: {
        // Define your article-related reducers here
    },
    extraReducers:(builder)=>{
        builder
        .addCase(getCategories.pending,(state)=>{
            state.loading=true;
        })

        .addCase(getCategories.fulfilled,(state,action)=>{
            state.categories=action.payload;
            state.loading=false;
        })
        .addCase(getCategories.rejected,(state)=>{
            state.loading=false;
        })

    }
})

export default articlesSlice.reducer;