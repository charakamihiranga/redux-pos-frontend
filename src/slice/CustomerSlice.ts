import {CustomerModel} from "../model/CustomerModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const initialState: CustomerModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/customer"
});

export const saveCustomer = createAsyncThunk(
    'customer/saveCustomer',
    async (customer: CustomerModel) => {
        try {
            const response = await api.post('/add', customer);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const getAllCustomers =  createAsyncThunk(
    'customer/getAllCustomers',
    async () => {
        try {
            const response = await api.get('/all');
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (customer: CustomerModel) => {
        try {
            const response = await api.put(`/update/${customer.id}`, customer);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deleteCustomer = createAsyncThunk(
    'customer/removeCustomer',
    async (id: string) => {
        try {
            const response = await api.delete(`/remove/${id}`);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Customer saved successfully");
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                alert("Error saving customer");
            })
            .addCase(saveCustomer.pending, (state, action) => {
                console.log("Saving customer...");
            });
        builder
            .addCase(getAllCustomers.fulfilled, (state, action) => {
                action.payload.forEach((customer: CustomerModel) => {
                    state.push(customer);
                });
            })
            .addCase(getAllCustomers.rejected, (state, action) => {
                alert("Error fetching customers");
            })
            .addCase(getAllCustomers.pending, (state, action) => {
                console.log("Fetching customers...");
            });
        builder
            .addCase(updateCustomer.fulfilled, (state, action) => {
                const index = state.findIndex((customer: CustomerModel) => customer.id === action.payload.id);
                state[index] = action.payload;
                alert("Customer updated successfully");
            })
            .addCase(updateCustomer.rejected, (state, action) => {
                alert("Error updating customer");
            })
            .addCase(updateCustomer.pending, (state, action) => {
                console.log("Updating customer...");
            });
        builder
            .addCase(deleteCustomer.fulfilled, (state, action) => {
                const index = state.findIndex((customer: CustomerModel) => customer.id === action.payload.id);
                state.splice(index, 1);
                alert("Customer deleted successfully");
            })
            .addCase(deleteCustomer.rejected, (state, action) => {
                alert("Error deleting customer");
            })
            .addCase(deleteCustomer.pending, (state, action) => {
                console.log("Deleting customer...");
            });
    }

});


export default customerSlice.reducer;