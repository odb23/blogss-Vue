<script setup>
import { reactive, computed } from 'vue';
import BlogPost from "../components/BlogPost.vue"
import BlogCard from '../components/BlogCard.vue';
import Arrow from "../assets/Icons/arrow-right-light.svg"
import { useStore } from 'vuex';

const $store = useStore()


let welcomeScreen = reactive({
  title: "Welcome!",
  blogPost:
    "Weekly blog articles with all things programming including HTML, CSS, JavaScript and more. Register today to never miss a post!",
  welcomeScreen: true,
  photo: "coding",
})

let blogCards = computed(( ) => $store.getter.blogPostCards)
let blogPostFeeds = computed(( ) => $store.getter.blogPostFeeds)
let user = computed(() => $store.state.user)
</script>

<template>
  <main>
    <BlogPost v-if="!user" :post="welcomeScreen" />
    <BlogPost v-for="(post, idx) in blogPostFeeds" :key="idx" :post="post" />

    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard v-for="( post, index) in blogCards" :key="index" :post="post" />
        </div>
      </div>
    </div>

    <div class="updates" v-if="!user">
      <div class="container">
        <h2>
          Never miss a post. Register for your free account
        </h2>
        <RouterLink class="router-button" to="#">
          Register for ODBlogss
          <img alt="arrow" :src="Arrow" class="arrow arrow-light">
        </RouterLink>
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

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 435px;
      width: 100%;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
