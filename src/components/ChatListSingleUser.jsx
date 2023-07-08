import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { AccountCircle } from "@mui/icons-material";

const ChatListSingleUser = ({ item }) => {
  const { setMessageUser, setCombinedId, currentUser } =
    useContext(AuthContext);
  const [last, setLast] = useState("");
  useEffect(() => {
    setLast(item.lastMessage);
  }, [item]);
  const clickHandler = async () => {
    setMessageUser(item);
    const cId =
      currentUser.uid > item.id
        ? currentUser.uid + item.id
        : item.id + currentUser.uid;
    setCombinedId(cId);
    const res = await getDoc(doc(db, "chats", cId));

    if (!res.data()) {
      setDoc(doc(db, "chats", cId), {
        message: [],
      });
    }
  };
  return (
    <div onClick={clickHandler} className="chat-list-single-user">
      <div className="chat-list-single-user-image">
        {item.photoURL ? <img src={item.photoURL} alt="" /> : <div className="no-photo"><AccountCircle style={{width:"50px",height:"50px",color:"gray"}} /></div>}
      </div>
      <div className="chat-list-single-user-info">
        <div>
          <div>{item.name}</div>
          <p style={{ fontSize: "14px", color: "black", fontWeight: "300" }}>
            last message
          </p>
        </div>
        {item.time && (
              <div className="chat-list-time">
                {`${item.time
                  .toDate()
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${item.time
                  .toDate()
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`}
              </div>
            )}
      </div>
    </div>
  );
};

export default ChatListSingleUser;
