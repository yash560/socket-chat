import "./Menubar.css";
import GridViewIcon from "@mui/icons-material/GridView";
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import EmailIcon from '@mui/icons-material/Email';
import ChatIcon from '@mui/icons-material/Chat';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ContactsIcon from '@mui/icons-material/Contacts';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function Menubar() {
  return (
    <div className="menubar_container">
      <div className="d-flex align-items-center">
        <img src="/assets/logo.png" width={50} alt="logo" />
        <h5 className="menubar_title">Psymate</h5>
      </div>
      <div className="menubar_components">
        <div className="menubar_item">
          <GridViewIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">Dashboard</h6>
        </div>
        <div className="menubar_item">
          <ShoppingCartIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">E-Commerce</h6>
        </div>
        <div className="menubar_item">
          <EditCalendarIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">Calendar</h6>
        </div>
        <div className="menubar_item">
          <EmailIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">Mail</h6>
        </div>
        <div className="menubar_item">
          <ChatIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">Chat</h6>
        </div>
        <div className="menubar_item">
          <AssignmentIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">Tasks</h6>
        </div>
        <div className="menubar_item">
          <WorkOutlineIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">Projects</h6>
        </div>
        <div className="menubar_item">
          <FileCopyIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">File Manager</h6>
        </div>
        <div className="menubar_item">
          <TextSnippetIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">Notes</h6>
        </div>
        <div className="menubar_item">
          <ContactsIcon style={{ fontSize: "1.5rem" }} />
          <h6 className="menubar_itemname">Contacts</h6>
        </div>
      </div>
    </div>
  );
}

export default Menubar;
