import React, { forwardRef, useState } from "react";
import { Avatar, Button, IconButton } from "@material-ui/core";
import "./ImageUpload.css";
import MicIcon from "@material-ui/icons/Mic";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useStateValue } from "./StateProvider";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

import firebase from "firebase";
import { db, storage } from "./firebase";

const ImageUpload = () => {
  /* const { transcript, resetTranscript } = useSpeechRecognition();
  SpeechRecognition.startListening({ continuous: true }); */

  const [{ user }, dispatch] = useStateValue();

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);

      const selectedImage = URL.createObjectURL(e.target.files[0]);

      const imagePreview = document.getElementById("image-preview");

      imagePreview.src = selectedImage;
      /*     imagePreview.style.display = "block"; */
    }
  };

  const handleUpload = () => {
    if (image && caption) {
      const uploadTask = storage.ref(`images/${image.name}`).put(image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          //progress function
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          //error function
          /*  console.log(error); */
          alert(error.message);
        },
        () => {
          //final part: get download url and upload the post info
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              //post image inside db
              db.collection("posts").add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                caption: caption,
                imageUrl: url,
                profilePic: user.photoURL,
                username: user.displayName,
              });

              setProgress(0);
              setCaption("");
              setImage(null);
            });
        }
      );
    }
  };

  return (
    <div /* ref={ref} */ className="imageUpload">
      <div className="imageUpload__top">
        <div className="imageUpload__avatar">
          <Avatar src={user.photoURL} />
        </div>
        <div className="imageUpload__caption">
          {/* CAPTION */}
          <input
            type="text"
            placeholder={`What's on your mind, ${user.displayName}?`}
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
          />

          <IconButton>
            <MicIcon
              onClick={SpeechRecognition.startListening}
              className="chat__mic"
            />
          </IconButton>
          {/*       <p> text{transcript}</p> */}
        </div>
      </div>

      <div className="imageUpload__bottom">
        <div className="imageUpload__icon">
          <label htmlFor="fileInput">
            <AddAPhotoIcon
              style={{
                cursor: "pointer",
                fontSize: "50px",
              }}
            />
            <h3>Add Image</h3>
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="imageUpload__imagePreview">
          <img id="image-preview" src="" alt="" />
          <div className="imageUpload__progress">
            <progress
              /* value="50" */
              className="imageUpload__progress"
              value={progress}
              max="100"
            />
            <div className="progress__loadingNumber">
              {progress != 0 ? progress : "0%"}
            </div>
          </div>
        </div>

        <div className="imageUpload__button">
          <Button type="submit" onClick={handleUpload}>
            post
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ImageUpload;
