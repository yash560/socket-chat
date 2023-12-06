import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Team{
    id: number,
    name: string,
    avatar: string,
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
        },
        {
          id: 2,
          name: "Team-2",
          avatar: "",
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
