import React, { useContext, useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../Firebase";
import { AuthContext } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { MoreVert, Search } from "@mui/icons-material";
import { color } from "../ColorData";

const Navbar = () => {
  const { expand, setExpand, setDark, dark, setVisitProfile, id, setSearchClick } =
    useContext(AuthContext);

  const [colorExpand, setColorExpand] = useState(false);
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const singleData = await getDoc(doc(db, "users", id));
      setData(singleData.data());
    };
    fetchData();
  }, [id]);

  function varyColorHandler(color) {
    document.documentElement.style.setProperty("--secondary", color);
  }
  function darkModeHandler() {
    setDark(!dark);
    document.documentElement.style.setProperty(
      "--primary",
      `${!dark ? "#111b21" : "white"}`
    );
    document.documentElement.style.setProperty(
      "--tertiary",
      `${!dark ? "#202c33" : "#f0f2f5"}`
    );
    document.documentElement.style.setProperty(
      "--background-color",
      `${!dark ? "#0b141a" : "#efeae2"}`
    );
    document.documentElement.style.setProperty(
      "--fourth",
      `${!dark ? "#202c33" : "rgb(228,227,227)"}`
    );
    document.documentElement.style.setProperty(
      "--color",
      `${!dark ? "white" : "black"}`
    );
    document.documentElement.style.setProperty(
      "--message",
      `${!dark ? "#202c33" : "white"}`
    );
  }

  return (
    <div className="navbar">
      <div onClick={() => setVisitProfile(true)} className="navbar-profile">
        <div style={{height:"45px",width:"45px",borderRadius:"50%"}}>
        {data.photoURL && (
          <img className="navbar-profile-img" src={data.photoURL} alt="" />
        )}
        </div>
      </div>
      <div className="navbar-icon-container">
        <button className="navbar-icon" onClick={()=> setSearchClick(true)}><Search /></button>
        <button
          onClick={() => {
            setExpand(!expand);
            setColorExpand(false);
          }}
          className="navbar-icon navbar-dropdown"
        >
          <MoreVert />
          {expand && (
            <div className="navbar-dropdown-content">
              <div
                onClick={() => setVisitProfile(true)}
                className="dropdown-child"
              >
                Profile
              </div>

              <div
                onMouseEnter={() => setColorExpand(true)}
                onMouseLeave={() => setColorExpand(false)}
                onClick={() => setColorExpand(true)}
                className="dropdown-child mobile-not-show"
                style={{ position: "relative" }}
              >
                Message Color
                {colorExpand && (
                  <div className="message-color-container">
                    {color.map((data) => (
                      <div
                        onMouseEnter={() => varyColorHandler(data)}
                        className="message-color-box"
                        style={{ backgroundColor: data }}
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              <div onClick={darkModeHandler} className="dropdown-child">
                {!dark ? "Dark" : "Light"} mode
              </div>
              <div className="dropdown-child" onClick={() => signOut(auth)}>
                Logout
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
