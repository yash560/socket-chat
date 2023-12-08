import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  _id?:any;
    id: number;
    name: string;
    avatar: string;
    online?: boolean;
}
interface Team {
  _id?:any;
  id: number;
  name: string;
  avatar: string;
  users: User[];
}
interface Message{
  _id?:any;
  id: number;
  sender: User | Team;
  receiver: User | Team;
  content: string;
  image?: string | null;
  isDeleted?: boolean;
}

interface ChatState {
  activeChat: User | Team | null;
  messages: Message[]
}

const initialState: ChatState = {
  activeChat: null,
  messages: []
};

const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<User | Team | null>) => {
      state.activeChat = action.payload;
      state.messages=[];
    },
    addMessage: (state, action: PayloadAction<Message>)=>{
      state.messages.push(action.payload);
    },
    updateMessage: (state, action) => {
      const { messageId, updatedMessage } = action.payload;
      const index = state.messages.findIndex(
        (message: Message) => message?._id === messageId
      );

      if (index !== -1) {
        state.messages[index] = updatedMessage;
      }
    },
  },
});

export const { setActiveChat, addMessage, updateMessage } = chatSlice.actions;
export default chatSlice.reducer;
