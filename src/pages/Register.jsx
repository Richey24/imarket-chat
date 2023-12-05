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
          const res = await createUserWithEmailAndPassword(auth, email, password);

          await setDoc(doc(db, "users", res.user.uid), {
            uid: res.user.uid,
            displayName,
            email,
          });

          //create empty user chats on firestore
          await setDoc(doc(db, "userChats", res.user.uid), {});
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
