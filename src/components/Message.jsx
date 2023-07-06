import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Message = ({ data }) => {
  const { currentUser, messageColor } = useContext(AuthContext);

  return (
    <div
      style={{ backgroundColor: messageColor }}
      className={`message ${data.senderId === currentUser.uid && "owner"}`}
    >
      {data.image && (
        <div className="message-image-container">
          <img src={data.image} alt="" />
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",padding:"0px 5px"}}>
            <div>{data.text}</div>
            {data.date && (
              <div className="message-time">
                {`${data.date
                  .toDate()
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${data.date
                  .toDate()
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`}
              </div>
            )}
          </div>
        </div>
      )}

      {!data.image && (
        <p>
          <div style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
            <div>{data.text}</div>
            {data.date && (
              <div className="message-time">
                {`${data.date
                  .toDate()
                  .getHours()
                  .toString()
                  .padStart(2, "0")}:${data.date
                  .toDate()
                  .getMinutes()
                  .toString()
                  .padStart(2, "0")}`}
              </div>
            )}
          </div>
        </p>
      )}
    </div>
  );
};

export default Message;
