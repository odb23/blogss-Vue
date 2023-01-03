import "firebase/auth";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import db, { auth } from "../firebase/firebaseInit";

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

      await setDoc(doc(db, "users", createdUser.user.uid), {
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
      throw e
    });
};

export {
  registerUser,
  authenticateUserWithEmailPassword,
  resetUserPasswordWithEmail,
};
