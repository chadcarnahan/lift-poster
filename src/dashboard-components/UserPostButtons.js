import React from "react";
import { Box, Button } from "@material-ui/core";
import CommentIcon from "@material-ui/icons/Comment";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { pushLikes, removeLikes } from "../firebase";
import { useState } from "react";
const UserPostButtons = ({
  setCommentToggle,
  commentToggle,
  id,
  likes,
  user,
  commentID,
  functionLike,
  functionUnlike,
  state,
}) => {
  const [liked, setLiked] = useState(likes.includes(user?.uid));
  const [numLikes, setNumLikes] = useState(likes.length);
  const showComment = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCommentToggle(!commentToggle);
  };
  const likePost = (postID, userID, e) => {
    if (state === "postview") {
      setLiked(!liked);
      likes.includes(user?.uid) === false
        ? functionLike(postID, user.uid, commentID) &&
          setNumLikes(likes.length + 1)
        : functionUnlike(postID, user.uid, commentID) &&
          setNumLikes(likes.length - 1);
    } else {
      e.stopPropagation();
      e.preventDefault();
      setLiked(!liked);
      likes.includes(userID) === false
        ? pushLikes(postID, userID) && setNumLikes(likes.length + 1)
        : removeLikes(postID, userID) && setNumLikes(likes.length - 1);
    }
  };

  return (
    <Box display="flex" mt={1} alignContent="flex-start">
      <Button onClick={(e) => showComment(e)}>
        <CommentIcon />
      </Button>
      <Button
        style={{ backgroundColor: "transparent" }}
        onClick={(e) => likePost(id, user?.uid, e)}
      >
        <FavoriteIcon color={liked === true ? "secondary" : ""} />
      </Button>
      <p>{numLikes}</p>
    </Box>
  );
};

export default UserPostButtons;
