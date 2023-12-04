import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import userReducer from "./slices/userSlice";


const store=configureStore({
    reducer: {
        chat: chatReducer,
        users: userReducer,
    },
})

export default store;
