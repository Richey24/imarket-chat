import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

import logo from "../img/logo.png"
import Alert from "../components/Alert";




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
    <div className="form" >
      <div className="auth-container d-flex" style={{ marginTop: '10%'}}>
          <div className="container mx-auto align-self-center">
            <div className="row">
              <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-8 col-12 d-flex flex-column align-self-center mx-auto">
                <div className="card mt-3 mb-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12 mb-3 text-center">
                        <img style={{ width: "320px" }} src={logo} alt="" />
                        <hr />
                        <h2>Sign In</h2>
                        <p>Enter your email and password to login</p>
                        {err && <Alert>Something went wrong</Alert>       }
                      </div>
                      
                      <form onSubmit={handleSubmit}>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-4">
                          <label className="form-label">Password</label>
                          <input type="password" className="form-control" />
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-3">
                          <div className="form-check form-check-primary form-check-inline">
                            <input className="form-check-input me-3" type="checkbox" id="form-check-default" />
                            <label className="form-check-label" htmlFor="form-check-default">
                              Remember me
                            </label>
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <div className="mb-4">
                          <button className="btn btn-primary w-100">SIGN IN</button>
                         
                        </div>
                      </div>
                      </form>
                      <div className="col-12">
                        <div className="text-center">
                          <p className="mb-0">Don't have an account?<Link to="/register">Register</Link></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
  </div>  
  );
};

export default Login;
