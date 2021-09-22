import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { newComment } from "../firebase";
import { pushLikesOnComment, removeLikesOnComment } from "../firebase";
import { db, auth } from "../firebase.js";
import Comment from "./Comment";
import { ArrowBack } from "@material-ui/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import UserPostButtons from "./UserPostButtons";
import {
  Box,
  TextField,
  createTheme,
  CssBaseline,
  Button,
  Typography,
  Divider,
  Avatar,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import defaultpic from "../defaultpic.jpeg";

import "./feed.css";
const ViewPost = () => {
  let { id } = useParams();
  const [commentToggle, setCommentToggle] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [currentPost, setCurrentPost] = useState([]);
  const [load, setLoad] = useState(true);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const theme = createTheme({
    palette: {
      type: "dark",
    },
  });
  const postComment = async () => {
    setComment("");
    newComment(id, user.uid, comment, user.displayName, currentPost.name);
  };
  useEffect(() => {
    if (loading) return;
  }, [loading, user]);

  useEffect(() => {
    var docRef = db.collection("posts").doc(id);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          setCurrentPost(doc.data());
          setLoad(false);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  }, []);

  useEffect(() => {
    db.collection("posts")
      .doc(id)
      .collection("comments")
      .onSnapshot((snapshot) =>
        setComments(
          snapshot.docs.map((doc) =>
            Object.assign({ commentID: doc.id }, doc.data())
          )
        )
      );
  }, []);

  if (loading || load) {
    return <h1>loading</h1>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box width={1 / 2}>
          <Box className="view-post" width={1}>
            <Box display="flex" justifyContent="flex-start">
              <Link to="/dashboard">
                <ArrowBack />
              </Link>
              <Typography
                style={{ marginLeft: "20px" }}
                className="dashboard-back"
                label="Dashboard"
              >
                Dashboard
              </Typography>
            </Box>

            <Divider style={{ marginBottom: "12px" }} />
            <Comment
              liftName={currentPost.liftName}
              weight={currentPost.weight}
              reps={currentPost.reps}
              rpe={currentPost.rpe}
              name={currentPost.name}
            />

            <TextField
              className="text-field-post"
              color="primary"
              required
              fullWidth
              onChange={(e) => {
                setComment(e.target.value);
              }}
              rows={3}
              value={comment}
              id="description"
              name="description"
              placeholder={"Reply"}
              multiline
              style={{ padding: 15 }}
              margin="normal"
            />
            <Box display="flex" justifyContent="flex-end">
              <Button onClick={() => postComment()} color="primary">
                Reply
              </Button>
            </Box>
          </Box>
          <Divider />
          {comments.map(({ commentID, comment, name, replyingTo, likes }) => {
            return (
              <>
                <Box
                  key={id}
                  className="view-post"
                  display="flex"
                  width={1}
                  style={{ backgroundColor: "black" }}
                >
                  <Avatar style={{ paddingTop: "5px" }} imgProps={defaultpic} />
                  <Box display="flex" flexDirection="column">
                    <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
                      <Typography variant="h6">{name}: </Typography>
                      <Typography variant="subtitle1"> 5h ago </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">
                        Replying to: {replyingTo}:{" "}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ ml: 2 }}>
                      <Typography variant="subtitle1">{comment}</Typography>
                    </Box>
                    <UserPostButtons
                      setCommentToggle={setCommentToggle}
                      commentToggle={commentToggle}
                      likes={likes}
                      id={id}
                      user={user}
                      functionLike={pushLikesOnComment}
                      functionUnlike={removeLikesOnComment}
                      commentID={commentID}
                      state={"postview"}
                    />
                  </Box>
                </Box>
                <Box>
                  <Divider />
                </Box>
              </>
            );
          })}
        </Box>
        <Button
          onClick={() =>
            pushLikesOnComment(id, user.uid, "4SyGkRysv4HJ1FFqwIwO")
          }
        ></Button>
      </Box>
    </ThemeProvider>
  );
};

export default ViewPost;
