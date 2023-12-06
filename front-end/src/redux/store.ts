import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./slices/chatSlice";
import userReducer from "./slices/userSlice";
import teamReducer from "./slices/teamSlice";

const store=configureStore({
    reducer: {
        chat: chatReducer,
        users: userReducer,
        teams: teamReducer,
    },
})

export default store;
