// TeamModal.tsx
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addTeam } from "../redux/slices/teamSlice";

interface TeamModalProps {
  show: boolean;
  onHide: () => void;
  users: any[];
}
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


const TeamModal: React.FC<TeamModalProps> = ({ show, onHide, users }) => {
    const dispatch=useDispatch();
  const [teamname, setTeamname] = useState("");
  const [teamAvatar, setTeamAvatar] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleUserCheckboxChange = (userId: number) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const handleTeamAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTeamSubmit = (selectedUsers: number[]) => {
    if (teamname) {
      const newTeam: Team = {
        id: Math.random(),
        name: teamname,
        avatar: teamAvatar,
        users: users.filter((user: User) => selectedUsers.includes(user?._id)),
      };
      console.log('newTeam', newTeam);
      dispatch(addTeam(newTeam));
      setTeamname("");
      setTeamAvatar("");
      setSelectedUsers([]);
    } else {
      alert("Teamname is missing");
    }
  };

  const handleSubmit = () => {
    if (teamname) {
      handleTeamSubmit(selectedUsers);
    } else {
      alert("Teamname is missing");
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Team</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column justify-content-center align-items-center">
          {teamAvatar ? (
            <img src={teamAvatar} className="team-avatar" width={120} />
          ) : (
            <input
              type="file"
              onChange={handleTeamAvatarChange}
              accept=".jpg, .jpeg, .png, .svg, .pdf"
              className="team-avatar"
            />
          )}
          <label htmlFor="teamName" className="form-label mt-3">
            Team Name:
          </label>
          <input
            type="text"
            id="teamName"
            className="form-control"
            value={teamname}
            onChange={(e) => setTeamname(e.target.value)}
          />
          <div className="mt-3">
            <label className="form-label">Select Users:</label>
            {users?.map((user: any) => (
              <div key={user?._id} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`userCheckbox-${user._id}`}
                  checked={selectedUsers.includes(user._id)}
                  onChange={() => handleUserCheckboxChange(user._id)}
                />
                <label
                  className="form-check-label"
                  htmlFor={`userCheckbox-${user.id}`}
                >
                  {user.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TeamModal;
