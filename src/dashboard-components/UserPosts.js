import React from "react";
import { Box, makeStyles } from "@material-ui/core";
import ReplyComment from "./ReplyComment";
import Comment from "./Comment";
import { useState } from "react";
import "./feed.css";
import { Link } from "react-router-dom";
import { pushLikes, removeLikes } from "../firebase";
import UserPostButtons from "./UserPostButtons";
const UserPosts = ({
  user,
  description,
  liftName,
  likes,
  name,
  reps,
  rpe,
  weight,
  id,
}) => {
  const [commentToggle, setCommentToggle] = useState(false);

  const useStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.text.secondary,
      flexGrow: 1,
      alignItems: "center",
      justifyContent: "center",
    },

    name: {
      fontSize: "1rem",
    },

    details: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "8px",
      paddingRight: "10px",
    },
    container: {
      display: "flex",
      paddingLeft: "10px",
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    box: {
      width: "100%",
      padding: "12px",
      justifyContent: "center",
      border: "1px RGB(149, 152, 157, 0.25)solid",
    },
    commentBox: {
      zIndex: "1",
      position: "absolute",
      top: "100px",
      margin: "auto",
      backgroundColor: "black",
      borderRadius: "12px",
      width: "100%",
      padding: "1rem",
      maxWidth: "500px",
    },
    divider: {
      marginBottom: "1.5rem",
      width: "100%",
    },
    commentInfo: {},
  }));

  const classes = useStyles();
  return (
    <>
      <Link to={`/dashboard/${id}`} style={{ width: "100%" }}>
        <Box key={id} className={classes.box}>
          <Comment
            classes={classes}
            liftName={liftName}
            weight={weight}
            reps={reps}
            rpe={rpe}
            name={name}
          />
          <UserPostButtons
            setCommentToggle={setCommentToggle}
            commentToggle={commentToggle}
            likes={likes}
            id={id}
            user={user}
          />
        </Box>
      </Link>
      {commentToggle === true ? (
        <ReplyComment
          classes={classes}
          setCommentToggle={setCommentToggle}
          liftName={liftName}
          weight={weight}
          reps={reps}
          rpe={rpe}
          name={name}
          id={id}
          user={user}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default UserPosts;
