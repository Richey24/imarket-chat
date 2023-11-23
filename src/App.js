import Home from "./pages/Home";
import Login from "./pages/Login";
// import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect } from "react";

function App() {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };

  useEffect(() => {
    (async () => {
      const res = await getDoc(doc(db, "userChats", currentUser.user?._id));
      if (!res.exists()) {
        await setDoc(doc(db, "userChats", currentUser.user?._id), {})
      }
    })()
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          {/* <Route path="register" element={<Register />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
