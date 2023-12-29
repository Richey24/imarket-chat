import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate, } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect } from "react";

function App() {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children
  };

  useEffect(() => {
    /* eslint-disable-next-line no-restricted-globals */
    (async () => {
      const res = await getDoc(doc(db, "userChats", currentUser.uid));

      if (!res.exists()) {
        await setDoc(doc(db, "userChats", currentUser.uid), {})
      } else {
        Object.entries(res.data()).forEach(async (re) => {
          await updateDoc(doc(db, "userChats", re[1].userInfo.uid), {
            [re[0] + ".status"]: "online",
          });
        })
      }
    })()
  }, [])

  document.addEventListener("visibilitychange", async () => {
    if (currentUser) {
      const res = await getDoc(doc(db, "userChats", currentUser.uid));
      if (document.visibilityState === "hidden") {
        Object.entries(res.data()).forEach(async (re) => {
          await updateDoc(doc(db, "userChats", re[1].userInfo.uid), {
            [re[0] + ".status"]: "offline",
          });
        })
      } else {
        Object.entries(res.data()).forEach(async (re) => {
          await updateDoc(doc(db, "userChats", re[1].userInfo.uid), {
            [re[0] + ".status"]: "online",
          });
        })
      }
    }
  })

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
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
