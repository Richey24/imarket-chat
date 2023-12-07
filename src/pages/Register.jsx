import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams()


  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(res.user, {
        displayName,
      });
      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch (error) {
      setErr(true);
      setLoading(false);
    }
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ishop Chat</span>
        <span className="title">Register</span>
        <form onSubmit={handleSubmit}>
          <input required type="text" placeholder="display name" />
          <input required type="email" placeholder="email" />
          <input required type="password" placeholder="password" />
          <button disabled={loading}>Sign up</button>
          {loading && "Loading..."}
          {err && <span>Something went wrong</span>}
        </form>
        <p>
          You do have an account? <Link to="/register">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
