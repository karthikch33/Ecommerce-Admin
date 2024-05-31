import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";


const getUserfromLocalStorage = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null;

const initialState = {
  user: '',
  orders:[],
  isError: false,
  isLoading: false,
  isSuccess: false,
  loginStatusCount:'',
  message: "",
};

export const resetState = createAction("Reset_all")

export const login = createAsyncThunk(
  "user/adminlogin",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "user/getorders",
  async (thunkAPI) => {
    try {
      return await authService.getOrders();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const activeStatus = createAsyncThunk("user/activeStatus", async (userId,thunkAPI)=>{
  try {
    return await authService.activeStatusService({_id:userId})
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const makeAdmins = createAsyncThunk("user/makeadmins", async (userId,thunkAPI)=>{
  try {
    console.log(userId);
    return await authService.makeAdminService({_id:userId})
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})


export const authSlice = createSlice({
  name: "auth",
  initialState: initialState, 
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action?.payload;
        state.loginStatusCount = action?.payload?.statusSent
        console.log(state.user);
        if(action.payload.statusSent===201){
          localStorage.setItem('user',JSON.stringify(action?.payload))
          toast.success('Admin Login Successfull')
        }
        else if(action.payload.statusSent===209){
          toast.warning('Users Not Allowed')
        }
        else{
          toast.info('Admin Details Error')
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.orders = null;
      })
      .addCase(activeStatus.pending,(state,action)=>{
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false 
      })
      .addCase(activeStatus.fulfilled,(state,action)=>{ 
        state.isError = false
        state.isLoading = false 
        state.isSuccess = true 
        if(action.payload?.status === 404){
          toast.error('Error Occured User Not Detected')
        }
      })
      .addCase(activeStatus.rejected,(state)=>{
        state.isError = true
        state.isLoading = false 
        state.isSuccess = false 
      })
      .addCase(makeAdmins.pending,(state,action)=>{
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false 
      })
      .addCase(makeAdmins.fulfilled,(state,action)=>{ 
        state.isError = false
        state.isLoading = false 
        state.isSuccess = true 
        if(action.payload?.status === 404){
          toast.error('User Not Detected')
        }
        else if(action.payload?.status === 201){
          toast.success("User Status Updated")
        }
        else if(action.payload?.status === 500){
          toast.error('Error Occured')
        }
      })
      .addCase(makeAdmins.rejected,(state)=>{
        state.isError = true
        state.isLoading = false 
        state.isSuccess = false 
      })
      builder.addCase(resetState,()=>initialState)
  },
});

export default authSlice.reducer;
