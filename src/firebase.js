import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { getDatabase, ref, onValue } from "firebase/database";

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
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
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
  auth.signOut();
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
      list.push(item.data());
    });

    await setData(list);
    await setLoad(false);
  } catch (err) {
    console.error(err);
    alert("An error occured while fetching user data");
  }
};

const fetcherPosts = async (user, updateFeed, postData) => {
  var docRef = db.collection("posts");
  docRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        console.log("Document data:", docRef.doc.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
};

export {
  auth,
  db,
  signInWithGoogle,
  signInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordResetEmail,
  logout,
  fetchUserName,
  newPost,
  fetcherPosts,
  fetchPosts,
};
