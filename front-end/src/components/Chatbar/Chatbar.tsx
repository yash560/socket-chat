import "./Chatbar.css";
import {useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { addMessage } from "../../redux/slices/chatSlice";

const currUser={
  id: 101,
  name: 'User name',
  avatar: 'none'
}
const Chatbar = () => {
  const dispatch=useDispatch();
  const activeChat = useSelector((state: any) => state.chat.activeChat);
  const messages=useSelector((state: any)=> state.chat.messages);
  const [currMessage, setCurrMessage]=useState("");
  const sendMessage=()=>{
    if(activeChat){
      const newMessage={
        id: messages.length+1,
        sender: currUser,
        receiver: activeChat,
        content: currMessage,
      }
      dispatch(addMessage(newMessage));
      setCurrMessage('');
    }
  }

  return (
    <div className="chatbar_container">
      {activeChat? (
        <div className="">
        <div className="d-flex bg-light justify-content-between align-items-center p-2 border border-2 border-bottom border-gray">
          <div className="d-flex">
            <img src="/assets/user.png" alt="user" width={40} />
            <p className="m-auto ms-2">{activeChat?.name}</p>
          </div>

          <div className="d-flex flex-row">
            <AddIcon style={{ fontSize: "1.5rem" }} />
          </div>
        </div>
        <div className="chat_messages">
        {
          messages?.map((message: any) => (
            <div
              key={message.id}
              className={`message ${
                message.sender.id === currUser.id ? "sent" : "received"
              }`}
            >
              <img src="/assets/user.png" className="message_image" alt="user" width={40} />
              <span>
                {message.content}
              </span>
            </div>
          ))}
        </div>

        <div className="chat_input">
          <input type="file" className="" hidden id="attach-file" />
          <label htmlFor="attach-file">
          {/* <AttachmentIcon style={{fontSize: "1.5rem"}} /> */}
          </label>
          <input
            type="text"
            placeholder="Type your message here ..."
            className="chat_input_field"
            value={currMessage}
            onChange={(e)=> setCurrMessage(e.target.value)}
            onKeyPress={(e)=> {
              if(e.key=="Enter") sendMessage()
            }}
          />
          <button className="chat_send" onClick={sendMessage}>
            <SendIcon style={{fontSize: '1.6rem'}} />
          </button>
        </div>
      </div>
      ): (
        <div className="none-selected">
          Select a User/Team to start chatting
        </div>
      )}
      
    </div>
  );
};

export default Chatbar;
