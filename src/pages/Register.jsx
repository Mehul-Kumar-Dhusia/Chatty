import React, { useContext, useState } from "react";
import add from "../img/addAvatar.png";
import { auth, storage, db } from "../Firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {
  ref,
  getDownloadURL,
  uploadBytes
} from "firebase/storage";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { v4 } from "uuid";
import Loading from "../components/Loading";

const Register = () => {
  const [err, setError] = useState("");
  const navigate = useNavigate();
  const { setMessageUser, setDark } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [show, setShow] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [load , setLoad] = useState(false)

  const submitHandler = async (e) => {
    setLoad(true)
    setDark(false);
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);

      updateProfile(data.user, {
        displayName: name,
        photoURL: imageUrl,
      });
      setDoc(doc(db, "users", data.user.uid), {
        id: data.user.uid,
        name: name,
        email: email,
        photoURL: imageUrl,
        lastMessage : " ",
        time : Timestamp.now()
      });
      setMessageUser(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleFileChange = async (e) => {
    setShow(true);
    setUploading(true);
    const file = e.target.files[0];
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    setImageUrl(downloadURL);
    setUploading(false);
  };

  const renderComponent = () => {
    if (show === false) {
      return (
        <label htmlFor="file">
          <img src={add} alt="" />
          <span>Add your Image</span>
        </label>
      );
    } else if (uploading) {
      return (
        <p
          style={{ fontWeight: "bold", textAlign: "center", fontSize: "15px" }}
        >
          Uploading
        </p>
      );
    } else {
      return (
        <label>
          <img
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={imageUrl}
            alt=""
          />
          <span className="register-show-name">
            Image Uploaded Successfully
          </span>
        </label>
      );
    }
  };

  return (
    <div className="register">
      {load ? <Loading /> :  <div className="wrapper">
        <h1>Chatty</h1>
        <span>Register</span>
        <form onSubmit={submitHandler}>
          <input type="text" placeholder="name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input
            onChange={handleFileChange}
            type="file"
            id="file"
            style={{ display: "none" }}
          />
          {renderComponent()}
          <p style={{ color: "red" }}>{err}</p>
          <button>Sign Up</button>
        </form>
        <p>
          Have an account ?{" "}
          <Link style={{ textDecoration: "none", fontWeight: "500" }} to="/">
            Login
          </Link>
        </p>
      </div>}
    </div>
  );
};

export default Register;

// Some Images are not uploading so not using this method

// const storageRef = ref(storage, v4());
// const uploadTask = uploadBytesResumable(storageRef, file);
// uploadTask.on("state_changed", async () => {
//   try {
//     const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
//     setUploading(false)
//     setImageUrl(downloadURL);
//   } catch (err) {
//     console.log(err);
//   }
// });
