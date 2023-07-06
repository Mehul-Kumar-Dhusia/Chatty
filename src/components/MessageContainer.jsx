import React, { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../Firebase";
import Message from "./Message";
import { Oval } from "react-loader-spinner";

const MessageContainer = () => {
  const messageRef = useRef();

  const { combindedId, messageUser, setTopBarExpand, url ,loadImage} =
    useContext(AuthContext);

  const [user, setUser] = useState(null);

  useEffect(() => {
    function getData() {
      const unsub = onSnapshot(doc(db, "chats", combindedId), (doc) => {
        setUser(doc.data());
      });
      return () => {
        unsub();
      };
    }
    messageUser.id && getData();
  }, [messageUser, combindedId]);

  useEffect(() => {
    const scrollToBottom = () => {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    };
    scrollToBottom();
  }, [user]);

  return (
    <div
      onClick={() => setTopBarExpand(false)}
      ref={messageRef}
      className="message-container"
    >
      {user && user.message.map((data) => <Message data={data} />)}
      {loadImage && <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div className="load-message-image">
          <img src={url} alt="" />
          <div className="load-image-loading">
            <Oval color="black" secondaryColor="gray" />
          </div>
        </div>
      </div>}
    </div>
  );
};

export default MessageContainer;
