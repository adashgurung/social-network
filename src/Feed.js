import React, { useEffect, useState } from "react";
import "./Feed.css";
import { db } from "./firebase";
import ImageUpload from "./ImageUpload";
import Post from "./Post";
import FlipMove from "react-flip-move";
function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })))
      );
  }, []);

  return (
    <div className="feed">
      <ImageUpload />
      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            postId={post.id}
            profilePic={post.data.profilePic}
            propsImageUrl={post.data.imageUrl}
            username={post.data.username}
            timestamp={post.data.timestamp}
            caption={post.data.caption}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
