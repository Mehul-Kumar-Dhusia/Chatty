import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Close, Send } from "@mui/icons-material";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../Firebase";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";

const ImageUpload = () => {
  const { url, setSendImage, imageFile, combindedId, currentUser,setCaption,caption,setLoadImage } =
    useContext(AuthContext);
  function closeHanlder() {
    setSendImage(false);
    setLoadImage(false)
  }
  async function imageUploadHandler() {
    setSendImage(false);
    setLoadImage(true)
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    setLoadImage(false)
    await updateDoc(doc(db, "chats", combindedId), {
      message: arrayUnion({
        text: caption,
        senderId: currentUser.uid,
        date: Timestamp.now(),
        image: downloadURL,
      }),
    });
  }
  return (
    <div className="image-upload">
      <div style={{ position: "relative" }}>
        <div onClick={closeHanlder}>
          <Close
            style={{ fontSize: "1.75rem" }}
            className="image-upload-close"
          />
        </div>
        <div className="image-upload-input">
          <img src={url} alt="" />
          <form>
            <input
              onChange={e => setCaption(e.target.value)}
              type="text"
              placeholder="Enter caption"
            />
            <button onClick={imageUploadHandler} className="image-upload-send">
              <Send style={{ fontSize: "1.5rem" }} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
