import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
    customers:[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
}

export const resetState = createAction("Reset_All")


export const customerSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        resetState:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder.addCase(getUsers.pending,(state)=>{
            state.isLoading=true;
        })
        .addCase(getUsers.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;  
            state.isSuccess = true;
            state.customers=action.payload
        })
        .addCase(getUsers.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})

export const getUsers = createAsyncThunk("user/allusers",async (thunkAPI)=>{
    try {
        const value =await customerService.getUsers()
        return  value;
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

export default customerSlice.reducer;