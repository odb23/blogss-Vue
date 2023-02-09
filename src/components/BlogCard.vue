<template>
    <div class="blog-card">
        <div class="icons" v-show="editPost">
            <div class="icon">
                <img alt="" class="edit" :src="Edit">
            </div>
            <div class="icon">
                <img alt="" class="delete" :src="Delete">
            </div>
        </div>
        <img :src="imageURL" alt="coverPhoto" class="coverPhoto">
        <div class="info">
            <h1>{{ post.blogTitle }}</h1>
            <h6>Posted on: {{
                new Date(post.blogDate).toLocaleString('en', {
                    dateStyle: 'long'
                })
            }}</h6>
            <RouterLink class="link" :to="{ name: 'ViewBlog', params: { blogid: post.blogId } }">
                View The Post
                <img alt="" class="arrow" :src="Arrow">
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import Arrow from "../assets/Icons/arrow-right-light.svg"
import Edit from "../assets/Icons/edit-regular.svg"
import Delete from "../assets/Icons/trash-regular.svg"
import { RouterLink } from 'vue-router'
import { computed } from "vue";
import { useStore } from "vuex";

const props = defineProps(['post'])
const imageURL = new URL(`../assets/blogCards/${props.post.blogCoverPhoto}.jpg`, import.meta.url).href
const store = useStore()

let editPost = computed(() => store.state.editPost)

</script>

<style lang="scss" scoped >
.blog-card {
    position: relative;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    background-color: white;
    min-height: 420px;
    transition: .5s ease-in all;

    &:hover {
        transform: rotateZ(-1deg) scale(1.01);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);

    }

    .icons {
        display: flex;
        position: absolute;
        top: 10px;
        right: 10px;
        z-index: 99;

        .icon {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-color: white;
            transition: .5s ease all;

            &:hover {
                background-color: #303030;

                .edit,
                .delete {
                    filter: brightness(0) invert(1)
                }
            }

            &:nth-child(1) {
                margin-right: 8px;
            }

            .edit,
            .delete {
                pointer-events: none;
                height: 15px;
                width: auto;
            }
        }
    }

    .coverPhoto {
        display: block;
        border-radius: 8px 8px 0 0;
        z-index: 1;
        width: 100%;
        min-height: 200px;
        object-fit: cover;
    }

    .info {
        display: flex;
        flex-direction: column;
        height: 100%;
        z-index: 3;
        padding: 32px 16px;
        color: black;

        h4 {
            padding-bottom: 8px;
            font-size: 20px;
            font-weight: 300px;
        }

        h6 {
            font-weight: 400;
            font-size: 12px;
            padding-bottom: 16px;
        }

        .link {
            display: inline-flex;
            align-items: center;
            margin-top: auto;
            font-weight: 500;
            padding-top: 20px;
            font-size: 12px;
            padding-bottom: 4px;
            transition: .5s ease all;

            &:hover {
                color: rgba(48, 48, 48, 0.8);
            }

            .arrow {
                width: 10px;
            }
        }
    }
}
</style>