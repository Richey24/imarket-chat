import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const [params, setParams] = useSearchParams()
  const navigate = useNavigate();

  useEffect(() => {
    if (params.get("token")) {
      (async () => {
        const result = await axios.get("https://market-server.azurewebsites.net/api/auth/me", {
          headers: {
            Authorization: `Bearer ${params.get("token")}`
          }
        })
        const obj = {
          user: {
            email: result.data.user.email,
            firstname: result.data.user.firstname,
            _id: result.data.user._id,
          }
        }
        localStorage.setItem("user", JSON.stringify(obj))
        window.location.replace("/")
      })()
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Ishop Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
