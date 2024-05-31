import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import categoryService from "./categoryService";

const initialState = {
    categories:[],
    isError:false,
    isSuccess:false,
    isPending:false,
    createdCategory:"",
    categorytitle:"",
    updatedCategory:"",
    deletedStatus:"",
    message:""
}

export const resetState = createAction("Reset_all")

export const getCategoryList = createAsyncThunk("category/getallCategory",async (thunkAPI)=>{
    try {
        return await categoryService.categorylist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


export const createCategory = createAsyncThunk("category/createCategory",async(categoryData,thunkAPI)=>{
    try {
        return await categoryService.createService(categoryData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const getCategory = createAsyncThunk("category/getCategory",async(categoryId,thunkAPI)=>{
    try {
        return await categoryService.getCategoryService(categoryId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const updateCategory = createAsyncThunk("category/updateCategory",async(categoryData,thunkAPI)=>{
    try {
        return await categoryService.updateCategoryService(categoryData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteCategory = createAsyncThunk("category/deleteCategory",async(categoryId,thunkAPI)=>{
    try {
        return await categoryService.deleteCategoryService(categoryId)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const categorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getCategoryList.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getCategoryList.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.categories = action.payload
        })
        .addCase(getCategoryList.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(createCategory.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(createCategory.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.createdCategory = "Success"
        })
        .addCase(createCategory.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(resetState,()=>initialState)
        builder.addCase(getCategory.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getCategory.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.categorytitle = action.payload.title
        })
        .addCase(getCategory.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(updateCategory.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(updateCategory.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.updatedCategory = action.payload
        })
        .addCase(updateCategory.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(deleteCategory.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(deleteCategory.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.deletedStatus = "Success"
        })
        .addCase(deleteCategory.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default categorySlice.reducer