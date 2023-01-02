<script setup>
import { reactive } from 'vue';
import BlogPost from "../components/BlogPost.vue"

let welcomeScreen = reactive({
  title: "Welcome!",
  blogPost:
    "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
  welcomeScreen: true,
  photo: "coding",
})

let smapleBlogPosts = reactive([
  {
    title: "This is a Filler Title!",
    blogHTML: "This is a filler blog post title",
    blogCoverPhoto: "beautiful-stories",
  },
  {
    title: "This is a Filler Title!",
    blogHTML: "This is a filler blog post title",
    blogCoverPhoto: "designed-for-everyone",
  }
])

</script>

<template>
  <main>
    <BlogPost :post="welcomeScreen"/>
    <BlogPost v-for="(post, idx) in smapleBlogPosts" :key="idx" :post="post"/>
  </main>
</template>
