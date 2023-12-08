// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setActiveChat } from "../../redux/slices/chatSlice";
// import AddIcon from "@mui/icons-material/Add";
// import "./Sidebar.css";
// import { addUser, setUsers } from "../../redux/slices/userSlice";
// import { addTeam } from "../../redux/slices/teamSlice";
// import axios from "axios";

// interface User {
//   id: number;
//   name: string;
//   avatar: string;
//   online?: boolean;
// }

// interface Team {
//   id: number;
//   name: string;
//   avatar: string;
//   users: User[];
// }


// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const [searchQuery, setSearchQuery] = useState("");
//   const [username, setUsername] = useState("");
//   const [userAvatar, setUserAvatar]=useState("");
//   const [teamname, setTeamname] = useState("");
//   const [teamAvatar ,setTeamAvatar]=useState("");
//   const users = useSelector((state: any) => state.users.users);
//   const teams=useSelector((state: any)=> state.teams.teams);


//   useEffect(() => {
//     const fetchUsers = async ()=> {
//       try {
//         const response = await axios.get('http://localhost:5000/api/user/all');        
//         dispatch(setUsers(response.data));
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };
//     fetchUsers();
//   }, [dispatch]);

//   const handleUserClick = (user: User) => {
//     dispatch(setActiveChat(user));
//   };

//   const handleTeamClick = (team: Team) => {
//     dispatch(setActiveChat(team));
//   };

//   const handleUserSubmit = () => {
//     if (username && userAvatar) {
//       dispatch(addUser({ id: Math.random(), name: username, avatar: userAvatar }));
//       setUsername("");
//       setUserAvatar("");
//     } else {
//       alert("Username or user avatar is missing");
//     }
//   };
  
//   const handleTeamSubmit = () => {
//     if (teamname) {
//       dispatch(addTeam({ id: Math.random(), name: teamname, avatar: teamAvatar, users: [] }));
//       setTeamname("");
//       setTeamAvatar("");
//     } else {
//       alert("Teamname or team avatar is missing");
//     }
//   };

//   const handleUserAvatar=(e: any)=>{
//     e.preventDefault();
//     const uploadedImage=e.target.files[0];
//     if(!uploadedImage) return;
//     const fileReader=new FileReader();
//     fileReader.readAsDataURL(uploadedImage);
//     fileReader.addEventListener("load", function(){
//       setUserAvatar(this.result as string);
//     })
//   }
//   const handleTeamAvatar=(e: any)=>{
//     e.preventDefault();
//     const uploadedImage=e.target.files[0];
//     if(!uploadedImage) return;
//     const fileReader=new FileReader();
//     fileReader.readAsDataURL(uploadedImage);
//     fileReader.addEventListener("load", function(){
//       setTeamAvatar(this.result as string);
//     })
//   }


//   return (
//     <div
//       className={`sidebar_container border border-2 border-right border-gray`}
//     >
//       <div className="sidebar_heading">
//         <input
//           type="text"
//           className="sidebar_input"
//           placeholder="Search..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>
//       <div className="d-flex justify-content-between align-items-center px-2">
//         <h3 className="teams_title">Teams</h3>
//         <button
//           type="button"
//           className="border border-0"
//           data-bs-toggle="modal"
//           data-bs-target="#teamModal"
//         >
//           <AddIcon
//             style={{
//               fontSize: "1.2rem",
//               backgroundColor: "lightgray",
//               borderRadius: "5px",
//             }}
//           />
//         </button>
//       </div>

//       {teams?.map((team: Team) => (
//         <div
//           key={team.id}
//           className="card mb-1"
//           style={{ maxWidth: "540px" }}
//           onClick={() => handleTeamClick(team)}
//         >
//           <div className="row g-0">
//             <div className="col-md-3 d-flex justify-content-start align-items-center">
//               <img
//                 src={`${team.avatar? team.avatar: "/assets/user.png"}`}
//                 className="m-2 img-fluid rounded-circle"
//                 alt="..."
//                 width={40}
//               />
//             </div>
//             <div className="col-md-8">
//               <div className="card-body">
//                 <p className="card-title">{team.name}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Team Modal */}
//       <div
//         className="modal fade"
//         id="teamModal"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabIndex={-1}
//         aria-labelledby="teamModalLabel"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h1 className="modal-title fs-5" id="teamModalLabel">
//                 Add Team
//               </h1>
//               <button
//                 type="button"
//                 className="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>

//             <div className="modal-body d-flex flex-column justify-content-center align-items-center">
//             {teamAvatar? (
//               <img src={teamAvatar} className="team-avatar" width={120} />
//             ): (
//               <input
//               type="file"
//               onChange={handleTeamAvatar}
//               accept=".jpg, .jpeg, .png, .svg, .pdf"
//               id="teamAvatar"
//               className="teamAvatar"
//               />
//             )}
//               <label htmlFor="teamName" className="form-label">
//                 Team Name:
//               </label>
//               <input
//                 type="text"
//                 id="teamName"
//                 className="form-control"
//                 value={teamname}
//                 onChange={(e) => setTeamname(e.target.value)}
//               />
//             </div>

//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 className="btn btn-primary"
//                 onClick={handleTeamSubmit}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="d-flex justify-content-between align-items-center px-2 mt-4">
//         <h3 className="users_title">Users</h3>
//         <button
//           type="button"
//           className="border border-0"
//           data-bs-toggle="modal"
//           data-bs-target="#userModal"
//         >
//           <AddIcon
//             style={{
//               fontSize: "1.2rem",
//               backgroundColor: "lightgray",
//               borderRadius: "5px",
//             }}
//           />
//         </button>

