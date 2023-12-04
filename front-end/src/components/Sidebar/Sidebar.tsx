import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import {setActiveChat} from '../../redux/slices/chatSlice';
import "./Sidebar.css";

interface User{
  id: number;
  name: string;
  avatar: string;
}
interface Team{
  id: number;
  name: string;
  avatar: string;
}

const Sidebar = () => {
  const dispatch=useDispatch();
  const [searchQuery, setSearchQuery]=useState("");
  const handleUserClick=(user: User)=>{
    dispatch(setActiveChat(user));
  }
  const handleTeamClick=(team: Team)=>{
    dispatch(setActiveChat(team));
  }

  const users = [
    {
      id: 1,
      name: "User-1",
      avatar: ''
    },
    {
      id: 2,
      name: "User-2",
      avatar: ''
    },
    {
      id: 3,
      name: "User-3",
      avatar: ''
    },
    {
      id: 4,
      name: "User-4",
      avatar: ''
    },
    {
      id: 5,
      name: "User-5",
      avatar: ''
    },
  ];
  const teams = [
    {
      id: 1,
      name: "Team-1",
      avatar: ''
    },
    {
      id: 2,
      name: "Team-2",
      avatar: ''
    },
    {
      id: 3,
      name: "Team-3",
      avatar: ''
    },
  ];

  return (
    <div className={`sidebar_container`}>
      <div className="sidebar_heading">
        <input type="text" className="sidebar_input" placeholder="Search..." value={searchQuery} onChange={(e)=> setSearchQuery(e.target.value)} />
      </div>
      <h3 className="teams_title">Teams</h3>
      {teams?.map((team) => (
        <div key={team.id} className="card mb-1" style={{ maxWidth: "540px" }} onClick={()=> handleTeamClick(team)}>
          <div className="row g-0">
            <div className="col-md-3 d-flex justify-content-start align-items-center">
              <img
                src="/assets/user.png"
                className="m-2 img-fluid rounded-start"
                alt="..."
                width={40}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-title">{team.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <h3 className="users_title">Users</h3>
      {users?.map((user) => (
        <div key={user.id} className="card mb-1" style={{ maxWidth: "540px" }} onClick={()=> handleUserClick(user)}>
          <div className="row g-0">
            <div className="col-md-3 d-flex align-items-center">
              <img
                src="/assets/user.png"
                className="m-2 img-fluid rounded-start"
                alt="..."
                width={40}
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <p className="card-title">{user.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
