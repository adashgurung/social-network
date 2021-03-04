import React, { useState } from "react";
import { Avatar, Button } from "@material-ui/core";
import "./ImageUpload.css";

import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { useStateValue } from "./StateProvider";

function ImageUpload() {
  const [{ user }, dispatch] = useStateValue();

  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState("");

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () => {};

  return (
    <div className="imageUpload">
      <div className="imageUpload__top">
        <Avatar src={user.photoURL} />
        {/* CAPTION */}
        <input
          type="text"
          placeholder={`What's on your mind, ${user.displayName}?`}
          onChange={(e) => setCaption(e.target.value)}
          value={caption}
        />
      </div>

      <div className="imageUpload__bottom">
        <div className="imageUpload__icon">
          <lable htmlFor="fileInput">
            <AddAPhotoIcon
              style={{
                cursor: "pointer",
                fontSize: "50px" /* , color: "#2e81f4"  */,
              }}
            />
            <h3>Add Image</h3>
          </lable>

          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <div className="imageUpload__button">
          <Button type="submit" onClick={handleUpload}>
            post
          </Button>
        </div>
      </div>

      {/*  <progress className="imageUpload__progress" value={progress} max="100" /> */}
    </div>
  );
}
export default ImageUpload;
