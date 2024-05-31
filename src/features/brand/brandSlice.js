import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import brandService from "./brandService";


const initialState = {
    brands:[],
    isError:false,
    isSuccess:false,
    isPending:false,
    brandtitle:"",
    updateBrand:"",
    createdBrand:"",
    deletedBrand:"",
    message:""
}

export const resetState = createAction("Reset_all")

export const createBrand = createAsyncThunk("brand/createbrand",async(brandData,thunkAPI)=>{
    try {
        return await brandService.createBrand(brandData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const updateBrand = createAsyncThunk("brand/updatebrand",async(brandId,thunkAPI)=>{
    try {
        return await brandService.updateBrand(brandId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const getBrandList = createAsyncThunk("brand/getallBrand",async (thunkAPI)=>{
    try {
        return await brandService.brandlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const getBrand = createAsyncThunk("brand/getBrand",async(id,thunkAPI)=>{
    try {
        return await brandService.getBrand(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export const deleteBrand = createAsyncThunk('brand/deleteBrand',async(id,thunkAPI)=>{
    try {
        return await brandService.deleteBrand(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const brandSlice = createSlice({
    name:"brand",
    initialState,
    extraReducers: (builder)=>{
        builder.addCase(getBrandList.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getBrandList.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.brands = action.payload
        })
        .addCase(getBrandList.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(createBrand.pending,(state)=>{
            state.isError = false
            state.isPending = true
            state.isSuccess = false
        })
        .addCase(createBrand.fulfilled,(state,action)=>{
            state.isSuccess = true
            state.isError = false
            state.isPending = false
            console.log(action.payload);
            state.createdBrand = "Success"
        })
        .addCase(createBrand.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(getBrand.pending,(state)=>{
            state.isError = false
            state.isPending = true
            state.isSuccess = false
        })
        .addCase(getBrand.fulfilled,(state,action)=>{
            state.isSuccess = true
            state.isError = false
            state.isPending = false
            state.brandtitle = action.payload.title
        })
        .addCase(getBrand.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(updateBrand.pending,(state)=>{
            state.isError = false
            state.isPending = true
            state.isSuccess = false
        })
        .addCase(updateBrand.fulfilled,(state,action)=>{
            state.isSuccess = true
            state.isError = false
            state.isPending = false
            state.updateBrand = action.payload
        })
        .addCase(updateBrand.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(deleteBrand.pending,(state)=>{
            state.isError = false
            state.isPending = true
            state.isSuccess = false
        })
        .addCase(deleteBrand.fulfilled,(state,action)=>{
            state.isSuccess = true
            state.isError = false
            state.isPending = false
            state.deletedBrand = "Success"
        })
        .addCase(deleteBrand.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(resetState,()=>initialState)
    }
})

export default brandSlice.reducer