import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../Firebase";
import React from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [messageUser, setMessageUser] = useState(null);
  const [combindedId, setCombinedId] = useState("");
  const [expand, setExpand] = useState(false);
  const [messageColor, setMessageColor] = useState("");
  const [dark, setDark] = useState(false);
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  const [visitProfile, setVisitProfile] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [topBarExpand, setTopBarExpand] = useState(false);
  const [userList, setUserList] = useState([]);
  const [searchClick, setSearchClick] = useState(false);
  const [sendImage , setSendImage] = useState(false)
  const [imageFile , setImageFile] = useState(null)
  const [caption,setCaption] = useState('')
  const [loadImage ,setLoadImage] = useState(false)

  useEffect(() => {
    function doSomething() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setCurrentUser(user);
          setId(user.uid);
        } else {
          setCurrentUser(null);
          setId("");
        }
      });
    }
    doSomething();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        id,
        messageUser,
        setMessageUser,
        combindedId,
        setCombinedId,
        url,
        setUrl,
        expand,
        setExpand,
        messageColor,
        setMessageColor,
        dark,
        setDark,
        visitProfile,
        setVisitProfile,
        userProfile,
        setUserProfile,
        topBarExpand,
        setTopBarExpand,
        userList,
        setUserList,
        searchClick,
        setSearchClick,
        sendImage,
        setSendImage,
        imageFile,
        setImageFile,
        caption,
        setCaption,
        loadImage,
        setLoadImage
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
