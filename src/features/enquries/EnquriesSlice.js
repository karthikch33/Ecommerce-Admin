import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import EnquiryService from "./EnquriesService";

const initialState = {
    Enquries:[],
    isError:false,
    isSuccess:false,
    isPending:false,
    message:""
}

export const resetState = createAction("Reset_All")


export const getEnquiryList = createAsyncThunk("enquiry/getallEnquiry",async (thunkAPI)=>{
    try {
        return await EnquiryService.enquriylist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const EnqurieSlice = createSlice({
    name:"enquiry",
    initialState,
    reducers:{
        resetState:(state)=>initialState
    },
    extraReducers: (builder)=>{
        builder.addCase(getEnquiryList.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getEnquiryList.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.Enquries = action.payload
        })
        .addCase(getEnquiryList.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default EnqurieSlice.reducer