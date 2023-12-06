import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
    id: number;
    name: string;
    avatar: string;
    online?: boolean;
}
interface Team {
  id: number;
  name: string;
  avatar: string;
}
interface Message{
  id: number;
  sender: User | Team;
  receiver: User | Team;
  content: string;
  image?: string | null;
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
    },
    addMessage: (state, action: PayloadAction<Message>)=>{
      state.messages.push(action.payload);
    }
  },
});

export const { setActiveChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
