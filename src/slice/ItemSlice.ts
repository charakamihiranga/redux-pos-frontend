import axios from "axios";
import {ItemModel} from "../model/ItemModel.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";


const initialState: ItemModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/item"
});

export const saveItem = createAsyncThunk(
    'item/saveItem',
    async (item: ItemModel) => {
        try {
            const response = await api.post('/add', item);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const getAllItems =  createAsyncThunk(
    'item/getAllItems',
    async () => {
        try {
            const response = await api.get('/all');
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const updateItem = createAsyncThunk(
    'item/updateItem',
    async (item: ItemModel) => {
        try {
            const response = await api.put(`/update/${item.id}`, item);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);

export const deleteItem = createAsyncThunk(
    'item/removeItem',
    async (id: string) => {
        try {
            const response = await api.delete(`/remove/${id}`);
            return response.data;
        } catch (error) {
            return console.log('error', error)
        }
    }
);


const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(saveItem.fulfilled, (state, action) => {
                state.push(action.payload);
                alert("Item saved successfully");
            })
            .addCase(saveItem.rejected, (state, action) => {
                alert("Error saving item");
            })
            .addCase(saveItem.pending, (state, action) => {
                console.log("Saving item...");
            });
        builder
            .addCase(getAllItems.fulfilled, (state, action) => {
                action.payload.forEach((item: ItemModel) => {
                    state.push(item);
                });
            })
            .addCase(getAllItems.rejected, (state, action) => {
                alert("Error getting items");
            })
            .addCase(getAllItems.pending, (state, action) => {
                console.log("Getting items...");
            });
        builder
            .addCase(updateItem.fulfilled, (state, action) => {
                const index = state.findIndex(item => item.id === action.payload.id);
                state[index] = action.payload;
                alert("Item updated successfully");
            })
            .addCase(updateItem.rejected, (state, action) => {
                alert("Error updating item");
            })
            .addCase(updateItem.pending, (state, action) => {
                console.log("Updating item...");
            });
        builder
            .addCase(deleteItem.fulfilled, (state, action) => {
                const index = state.findIndex(item => item.id === action.payload.id);
                state.splice(index, 1);
                alert("Item deleted successfully");
            })
            .addCase(deleteItem.rejected, (state, action) => {
                alert("Error deleting item");
            })
            .addCase(deleteItem.pending, (state, action) => {
                console.log("Deleting item...");
            });
    }
});

export default itemSlice.reducer;
