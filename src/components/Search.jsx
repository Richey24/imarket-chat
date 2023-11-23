import React, { useContext, useState, useEffect } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      const result = await axios.post("https://market-server.azurewebsites.net/api/auth/login", {
        email: currentUser.user?.email === "uahomorejoice@gmail.com" ? "rejoiceua@gmail.com" : "uahomorejoice@gmail.com",
        password: "Rejoice11#"
      });
      setUser(result.data.user)
      console.log(result.data.user);
    })()
  }, [])

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.user._id > user._id
        ? currentUser.user._id + user._id
        : user._id + currentUser.user._id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.user._id), {
          [combinedId + ".userInfo"]: {
            uid: user._id,
            firstname: user.firstname,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user._id), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.user._id,
            firstname: currentUser.user.firstname,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) { }

    setUser(null);
    setUsername("")
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          {/* <img src={user.photoURL} alt="" /> */}
          <div className="userChatInfo">
            <span>{user.firstname}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
