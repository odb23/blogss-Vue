<template >
  <div class="create-post">
    <BlogCoverPreview v-show="$store.state.blogPhotoPreview"/>
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
          <button class="preview" :class="{ 'button-inactive': !blogPhotoFileURL}" @click="openPreview">Preview Photo</button>
          <span>File Chosen: {{ blogPhotoName }} </span>
        </div>
      </div>

      <div class="editor">
        <vue-editor :editorOptions="editorSettings" v-model="blogHTML" useCustomImageHandler />
      </div>

      <div class="blog-actions">
        <button>
          Publish Blog
        </button>
        <RouterLink class="router-button" to="#">
          Post Preview
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,  computed } from "vue";
import { useStore } from "vuex"
import BlogCoverPreview from "../components/BlogCoverPreview.vue";

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

const blogPhoto = ref(null)

const file = ref(null)
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
      min-width: 300px;
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