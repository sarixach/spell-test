import React from "react";
import "./Sidebar.css";
import InboxIcon from "@mui/icons-material/Inbox";
import StarIcon from "@mui/icons-material/Star";
import {useHistory, useLocation} from "react-router-dom";

function Sidebar() {
    const history = useHistory();
    const location = useLocation();

    const SidebarOption = ({Icon, title, selected = false, onClick}) => {
        return (
            <div onClick={onClick} className={`sidebarOption ${selected && "sidebarOption--active"}`}>
                <Icon/>
                <h3>{title}</h3>
            </div>
        );
    };

    return (
        <div className="sidebar">

            <SidebarOption
                Icon={InboxIcon}
                title="Home"
                selected={location.pathname === '/'}
                onClick={() => history.push("/")}
            />
            <SidebarOption
                Icon={StarIcon}
                title="Favourites"
                selected={location.pathname === '/favourites'}
                onClick={() => history.push("/favourites")}
            />
        </div>
    );
}

export default Sidebar;
