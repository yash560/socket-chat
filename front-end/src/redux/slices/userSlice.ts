import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User{
    id: number;
    name: string;
    avatar: string;
}

interface UserState{
    users: User[]
}

const initialState: UserState={
    users: [
        {
          id: 1,
          name: "User-1",
          avatar: "",
        },
        {
          id: 2,
          name: "User-2",
          avatar: "",
        },
        {
          id: 3,
          name: "User-3",
          avatar: "",
        },
        {
          id: 4,
          name: "User-4",
          avatar: "",
        },
        {
          id: 5,
          name: "User-5",
          avatar: "",
        },
        {
            id: 6,
            name: "User-6",
            avatar: "",
          },
      ]
}
const userSlice=createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>)=>{
            state.users.push(action.payload);
        }
    }
})

export const {addUser}=userSlice.actions;
export default userSlice.reducer;
