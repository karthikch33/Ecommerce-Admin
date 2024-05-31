import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

const initialState = {
    images:[],
    isError:false,
    isSuccess:false,
    isPending:false,
    message:""
}

export const resetStateUpload = createAction("Reset_All")


export const uploadImg = createAsyncThunk("upload/images",async (data, thunkAPI)=>{
    try {
        console.log(data);
        const formData = new FormData();
        data.forEach(element => {
            formData.append("images",element)
        })
        return await uploadService.uploadImg(formData)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const deleteImg = createAsyncThunk("delete/images",async (id, thunkAPI)=>{
    try {
        console.log(id);
        return await uploadService.deleteImg(id)
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

const uploadSlice = createSlice({
    name:"images",
    initialState,
    reducers:{
        resetStateUpload:(state)=>initialState
    },
    extraReducers: (builder)=>{
        builder.addCase(uploadImg.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(uploadImg.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.images =  [...state.images,...action.payload.data] 
        })
        .addCase(uploadImg.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(deleteImg.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(deleteImg.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.images = state.images.filter((element)=>element?.public_id !== action.payload)
        })
        .addCase(deleteImg.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default uploadSlice.reducer