//         {/* User Modal */}
//         <div
//           className="modal fade"
//           id="userModal"
//           data-bs-backdrop="static"
//           data-bs-keyboard="false"
//           tabIndex={-1}
//           aria-labelledby="userModalLabel"
//           aria-hidden="true"
//         >
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h1 className="modal-title fs-5" id="userModalLabel">
//                   Add User
//                 </h1>
//                 <button
//                   type="button"
//                   className="btn-close"
//                   data-bs-dismiss="modal"
//                   aria-label="Close"
//                 ></button>
//               </div>

//               <div className="modal-body d-flex flex-column justify-content-center align-items-center">
//               {userAvatar? (
//               <img src={userAvatar} className="user-avatar" width={120} />
//             ): (
//               <input
//               type="file"
//               onChange={handleUserAvatar}
//               accept=".jpg, .jpeg, .png, .svg, .pdf"
//               id="userAvatar"
//               className="userAvatar"
//               />
//             )}
//                 <label htmlFor="userName" className="form-label">
//                   User Name:
//                 </label>
//                 <input
//                   type="text"
//                   id="userName"
//                   className="form-control"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                 />
//               </div>

//               <div className="modal-footer">
//                 <button
//                   type="button"
//                   className="btn btn-secondary"
//                   data-bs-dismiss="modal"
//                 >
//                   Close
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={handleUserSubmit}
//                 >
//                   Submit
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {users?.map((user: User) => (
//         <div
//           key={user.id}
//           className="card mb-1"
//           style={{ maxWidth: "540px" }}
//           onClick={() => handleUserClick(user)}
//         >
//           <div className="row g-0">
//             <div className="col-md-3 d-flex align-items-center">
//             <div className="position-relative">
//                 <img
//                   src={`${user.avatar ? user.avatar : "/assets/user.png"}`}
//                   className="m-2 img-fluid rounded-circle"
//                   alt="..."
//                   width={40}
//                 />
//                 {user?.online && (
//                   <div className="online-indicator"></div>
//                 )}
//               </div>
//             </div>
//             <div className="col-md-8">
//               <div className="card-body">
//                 <p className="card-title">{user.name}</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Sidebar;

// Sidebar.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../redux/slices/chatSlice";
import AddIcon from "@mui/icons-material/Add";
import "./Sidebar.css";
import { addUser, setUsers } from "../../redux/slices/userSlice";
import { addTeam } from "../../redux/slices/teamSlice";
import axios from "axios";
import TeamModal from "../TeamModal";

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
  users: User[];
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState("");
  const [username, setUsername] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [showTeamModal, setShowTeamModal] = useState(false);
  const users = useSelector((state: any) => state.users.users);
  const teams = useSelector((state: any) => state.teams.teams);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/user/all");
        dispatch(setUsers(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, [dispatch]);

  const handleUserClick = (user: User) => {
    dispatch(setActiveChat(user));
  };

  const handleTeamClick = (team: Team) => {
    dispatch(setActiveChat(team));
  };

  const handleUserSubmit = () => {
    if (username && userAvatar) {
      dispatch(addUser({ id: Math.random(), name: username, avatar: userAvatar }));
      setUsername("");
      setUserAvatar("");
    } else {
      alert("Username or user avatar is missing");
    }
  };

  const handleUserAvatar = (e: any) => {
    const uploadedImage = e.target.files[0];
    if (!uploadedImage) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(uploadedImage);
    fileReader.addEventListener("load", function () {
      setUserAvatar(this.result as string);
    });
  };

  return (
    <div className={`sidebar_container border border-2 border-right border-gray`}>
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
        <button
          type="button"
          className="border border-0"
          onClick={() => setShowTeamModal(true)}
        >
          <AddIcon
            style={{
              fontSize: "1.2rem",
              backgroundColor: "lightgray",
              borderRadius: "5px",
            }}
          />
        </button>
      </div>
      <TeamModal
        show={showTeamModal}
        onHide={() => setShowTeamModal(false)}
        users={users}
      />
      {teams?.map((team: Team) => (
        <div
          key={team.id}
          className="card mb-1"
          style={{ maxWidth: "540px" }}
          onClick={() => handleTeamClick(team)}
        >
          <div className="row g-0">
            <div className="col-md-3 d-flex justify-content-start align-items-center">
              <img
                src={`${team.avatar ? team.avatar : "/assets/user.png"}`}
                className="m-2 img-fluid rounded-circle"
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
          data-bs-target="#userModal"
        >
          <AddIcon
            style={{
              fontSize: "1.2rem",
              backgroundColor: "lightgray",
              borderRadius: "5px",
            }}
          />
        </button>
        {/* User Modal */}
        <div
          className="modal fade"
          id="userModal"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex={-1}
          aria-labelledby="userModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="userModalLabel">
                  Add User
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body d-flex flex-column justify-content-center align-items-center">
                {userAvatar ? (
                  <img src={userAvatar} className="user-avatar" width={120} />
                ) : (
                  <input
                    type="file"
                    onChange={handleUserAvatar}
                    accept=".jpg, .jpeg, .png, .svg, .pdf"
                    id="userAvatar"
                    className="userAvatar"
                  />
                )}
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
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUserSubmit}
                >
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
              <div className="position-relative">
                <img
                  src={`${user.avatar ? user.avatar : "/assets/user.png"}`}
                  className="m-2 img-fluid rounded-circle"
                  alt="..."
                  width={40}
                />
                {user?.online && <div className="online-indicator"></div>}
              </div>
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
