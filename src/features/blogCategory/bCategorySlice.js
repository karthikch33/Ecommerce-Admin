import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogcategoryService from "./bCategoryService";

const initialState = {
    blogcategories:[],
    isError:false,
    isSuccess:false,
    isPending:false,
    updatedTitle:"",
    createdBlogCategory:"",
    deletedStatus:"",
    message:""
}

export const resetState = createAction("Reset_all")

export const getBlogCategoryList = createAsyncThunk("blogcategory/getallCategory",async (thunkAPI)=>{
    try {
        return await blogcategoryService.blogcategorylist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createBlogCategory = createAsyncThunk("blogcategory/createBlogCategory",async(blogcategoryData,thunkAPI)=>{
    try {
        return await blogcategoryService.createBlogCategory(blogcategoryData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const getBlogCategoryService = createAsyncThunk("blogcategory/getBlogCategory",async(blogcategoryId,thunkAPI)=>{
    try {
        return await blogcategoryService.getBlogCategory(blogcategoryId)        
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const updateBlogCategory = createAsyncThunk("blogcategory/updateBlogCategory",async(updatingData,thunkAPI)=>{
    try {
        return await blogcategoryService.updateBlogCategoryService(updatingData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const deleteBlogCategory = createAsyncThunk('blogcateory/deleteBlogCategory',async(blogcateId,thunkAPI)=>{
    try {
        return await blogcategoryService.deleteBlogCategoryService(blogcateId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})


const blogcategorySlice = createSlice({
    name:"blogcategory",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getBlogCategoryList.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getBlogCategoryList.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.blogcategories = action.payload
        })
        .addCase(getBlogCategoryList.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(createBlogCategory.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(createBlogCategory.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.createdBlogCategory = "Success"
        })
        .addCase(createBlogCategory.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(resetState,()=>initialState)
        builder.addCase(getBlogCategoryService.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getBlogCategoryService.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.updatedTitle = action.payload.title
        })
        .addCase(getBlogCategoryService.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(deleteBlogCategory.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(deleteBlogCategory.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.deletedStatus = "Success"
        })
        .addCase(deleteBlogCategory.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default blogcategorySlice.reducer