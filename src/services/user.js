import "firebase/auth";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebaseInit";

const USERS_PATH = "users";

const registerUser = async (user) => {
  const { firstName, lastName, email, username, password } = user;

  if (
    email !== "" &&
    password !== "" &&
    firstName !== "" &&
    lastName != "" &&
    username !== ""
  ) {
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await setDoc(doc(db, USERS_PATH, createdUser.user.uid), {
        firstName,
        lastName,
        email,
        username,
      });
    } catch (e) {
      throw Error("Error occurred while creating user!");
    }
    return;
  }

  throw Error("Please fill out all the fields!");
};

const authenticateUserWithEmailPassword = async (login) => {
  const { email, password } = login;

  if (email === "" || password === "") throw Error("Invalid credentials");

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    throw Error(err.message);
  }
};

const resetUserPasswordWithEmail = (email) => {
  sendPasswordResetEmail(auth, email)
    .then()
    .catch((e) => {
      throw e;
    });
};

const getCurrentUser = async (commit) => {
  try {
    console.log(auth.currentUser.uid)
    const dbRes = await getDoc(doc(db, USERS_PATH, auth.currentUser.uid));
    
    if (dbRes.exists()) {
      console.log("Document data:", dbRes);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

    commit("setProfileInfo", dbRes);
    commit("setProfileInitials");
  } catch (e) {
    console.log(e)
  }
};


const userSignOut = async () => {
  await signOut(auth)
  window.location.reload()
}

export {
  registerUser,
  authenticateUserWithEmailPassword,
  resetUserPasswordWithEmail,
  getCurrentUser,
  userSignOut
};
