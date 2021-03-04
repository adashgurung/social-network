import { Avatar, IconButton } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React, { forwardRef, useEffect, useState } from "react";
import firebase from "firebase";
import "./Post.css";
import FlipMove from "react-flip-move";

import NearMeIcon from "@material-ui/icons/NearMe";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";

import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import { useStateValue } from "./StateProvider";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";

import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { db } from "./firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const Post = forwardRef(
  (
    { postId, profilePic, propsImageUrl, username, timestamp, caption },
    ref
  ) => {
    const [{ user }, dispatch] = useStateValue();

    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);

    const [like, setLike] = useState(0);

    const [open, setOpen] = useState(false);

    const classes = useStyles();
    const [openDel, setOpenDel] = useState(false);
    const handleClick = () => {
      setOpenDel(!openDel);
    };

    const openCommentInput = (e) => {
      e.preventDefault();
      setOpen(true);
    };

    useEffect(() => {
      let unsubscribe;
      if (postId) {
        unsubscribe = db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .orderBy("timestamp", "desc")
          .onSnapshot((snapshot) => {
            setComments(snapshot.docs.map((doc) => doc.data()));
          });
      }

      return () => {
        unsubscribe();
      };
    }, [postId]);

    const postComment = (e) => {
      e.preventDefault();
      db.collection("posts").doc(postId).collection("comments").add({
        text: comment,
        username: user.displayName,
        userPic: user.photoURL,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setComment("");
    };

    const addLikes = () => {
      setLike(like + 1);
    };

    const deletePost = () => {
      db.collection("posts").doc(postId).delete();
    };

    return (
      <div ref={ref} className="post">
        <div className="post__top">
          <Avatar src={profilePic} className="post__avatar" />
          <div className="post__topInfo">
            <h3>{username}</h3>
            <p>{new Date(timestamp?.toDate()).toUTCString()}</p>
          </div>

          <div className="post__delete">
            <IconButton onClick={handleClick}>
              <MoreHorizIcon />
            </IconButton>
            <Collapse in={openDel} timeout="auto" unmountOnExit>
              <IconButton>
                <DeleteForeverIcon onClick={deletePost} />
              </IconButton>
              <IconButton>
                <EditIcon />
              </IconButton>
            </Collapse>
          </div>
        </div>

        <div className="post__bottom">
          <p>{caption}</p>
        </div>

        <div className="post__image">
          <img src={propsImageUrl} alt="" />
        </div>

        <div className="post__options">
          <div className="post__option">
            <ThumbUpAltOutlinedIcon onClick={addLikes} />
            {like}
            <p>Like</p>
          </div>

          <div onClick={openCommentInput} className="post__option">
            <ChatBubbleOutlineIcon />
            <p>Comment</p>
          </div>

          <div className="post__option">
            <NearMeIcon />
            <p>Share</p>
          </div>
        </div>
        <div className="post__comments">
          <FlipMove>
            {comments.map((comment) => (
              <div>
                <div className="post__comments__top">
                  <Avatar src={comment.userPic} />
                  <div className="post__comments__bottom">
                    <b>{comment.username}</b>
                    <p>{comment.text}</p>
                  </div>
                </div>

                {/* <small>{comment?.timestamp}
            {comment.commentTimestamp}</small> */}
              </div>
            ))}
          </FlipMove>
        </div>

        <div
          className={open ? "post__commentFormOpen" : "post__commentFormClose"}
        >
          {open == true ? (
            <>
              <Avatar src={user.photoURL} />
              <form className="post__commentBox">
                <input
                  className="post__input"
                  type="text"
                  placeholder="Write a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />

                <button
                  disabled={!comment}
                  className="post__button"
                  type="submit"
                  onClick={postComment}
                >
                  Post
                </button>
              </form>
            </>
          ) : (
            open == true
          )}
        </div>
      </div>
    );
  }
);
export default Post;
