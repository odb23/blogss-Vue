import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../firebase/firebaseInit";
import {
  collection,
  doc,
  serverTimestamp,
  setDoc,
  getDocs,
  orderBy,
  getDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const BLOG_PHOTO_PATH = "documents/blogPostPhotos/";
const BLOG_COVER_PHOTO_PATH = "documents/blogCoverPhotos/";
const BLOG_PATH = "blogPosts";

function uploadBlogPhoto(file) {
  const docRef = ref(storage, BLOG_PHOTO_PATH + file.name);
  const upload = uploadBytesResumable(docRef, file);

  return upload;
}

function uploadBlogCoverPhoto(photoName, file) {
  const docRef = ref(storage, BLOG_COVER_PHOTO_PATH + photoName);
  const upload = uploadBytesResumable(docRef, file);

  return upload;
}

async function uploadBlogPost(post) {
  const blogId = serverTimestamp();

  try {
    const docRef = doc(db, BLOG_PATH, blogId);
    await setDoc(docRef, {
      blogId,
      ...post,
    });
  } catch (error) {}

  return blogId;
}

async function getBlogPosts(state) {
  const snapshot = await getDocs(
    collection(db, BLOG_PATH),
    orderBy("date", "desc")
  );

  snapshot.forEach((doc) => {
    if (!state.blogPosts.some((post) => post.blogId === doc.id)) {
      const blogData = doc.data();

      state.blogPosts.push({
        ...blogData,
      });
    }
  });

  state.postLoaded = true;
}

async function deletePost(commit, postId) {
  try {
    await deleteDoc(doc(db, BLOG_PATH, postId));
    commit("filterBlogPost", postId)
  } catch (err) {
    console.log(err)
  }
}

async function updatePost ( post) {
  const {blogId, ...postData} = post
  try {
    await updateDoc(doc(db, BLOG_PATH, blogId), {
      ...postData
    })
  } catch (err) {

  }
}

export {
  uploadBlogPhoto,
  getDownloadURL,
  uploadBlogCoverPhoto,
  uploadBlogPost,
  getBlogPosts,
  deletePost,
  updatePost
};
