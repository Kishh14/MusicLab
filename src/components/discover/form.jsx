import React, { useState } from "react";
import { storage, database } from "../../../firebase-config";
import {
  ref as stRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { ref as databaseRef, push } from "firebase/database";

import "./form.css";
import { useAuth } from "../../context/AuthContext";

const Form = ({ onClose }) => {
  const [userName, setUserName] = useState("");
  const [file, setFile] = useState(null);
  const [songName, setFileName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    setUserName(user.username);
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!file || !songName) {
      setError("Please fill in all required fields (Audio file, Song name)");
      setIsLoading(false);
      return;
    }
    if (!user.username) {
      setError("Login details not found, please login or signup!");
      setIsLoading(false);
      return;
    }

    try {
      const timestamp = Date.now();
      const uniqueFileName = `${timestamp}-${songName}`;

      const storageRef = stRef(storage, `audio/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload progress: ${progress}%`);
        },
        (error) => {
          setError(error.message);
          setIsLoading(false);
        },
        async () => {
          const downloadUrl = await getDownloadURL(storageRef);

          const fileData = {
            userName,
            songName,
            audioUrl: downloadUrl,
          };

          const dbRef = databaseRef(database, "audio");
          await push(dbRef, fileData);
          console.log("Audio uploaded successfully.");
          setIsLoading(false);

          setUserName("");
          setFileName("");
          setFile(null);
          onClose(); // close the modal
        }
      );
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-center my-4 text-1xl">Upload Your Song</h2>
      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Song name"
          className="inputField"
          value={songName}
          onChange={(e) => setFileName(e.target.value)}
          required
        />
        <input
          type="file"
          className="fileInputField"
          onChange={(e) => setFile(e.target.files[0])}
          accept="audio/*"
          required
        /><br/> 
        <button className="upload" type="submit" disabled={isLoading}>
          {isLoading ? "Uploading..." : "Submit"}
        </button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Form;
