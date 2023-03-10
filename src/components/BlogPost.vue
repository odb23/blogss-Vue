<template>
    <div class="blog-wrapper" :class="{'no-user': !user}">
        <div class="blog-content">
            <div>
                <h2 v-if="post.welcomeScreen">{{ post.title }}</h2>
                <h2 v-else> {{ post.blogTitle }}</h2>

                <p v-if="post.welcomeScreen"> {{ post.blogPost }}</p>
                <p class="content-preview" v-else v-html="post.blogHTML"></p>

                <RouterLink to="#" v-if="post.welcomeScreen" class="link link-light">
                    Login/Register
                    <img :src="arrow" alt="arrow" class="arrow arrow-light" />
                </RouterLink>
                <RouterLink :to="{ name: 'ViewBlog', params: { blogid: post.blogId } }" v-else class="link">
                    View The Post
                    <img :src="arrow" alt="arrow" class="arrow" />
                </RouterLink>
            </div>
        </div>
        <div class="blog-photo" >
            <img :src="imageURL" alt="">
        </div>
    </div>
</template>

<script setup>
import {computed} from "vue"
import { useStore } from "vuex";
import arrow from "../assets/Icons/arrow-right-light.svg"

const props = defineProps(['post'])
const store = useStore()
const user = computed(() => store.state.user)

const imageURL = new URL(props.post.welcomeScreen
    ? `../assets/blogPhotos/${props.post.photo}.jpg`
    : `../assets/blogPhotos/${props.post.blogCoverPhoto}.jpg`, import.meta.url).href
</script>

<style lang="scss" scoped>
.blog-wrapper {
    display: flex;
    flex-direction: column;

    @media (min-width: 700px) {
        min-height: 650px;
        max-height: 650px;
        flex-direction: row;
    }

    .blog-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        flex: 4;
        order: 2;
        @media (min-width: 700px) {
            order: 1;
        }
        @media (min-width: 800px) {
            flex: 3;
        }

        div {
            max-width: 375px;
            padding: 72px 24px;
            @media (min-width: 700px) {
                padding: 0 24px;
            }

            h2 {
                font-size: 32px;
                font-weight: 300;
                text-transform: uppercase;
                margin-bottom: 24px;
                @media (min-width: 700px) {
                    font-size: 40px; 
                }
            }

            p {
                font-size: 15px;
                font-weight: 300;
                line-height: 1.7;
            }

            .content-preview {
                font-size: 13px;
                max-height: 24px;
                width: 250px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .link {
                display: inline-flex;
                align-items: center;
                margin-top: 32px;
                padding-bottom: 4px;
                border-bottom: 1px solid transparent;
                transition: .5s ease-in all;

                &:hover {
                    border-bottom-color: #303030;
                }
            }

            .link-light {
                &:hover {
                    border-bottom-color: white;
                }
            }
        }
    }

    .blog-photo {
        order: 1;
        flex: 3;
        box-shadow:  0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
        @media (min-width: 700px) {
            order: 2;
        }
        @media (min-width: 800px) {
            flex: 4
        }

        img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &:nth-child(even ){
        .blog-content {
            order: 2;
        }

        .blog-photo {
            order: 1;
        }
    }
}

.no-user:first-child {
    .blog-content {
        background-color: #303030;
        color: white;
    }  
}
</style>