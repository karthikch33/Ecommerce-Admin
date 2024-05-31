import { createSlice,createAsyncThunk, createAction } from "@reduxjs/toolkit";
import couponService from './couponService'

const initialState = {
    coupons:[],
    isError:false,
    isSuccess:false,
    isPending:false,
    createdCoupon:"",
    coupontitle:"",
    coupondiscount:"",
    couponcreateddate:"",
    message:""
}

export const resetState = createAction("Reset_All")

export const getCouponList = createAsyncThunk("coupon/getallCoupons",async (thunkAPI)=>{
    try {
        return await couponService.couponlist()
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
})

export const createCoupon = createAsyncThunk("coupon/createCoupon",async(couponData,thunkAPI)=>{
    try {
        return await couponService.createCoupon(couponData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const getCoupon = createAsyncThunk("coupon/getCoupon",async(couponId,thunkAPI)=>{
    try {
        return await couponService.getCoupon(couponId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const updateCoupon = createAsyncThunk("coupon/updateCoupon",async(couponData,thunkAPI)=>{
    try {
        return await couponService.updateCouponService(couponData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const deleteCoupon = createAsyncThunk("coupon/deleteCoupon",async (couponId,thunkAPI)=>{
    try {
        return await couponService.deleteCouponService(couponId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

const couponSlice = createSlice({
    name:"coupon",
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getCouponList.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getCouponList.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.coupons = action.payload
        })
        .addCase(getCouponList.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(createCoupon.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(createCoupon.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.createdCoupon = "Success"
        })
        .addCase(createCoupon.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        .addCase(resetState,()=>initialState)
        builder.addCase(getCoupon.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(getCoupon.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            state.coupontitle = action.payload?.name
            state.couponcreateddate = action.payload?.expiry
            state.coupondiscount = action.payload?.discount
        })
        .addCase(getCoupon.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(updateCoupon.pending,(state)=>{
            state.isPending = true;
            state.isError = false;
            state.isSuccess = false;
        })
        .addCase(updateCoupon.fulfilled,(state,action)=>{
            state.isSuccess = true;
            state.isError = false;
            state.isPending = false;
            // state.coupontitle = action.payload.name
            // state.couponcreateddate = action.payload.expiry
            // state.coupondiscount = action.payload.discount
        })
        .addCase(updateCoupon.rejected,(state,action)=>{
            state.isPending = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default couponSlice.reducer