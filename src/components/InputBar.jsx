import React, { useContext, useState } from "react";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { AuthContext } from "../context/AuthContext";
import { Image, Send } from "@mui/icons-material";
// import { v4 } from "uuid";
// import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const InputBar = () => {
  const {
    combindedId,
    currentUser,
    messageColor,
    setUrl,
    setSendImage,
    setImageFile,
    setCaption
  } = useContext(AuthContext);

  const [text, setText] = useState("");

  const sendHandler = async () => {
    const write = text;
    setText("");
    text &&
      (await updateDoc(doc(db, "chats", combindedId), {
        message: arrayUnion({
          text: write,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      }));
  };

  const keyHandler = async (e) => {
    if (e.code === "Enter") {
      const write = text;
      setText("");
      text &&
        (await updateDoc(doc(db, "chats", combindedId), {
          message: arrayUnion({
            text: write,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setImageFile(file)
    const reader = new FileReader();
    reader.onload = () => {
      setUrl(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
    setCaption(false)
    setSendImage(true);
  };

  return (
    <div className="input-bar">
      <input
        type="text"
        placeholder="Type Something"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={keyHandler}
      />
      <div className="send">
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <label htmlFor="file">
          <Image style={{ color: "gray" }} />
        </label>
        <button onClick={sendHandler}>
          <Send style={{ color: messageColor }} />
        </button>
      </div>
    </div>
  );
};

export default InputBar;
