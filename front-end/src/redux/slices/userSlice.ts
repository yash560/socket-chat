import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface User {
  id: number;
  name: string;
  avatar: string;
  online?: boolean;
}

interface UserState {
  users: User[];
  currentUser: any;
}

const storedUserString = localStorage.getItem('currUser');
const storedUserObject = storedUserString ? JSON.parse(storedUserString) : null;

const initialState: UserState = {
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
  ],
  currentUser: storedUserObject
};
const userSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    setCurrentUser: (state, action: PayloadAction<User | null>) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setUsers, addUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
