import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import db, { storage } from "../firebase/firebaseInit";
import { doc, serverTimestamp, setDoc} from "firebase/firestore";


const BLOG_PHOTO_PATH = "documents/blogPostPhotos/";
const BLOG_COVER_PHOTO_PATH = "documents/blogCoverPhotos/";
const BLOG_PATH = "blogPosts"

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

async function uploadBlogPost (post) {

  const blogId = serverTimestamp()

  try {
    const docRef = doc(db,BLOG_PATH, blogId);
    await setDoc(docRef, {
      blogId,
      ...post
    })
  } catch (error) {

  }
}

export { uploadBlogPhoto, getDownloadURL, uploadBlogCoverPhoto, uploadBlogPost };
