import {configureStore} from "@reduxjs/toolkit";
import customerSlice from "../slice/CustomerSlice.ts";
import itemSlice from "../slice/ItemSlice.ts";

export const store = configureStore({
    reducer :{
        customer : customerSlice,
        item : itemSlice
    }
});

export type AppDispatch = typeof store.dispatch;