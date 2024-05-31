import { createAction, createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import productService from "./productService";


const initialState = {
    products:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    updatedTitle:"",
    updatedDescription:"",
    updatedPrice:"",
    updatedBrand:"",
    updatedCategory:"",
    updatedQuantity:"",
    updatedTags:"",
    deletedProductStatus:"",
    message:"",
    createdProduct:""
}

export const resetState = createAction("Reset_all")


export const getProducts = createAsyncThunk("product/getallproducts",async (thunkAPI)=>{
    try {
        return await productService.productlists()
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})


export const createProduct = createAsyncThunk("product/createProduct",async (data,thunkAPI)=>{
    try {
        return await productService.createProduct(data)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})


export const getProduct = createAsyncThunk("product/getProduct",async(prodcutId,thunkAPI)=>{
    try {
        return await productService.getProductService(prodcutId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const updateProduct = createAsyncThunk("product/updateProduct",async(updatedProductData,thunkAPI)=>{
    try {
        return await productService.updateProductService(updatedProductData)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})


export const deleteProduct = createAsyncThunk("coupon/deleteCoupon",async (productId,thunkAPI)=>{
    try {
        return await productService.deleteProductService(productId)
    } catch (error) {
        thunkAPI.rejectWithValue(error)
    }
})

export const productSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getProducts.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(getProducts.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.products = action.payload
        })
        .addCase(getProducts.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(deleteProduct.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(deleteProduct.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = false;
            state.deletedProductStatus = "Success"
        })
        .addCase(deleteProduct.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(createProduct.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(createProduct.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            state.createdProduct = "Success"
        })
        .addCase(createProduct.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(getProduct.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(getProduct.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true;
            console.log(action.payload);
            state.updatedBrand = action.payload?.brand
            state.updatedCategory = action.payload?.category
            state.updatedDescription = action.payload?.description
            state.updatedPrice = action.payload?.price
            state.updatedTags = action.payload?.tags
            state.updatedQuantity = action.payload?.quantity
            state.updatedTitle = action?.payload?.title
        })
        .addCase(getProduct.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error
        })
        builder.addCase(updateProduct.pending,(state)=>{
            state.isError = false;
            state.isLoading = true;
            state.isSuccess = false;
        })
        .addCase(updateProduct.fulfilled,(state,action)=>{
            state.isError = false;
            state.isLoading = false;
            state.isSuccess = true
            state.updatedTitle = action.payload?.title
            state.updatedBrand = action.payload?.brand
            state.updatedCategory = action.payload?.category
            state.updatedDescription = action.payload?.description
            state.updatedPrice = action.payload?.price
            state.updatedTags = action.payload?.tags
            state.updatedQuantity = action.payload?.quantity
        })
        .addCase(updateProduct.rejected,(state,action)=>{
            state.isError = true;
            state.isLoading = false;
            state.isSuccess = false;
            state.message = action.error
        })
    }
})

export default productSlice.reducer