<script setup>
import { reactive } from 'vue';
import BlogPost from "../components/BlogPost.vue"
import BlogCard from '../components/BlogCard.vue';


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

let sampleBlogCards = reactive([
  {
    blogTitle: "Blog Card #1",
     blogCoverPhoto: "stock-1", 
     blogDate: "May 1, 2023",
  },
  {
    blogTitle: "Blog Card #2", blogCoverPhoto: "stock-2", blogDate: "May 1, 2023",
  },
  {
    blogTitle: "Blog Card #3", blogCoverPhoto: "stock-3", blogDate: "May 1, 2023",
  },
  {
    blogTitle: "Blog Card #4", blogCoverPhoto: "stock-4", blogDate: "May 1, 2023",
  }
])

</script>

<template>
  <main>
    <BlogPost :post="welcomeScreen" />
    <BlogPost v-for="(post, idx) in smapleBlogPosts" :key="idx" :post="post" />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard v-for="( post, index) in sampleBlogCards" :key="index" :post="post" />
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}
</style>
