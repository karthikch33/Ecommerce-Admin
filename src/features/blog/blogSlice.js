import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
    blogs:[],
    isError:false,
    isSuccess:false,
    isPending:false,
    createdBlog:"",
    updatedTitle:"",
    updatedCategory:" ",
    updatedDescription:"",
    deletedBlogStatus:"",
    message:""
}

export const resetState = createAction("Reset_all")

export const getbloglists = createAsyncThunk("blog/getallblogs",async (thunkAPI)=>{
    try {
        return await blogService.bloglist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createBlog = createAsyncThunk("blog/createBlog",async(blogcData,thunkAPI)=>{
    try {
        return await blogService.createBlog(blogcData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const getBlog = createAsyncThunk('blog/getBlog',async(blogId,thunkAPI)=>{
    try {
        return await blogService.getBlogService(blogId);
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const updateBlog = createAsyncThunk("blog/updateBlog",async(updatedBlogData,thunkAPI)=>{
    try {
        return await blogService.updateBlogService(updatedBlogData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const deleteBlog = createAsyncThunk("blog/deleteBlog",async(blogId,thunkAPI)=>{
    try {
        return await blogService.deleteBlogService(blogId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

const blogSlice = createSlice({
    name:"blog",
    initialState,
    reducers:{    },
    extraReducers: (builder)=>{
        builder.addCase(getbloglists.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getbloglists.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.blogs = action.payload
        })
        .addCase(getbloglists.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(createBlog.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(createBlog.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.createdBlog ="Success"
        })
        .addCase(createBlog.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(resetState,()=>initialState)
        builder.addCase(updateBlog.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(updateBlog.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
        })
        .addCase(updateBlog.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(getBlog.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getBlog.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.updatedCategory = action.payload?.category
            state.updatedDescription = action.payload?.description
            state.updatedTitle = action.payload?.title
        })
        .addCase(getBlog.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(deleteBlog.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(deleteBlog.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.deletedBlogStatus = "Success"
        })
        .addCase(deleteBlog.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default blogSlice.reducer