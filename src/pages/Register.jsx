import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [err, setErr] = useState(false);
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams()


  useEffect(() => {
    if (params.get("vendorToken") && params.get("customerToken")) {
      (async () => {
        try {
          const result = await axios.get("https://market-server.azurewebsites.net/api/auth/me", {
            headers: {
              Authorization: `Bearer ${params.get("vendorToken")}`
            }
          })
          const vendorObj = {
            user: {
              email: result.data.user.email,
              firstname: result.data.user.firstname,
              _id: result.data.user._id,
            }
          }
          const cusResult = await axios.get("https://market-server.azurewebsites.net/api/auth/me", {
            headers: {
              Authorization: `Bearer ${params.get("customerToken")}`
            }
          })
          const customerObj = {
            user: {
              email: cusResult.data.user.email,
              firstname: cusResult.data.user.firstname,
              _id: cusResult.data.user._id,
            }
          }
          const combinedId =
            vendorObj.user._id > customerObj.user._id
              ? vendorObj.user._id + customerObj.user._id
              : customerObj.user._id + vendorObj.user._id;

          const res = await getDoc(doc(db, "chats", combinedId));
          if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
            const vendorRes = await getDoc(doc(db, "userChats", vendorObj.user?._id));
            const customerRes = await getDoc(doc(db, "userChats", customerObj.user?._id));

            if (!vendorRes.exists()) {
              await setDoc(doc(db, "userChats", vendorObj.user?._id), {})
            }
            if (!customerRes.exists()) {
              await setDoc(doc(db, "userChats", customerObj.user?._id), {})
            }
            //create user chats
            await updateDoc(doc(db, "userChats", vendorObj.user._id), {
              [combinedId + ".userInfo"]: {
                uid: customerObj.user._id,
                firstname: customerObj.user.firstname,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
            await updateDoc(doc(db, "userChats", customerObj.user._id), {
              [combinedId + ".userInfo"]: {
                uid: vendorObj.user._id,
                firstname: vendorObj.user.firstname,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
          }
        } catch (err) {
          setErr(true)
        }
      })()
    } else {
      navigate("/login")
    }
  }, [])

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ishop Chat</span>
        {
          !err ? (
            <h1 style={{ color: "#5d5b8d", fontSize: "24px" }}>Creating Account...</h1>
          ) : (
            <h1 style={{ color: "red", fontSize: "18px" }}>Something went wrong</h1>
          )
        }
        {!err && <span className="title">You will be redirected when it is done</span>}
      </div>
    </div>
  );
};

export default Register;
