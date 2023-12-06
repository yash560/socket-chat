import "./Chatbar.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import AttachmentIcon from "@mui/icons-material/Attachment";
import { addMessage } from "../../redux/slices/chatSlice";
import socketIOClient from "socket.io-client";

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

interface Message {
  id: number;
  sender: User | Team;
  receiver: User | Team;
  content: string;
  image?: string | null;
}

const Chatbar = () => {
  const socket = socketIOClient("http://localhost:5000"); // backend URL
  const currUser = useSelector((state: any) => state.users.currentUser);
  console.log('currUser=>', currUser);

  const dispatch = useDispatch();
  const activeChat = useSelector((state: any) => state.chat.activeChat);
  const messages = useSelector((state: any) => state.chat.messages);
  const [currMessage, setCurrMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const sendMessage = () => {
    if (activeChat) {
      const newMessage = {
        id: messages.length + 1,
        sender: currUser,
        receiver: activeChat,
        content: currMessage,
        image: selectedFile ? URL.createObjectURL(selectedFile) : null,
      };

      dispatch(addMessage(newMessage));
      // Emit the user-message event to the server
      socket.emit("user-message", newMessage);
      setCurrMessage("");
      setSelectedFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    socket.emit("user-connect", currUser);

    // Clean up the connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, [currUser, socket]);

  useEffect(() => {
    socket.emit('user-message', {
      message: "A new client has landed on the chat page.",
    });
    socket.on('new-message', (message: Message) => {
      console.log('Received new-message:', message);
      if (
        (message.sender.id === currUser.id &&
          message?.receiver?.id === activeChat?.id) ||
        (message.receiver.id === currUser.id &&
          message?.sender?.id === activeChat?.id)
      ) {
        dispatch(addMessage(message));
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [dispatch, socket, activeChat, currUser.id]);

  return (
    <div className="chatbar_container">
      {activeChat ? (
        <div className="">
          <div className="d-flex bg-light justify-content-between align-items-center p-2 border border-2 border-bottom border-gray">
            <div className="d-flex">
              <img
                src={`${
                  activeChat.avatar ? activeChat.avatar : "/assets/user.png"
                }`}
                alt="user"
                width={40}
              />
              <p className="m-auto ms-2">{activeChat?.name}</p>
            </div>
          </div>
          <div className="chat_messages">
            {messages?.map((message: any) => (
              <div
                key={message.id}
                className={`message ${
                  message?.sender?._id === currUser?._id ? "sent" : "received"
                }`}
              >
                <img
                  src={`${
                    message?.sender?.id === currUser?.id
                      ? "/assets/user.png"
                      : activeChat.avatar
                  }`}
                  className="message_image rounded-circle"
                  alt="user"
                  width={40}
                />
                {message.image && (
                  <img src={message.image} alt="message" width={180} />
                )}
                <span>{message.content}</span>
              </div>
            ))}
          </div>

          <div className="chat_input">
            <div className="d-flex flex-row">
              <label htmlFor="attach-file">
                <AttachmentIcon
                  style={{ fontSize: "1.5rem", cursor: "pointer" }}
                />
              </label>
            </div>
            <input
              type="file"
              className="hidden"
              hidden
              id="attach-file"
              onChange={handleFileChange}
            />
            <input
              type="text"
              placeholder="Type your message here ..."
              className="chat_input_field"
              value={currMessage}
              onChange={(e) => setCurrMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            {selectedFile && (
              <div className="image-preview-container">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="preview"
                  width={150}
                  className="image-preview"
                />
              </div>
            )}
            <button className="chat_send" onClick={sendMessage}>
              <SendIcon style={{ fontSize: "1.6rem" }} />
            </button>
          </div>
        </div>
      ) : (
        <div className="none-selected">
          Select a User/Team to start chatting
        </div>
      )}
    </div>
  );
};

export default Chatbar;
