import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ArrowBack, MoreVert } from "@mui/icons-material";
import { color } from "../ColorData";
const ChatSectionTopBar = () => {
  const { messageUser, setMessageUser, setUserProfile,topBarExpand,setTopBarExpand,setSendImage} =
    useContext(AuthContext);
  const clickHanlder = () => {
    setMessageUser(null);
    setUserProfile(false);
    setSendImage(false)
  };

  function varyColorHandler(color){
    document.documentElement.style.setProperty('--secondary',color);
  }

  return (
    <div className="chat-section-top-bar">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div onClick={clickHanlder} className="chat-section-top-bar-arrow">
          <ArrowBack />
        </div>
        <div
          onClick={() => setUserProfile(true)}
          style={{ display: "flex", alignItems: "center" }}
        >
          {messageUser.photoURL && <img src={messageUser.photoURL} alt="" />}
          <div>{messageUser.name}</div>
        </div>
      </div>

      <button onClick={() => setTopBarExpand(!topBarExpand)} className="top-bar-dropdown">
        <MoreVert />
        {topBarExpand && (
          <div className="message-color-container-top-bar">
            {color.map((data) => (
              <div
                onMouseEnter={() => varyColorHandler(data)}
                className="message-color-box"
                style={{ backgroundColor: data }}
                ></div>
            ))}
          </div>
        )}
      </button>

      {/* <div className="chat-section-icons">
            <img src={cam} alt="" />
            <img src={add} alt="" />
            <img src={more} alt="" />
        </div> */}
    </div>
  );
};

export default ChatSectionTopBar;
