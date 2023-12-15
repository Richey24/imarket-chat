import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          console.log(percent);
        },
        (error) => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  const sendWithEnter = (e) => {
    const code = (e.keyCode ? e.keyCode : e.which);
    if (code == 13) { //Enter keycode
      handleSend()
    }
  }

  const chatFooterDisplayStyle = currentUser ? { display: 'block' } : { display: 'none' };

  return (
    <>
      <div className="chat-footer chat-active" >
          <div className="chat-input">
            <div className="chat-form">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              <input
                  type="text" 
                  className="mail-write-box form-control" 
                  placeholder="Type something..."
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={sendWithEnter}
                  value={text}/>
            </div>
          </div>
        </div>
        {/* <div className="input">
            <input
              type="text"
              placeholder="Type something..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={sendWithEnter}
              value={text}
            />
            <div className="send">
              <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
              />
              <label htmlFor="file">
                <img src={Img} alt="" />
              </label>
              <button disabled={text ? false : img ? false : true} style={{ backgroundColor: text ? "blue" : img ? "blue" : "", borderRadius: "12px" }} onClick={handleSend}>Send</button>
            </div>
        </div> */}
    </>

  );
};

export default Input;
