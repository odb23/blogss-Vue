import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebaseInit";

const BLOG_PHOTO_PATH = "documents/blogPostPhotos/";

function uploadBlogPhoto(file) {

  const docRef = ref(storage, BLOG_PHOTO_PATH + file.name);
  const upload = uploadBytesResumable(docRef, file);

  return upload
}


export {
    uploadBlogPhoto, 
    getDownloadURL
}