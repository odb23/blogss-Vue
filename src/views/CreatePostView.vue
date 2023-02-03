<template >
  <div class="create-post">
    <BlogCoverPreview v-show="$store.state.blogPhotoPreview" />
    <Loading v-show="loading" />
    <div class="container">
      <div :class="{ invsible: !error }" class="err-message">
        <p>
          <span>Error:</span> {{ errorMessage }}
        </p>
      </div>

      <div class="blog-info">
        <input type="text" placeholder="Enter Blog Title" v-model="blogTitle">
        <div class="upload-file">
          <label for="blog-photo">Upload Cover Photo</label>
          <input type="file" ref="blogPhoto" id="blog-photo" accept="image/png, image/gif, image/jpeg"
            @change="fileChange">
          <button class="preview" :class="{ 'button-inactive': !blogPhotoFileURL }" @click="openPreview">Preview
            Photo</button>
          <span>File Chosen: {{ blogPhotoName }} </span>
        </div>
      </div>

      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler
          @Image-added="imageHandler" />
      </div>

      <div class="blog-actions">
        <button @click="publishBlog">
          Publish Blog
        </button>
        <RouterLink class="router-button" :to="{ name: 'PostPreview' }">
          Post Preview
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex"
import { useRouter } from "vue-router";
import BlogCoverPreview from "../components/BlogCoverPreview.vue";
import Loading from "../components/Loading.vue"
import { uploadBlogPhoto, getDownloadURL, uploadBlogCoverPhoto, uploadBlogPost } from "../services/post"

import Quill from "quill"
import ImageResize from '@taoqf/quill-image-resize-module';
Quill.register('modules/imageResize', ImageResize);
// (async function () {
//   let res = await import("quill-image-resize-module")
//  Quill.register('modules/imageResize', res.default);
//   //other init work
// })()
window.Quill = Quill

const $store = useStore()
const $router = useRouter()

const blogPhoto = ref(null)
const file = ref(null)
const loading = ref(false)
const error = ref(false);
const errorMessage = ref(null);
const editorSettings = ref({
  modules: {
    imageResize: {}
  }
})

const profileId = computed(() => $store.state.profileId)
const blogCoverPhotoName = computed(() => $store.state.blogCoverPhotoName)
const blogPhotoName = computed(() => $store.state.blogPhotoName)
const blogPhotoFileURL = computed(() => $store.state.blogPhotoFileURL)

const blogTitle = computed({
  get() { return $store.state.blogTitle },
  set(payload) { $store.commit("updateBlogTitle", payload) }
})
const blogHTML = computed({
  get() { return $store.state.blogHTML },
  set(payload) { $store.commit("newBlogPost", payload) }
})

function fileChange() {
  file.value = blogPhoto.value.files[0]
  const fileName = file.value.name

  $store.commit("fileNameChange", fileName)
  $store.commit("createFileURL", URL.createObjectURL(file.value))
}

function openPreview() {
  $store.commit("openPhotoPreview");
}

function publishBlog() {
  if (blogTitle.value.length !== 0 && blogHTML.value.length !== 0) {
    if (file.value) {
      loading.value = true

      const upload = uploadBlogCoverPhoto($store.state.blogPhotoName, file.value);

      upload.on("state_changed",
        (snapshot) => {
          console.log(snapshot)
        },
        (error) => {
          showErrorMessage("Error occurred while uploading over photo!")
          console.log(error)
        },
        async () => {
          uploadblogPostDoc(upload)
        })
      return
    }

    showErrorMessage("Please ensure you uploaded a cover photo")
    return
  }

  showErrorMessage("Please ensure Blog Title & Blog Post has been filled!")
}

async function uploadblogPostDoc(upload) {
  try {
    const coverPhotoURL = await getDownloadURL(upload.snapshot.ref);
    const timestamp = await Date.now();

    await uploadBlogPost({
      blogHTML: blogHTML.value,
      blogCoverPhoto: coverPhotoURL,
      blogCoverPhotoName: blogCoverPhotoName,
      blogTitle: blogTitle.value,
      profileId: profileId.value,
      date: timestamp
    })

    loading.value = false
    await $router.push({ name: "ViewBlog" })

  } catch (error) {
    showErrorMessage("Error occurred while publishing blog")
    console.log(error)
  }
}

function showErrorMessage(message) {
  loading.value = false
  error.value = true
  errorMessage.value = message

  setTimeout(() => {
    error.value = false
    errorMessage.value = ""
  }, 5000)
}

function imageHandler(file, Editor, cursorLocation, resetUploader) {
  const upload = uploadBlogPhoto(file)

  upload.on(
    "state_changed",
    (snapshot) => {
      console.log(snapshot);
    },
    (error) => {
      console.log(error);
    },
    async () => {
      const downloadURL = await getDownloadURL(upload.snapshot.ref);
      Editor.insertEmbed(cursorLocation, "image", downloadURL)
      resetUploader()
    }
  );

}

</script>

<style lang="scss" scoped>
.create-post {
  position: relative;
  height: 100%;

  button {
    margin-top: 0px;
  }

  .router-button {
    text-decoration: none;
    color: #fff;
  }

  label,
  button,
  .router-button {
    transition: 0.5s ease-in-out all;
    align-self: center;
    font-size: 14px;
    cursor: pointer;
    border-radius: 20px;
    padding: 12px 24px;
    color: #fff;
    background-color: #303030;
    text-decoration: none;

    &:hover {
      background-color: rgba(48, 48, 48, 0.7);
    }
  }

  .container {
    position: relative;
    height: 100%;
    padding: 10px 25px 60px;
  }

  .invsible {
    opacity: 0 !important;
  }

  .err-message {
    width: 100%;
    padding: 12px;
    border-radius: 8px;
    color: white;
    margin-bottom: 10px;
    background-color: #303030;
    opacity: 1;
    transition: .5s ease all;

    p {
      font-size: 14px;
    }

    span {
      font-weight: 600;
    }
  }

  .blog-info {
    display: flex;
    margin-bottom: 32px;

    input:nth-child(1) {
      min-width: 320px;
      font-size: 16px;
    }

    input {
      transition: .5s ease all;
      padding: 10px 4px;
      border: none;
      border-bottom: 1px solid #303030;

      &:focus {
        outline: none;
        box-shadow: 0 1px 0 0 #303030;
      }
    }

    .upload-file {
      flex: 1;
      margin-left: 16px;
      position: relative;
      display: flex;

      input {
        display: none;
      }

      .preview {
        margin-left: 16px;
        text-transform: initial;
      }

      span {
        font-size: 12px;
        margin-left: 16px;
        align-self: center
      }
    }
  }

  .editor {
    height: 60vh;
    display: flex;
    flex-direction: column;
  }

  .blog-actions {
    margin-top: 32px;

    button {
      margin-right: 16px;
    }
  }
}
</style>