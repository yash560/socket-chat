import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../redux/slices/chatSlice";
import AddIcon from "@mui/icons-material/Add";
import "./Sidebar.css";
import { addUser } from "../../redux/slices/userSlice";


interface User {
  id: number;
  name: string;
  avatar: string;
}
interface Team {
  id: number;
  name: string;
  avatar: string;
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername]=useState("");
  const users = useSelector((state: any) => state.users.users);

  const handleUserClick = (user: User) => {
    dispatch(setActiveChat(user));
  };
  const handleTeamClick = (team: Team) => {
    dispatch(setActiveChat(team));
  };

  const handleUserSubmit = () => {
    dispatch(addUser({ id: Math.random(), name: username, avatar: "" }));
    setUsername("");
  };

  const addTeam = () => {};

  const teams = [
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
    {
      id: 3,
      name: "Team-3",
      avatar: "",
    },
  ];

  return (
    <div
      className={`sidebar_container border border-2 border-right border-gray`}
    >
      <div className="sidebar_heading">
        <input
          type="text"
          className="sidebar_input"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="d-flex justify-content-between align-items-center px-2">
        <h3 className="teams_title">Teams</h3>
        <div onClick={addTeam}>
          <AddIcon
            style={{
              fontSize: "1.2rem",
              backgroundColor: "lightgray",
              borderRadius: "5px",
            }}
          />
        </div>
      </div>

      {teams?.map((team) => (
        <div
          key={team.id}
          className="card mb-1"
          style={{ maxWidth: "540px" }}
          onClick={() => handleTeamClick(team)}
        >
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
      <div className="d-flex justify-content-between align-items-center px-2 mt-4">
        <h3 className="users_title">Users</h3>
        <button
          type="button"
          className="border border-0"
          data-bs-toggle="modal"
          data-bs-target="#staticBackdrop"
        >
          <AddIcon
            style={{
              fontSize: "1.2rem",
              backgroundColor: "lightgray",
              borderRadius: "5px",
            }}
          />
        </button>

        <div
          className="modal fade"
          id="staticBackdrop"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="staticBackdropLabel">
                  Add User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <label htmlFor="userName" className="form-label">
                  User Name:
                </label>
                <input
                  type="text"
                  id="userName"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={handleUserSubmit}>
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {users?.map((user: User) => (
        <div
          key={user.id}
          className="card mb-1"
          style={{ maxWidth: "540px" }}
          onClick={() => handleUserClick(user)}
        >
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
