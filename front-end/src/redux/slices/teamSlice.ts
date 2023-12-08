import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface User {
    id: number;
    name: string;
    avatar: string;
    online?: boolean;
}
interface Team{
    id: number;
    name: string;
    avatar: string;
    users: User[];
}

interface TeamState{
    teams: Team[]
}
const initialState: TeamState={
    teams: [
        {
          id: 1,
          name: "Team-1",
          avatar: "",
          users: []
        },
        {
          id: 2,
          name: "Team-2",
          avatar: "",
          users: []
        },
      ]
}

const teamSlice=createSlice({
    name: "teams",
    initialState: initialState,
    reducers: {
        addTeam: (state, action: PayloadAction<Team>)=>{
            state.teams.push(action.payload);
        }
    }
})

export const {addTeam}=teamSlice.actions;
export default teamSlice.reducer;
