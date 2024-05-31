import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import colorService from "./colorService";

const initialState = {
    colors:[],
    isError:false,
    isSuccess:false,
    isPending:false,
    createdColor:"",
    deletedColorStatus:"",
    updatedColor:"",
    message:""
}

export const resetState = createAction("Reset_All")

export const getColorList = createAsyncThunk("color/getallcolors",async (thunkAPI)=>{
    try {
        return await colorService.colorlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})


export const createColor = createAsyncThunk("color/createColor",async(colorData,thunkAPI)=>{
    try {
        return await colorService.createColor(colorData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const getColor = createAsyncThunk("color/getColor",async(colorId,thunkAPI)=>{
    try {
        return await colorService.getColor(colorId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const deleteColor = createAsyncThunk("color/deleteColor",async(colorId,thunkAPI)=>{
    try {
        return await colorService.deleteColor(colorId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

const colorSlice = createSlice({
    name:"color",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getColorList.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getColorList.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.colors = action.payload
        })
        .addCase(getColorList.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(createColor.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(createColor.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.createdColor = "Success"
        })
        .addCase(createColor.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(getColor.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getColor.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.updatedColor = action.payload.title
        })
        .addCase(getColor.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(resetState,()=>initialState)
        builder.addCase(deleteColor.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(deleteColor.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.deletedColorStatus = "Success"
        })
        .addCase(deleteColor.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default colorSlice.reducer