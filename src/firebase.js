import { Unsubscribe } from "@material-ui/icons";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDkpbaWzNtQdice2gpNZO2I0oUJO0kBBvM",
  authDomain: "lift-shares.firebaseapp.com",
  projectId: "lift-shares",
  storageBucket: "lift-shares.appspot.com",
  messagingSenderId: "887985518455",
  appId: "1:887985518455:web:7d67487fa7818769be5372",
  measurementId: "G-829LGE19YQ",
};

const app = firebase.default.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const signInWithEmailAndPassword = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const newPost = async (
  user,
  name,
  description,
  liftName,
  weight,
  reps,
  rpe
) => {
  try {
    await db.collection("posts").add({
      uid: user?.uid,
      name,
      description,
      liftName,
      weight,
      reps,
      rpe,
      likes: [],
      comments: [],
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const newComment = async (id, userID, comment, name, replyingTo) => {
  try {
    await db.collection("posts").doc(id).collection("comments").add({
      comment,
      userID,
      name,
      replyingTo,
      likes: [],
    });
  } catch (err) {
    console.error(err);
  }
};

const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      console.err(error);
    });
};

const fetchUserName = async (setName, user) => {
  try {
    const query = await db
      .collection("users")
      .where("uid", "==", user?.uid)
      .get();
    const data = await query.docs[0].data();
    await setName({ name: data.name, email: data.email });
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching user data");
  }
};

const fetchPosts = async (setData, setLoad) => {
  const list = [];
  try {
    const query = await db.collection("posts").get();
    await query.docs.map((item) => {
      list.push(Object.assign({ id: item.id }, item.data()));
    });

    await setData(list);
    await setLoad(false);
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching user data");
  }
};

const pushLikes = async (id, value) => {
  const postRef = db.collection("posts").doc(id);
  postRef.update({
    likes: firebase.firestore.FieldValue.arrayUnion(value),
  });
};

const pushLikesOnComment = async (id, value, commentID) => {
  const postRef = db
    .collection("posts")
    .doc(id)
    .collection("comments")
    .doc(commentID);
  postRef.update({
    likes: firebase.firestore.FieldValue.arrayUnion(value),
  });
};
const removeLikesOnComment = async (id, value, commentID) => {
  const postRef = db
    .collection("posts")
    .doc(id)
    .collection("comments")
    .doc(commentID);
  postRef.update({
    likes: firebase.firestore.FieldValue.arrayRemove(value),
  });
};

const pushComments = async (id, value) => {
  const postRef = db.collection("posts").doc(id);
  postRef.update({
    comments: firebase.firestore.FieldValue.arrayUnion(value),
  });
};

const removeLikes = async (id, value) => {
  const postRef = db.collection("posts").doc(id);
  postRef.update({
    likes: firebase.firestore.FieldValue.arrayRemove(value),
  });
};

const getSinglePost = (id, setPost) => {
  try {
    db.collection("posts")
      .doc(id)
      .onSnapshot((doc) => {
        setPost(doc.data().likes);
      });
  } catch (err) {
    console.error(err);
  }
};

export {
  auth,
  db,
  app,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  fetchUserName,
  newPost,
  fetchPosts,
  pushLikes,
  removeLikes,
  getSinglePost,
  pushComments,
  newComment,
  pushLikesOnComment,
  removeLikesOnComment,
};
