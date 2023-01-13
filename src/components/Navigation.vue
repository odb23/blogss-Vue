
<script setup>
import MenuIcon from '../assets/Icons/bars-regular.svg'
import User from "../assets/Icons/user-alt-light.svg"
import Admin from "../assets/Icons/user-crown-light.svg"
import SignOut from "../assets/Icons/sign-out-alt-regular.svg"
import { ref, computed } from 'vue'
import { useStore } from 'vuex';
import {userSignOut} from "../services/user"

const store = useStore()

const mobile = ref(null)
const mobileNav = ref(null)
const windowWidth = ref(null)
const profileMenu = ref(false)
const profile = ref(null)

let user = computed(() => store.state.user)

window.addEventListener("resize", checkScreen);
checkScreen()

function checkScreen() {
    windowWidth.value = window.innerWidth;

    if (windowWidth.value <= 750) {
        mobile.value = true;
        return
    }
    mobile.value = false
    mobileNav.value = false
    return
}

function toggleMobileNav() {
    mobileNav.value = !mobileNav.value
}

function toggleProfileMenu (e) {
    if (e.target !== profile.value) return

    profileMenu.value = !profileMenu.value
}

async function signOut () {
    await userSignOut()
}
</script>

<template>
    <header>
        <nav class="container">
            <div class="branding">
                <RouterLink class="header" :to="{ name: 'Home' }">ODBlogss</RouterLink>
            </div>

            <div class="nav-links">
                <ul v-show="!mobile">
                    <RouterLink class="link" :to="{ name: 'Home' }">Home</RouterLink>
                    <RouterLink class="link" :to="{ name: 'Blogs' }">Blogs</RouterLink>
                    <RouterLink class="link" to="#">Create Post</RouterLink>
                    <RouterLink v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</RouterLink>
                </ul>

                <div v-if="user" @click="toggleProfileMenu" class="profile" ref="profile">
                    <span>{{ store.state.profileInitials }}</span>

                    <div v-show="profileMenu" class="profile-menu">
                        <div class="info">
                            <p class="initials">
                                {{ store.state.profileInitials }}
                            </p>
                            <div class="right">
                                <p>{{ store.state.profileFirstName }} {{ store.state.profileLastName }}</p>
                                <p>{{ store.state.profileUsername }}</p>
                                <p>{{ store.state.profileEmail }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <RouterLink class="option"  :to="{name: 'Profile'}">
                                    <img class="icon" :src="User" alt="">
                                    <p>Profile</p>
                                </RouterLink>
                            </div>
                            <div class="option">
                                <RouterLink class="option"  :to="{name: 'Admin'}">
                                    <img class="icon" :src="Admin" alt="">
                                    <p>Admin</p>
                                </RouterLink>
                            </div>
                            <div @click="signOut" class="option">
                                
                                    <img class="icon" :src="SignOut" alt="">
                                    <p>Sign Out</p>
                        
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>

        <img :src="MenuIcon" v-show="mobile" alt="logo" class="menu-icon" @click="toggleMobileNav" />

        <Transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <RouterLink class="link" :to="{ name: 'Home' }">Home</RouterLink>
                <RouterLink class="link" :to="{ name: 'Blogs' }">Blogs</RouterLink>
                <RouterLink class="link" to="#">Create Post</RouterLink>
                <RouterLink v-if="!user" class="link" :to="{ name: 'Login' }">Login/Register</RouterLink>
            </ul>
        </Transition>
    </header>
</template>

<style lang="scss" scoped>
header {
    background-color: #fff;
    padding: 0 25px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
    z-index: 99;
    color: black;

    .link {
        font-weight: 500;
        padding: 0 8px;
        transition: 0.3s color ease;

        &:hover {
            color: #1eb8b8
        }
    }

    nav {
        display: flex;
        padding: 25px 0;

        .branding {
            display: flex;
            align-items: center;

            .header {
                font-weight: 600;
                font-size: 24px;
                text-decoration: none;
                color: black;
            }
        }

        .nav-links {
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;

            ul {
                margin-right: 32px;

                .link {
                    margin-right: 32px;
                }

                .link:last-child {
                    margin-right: 0;
                }
            }

            .profile {
                position: relative;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                color: white;
                background-color: #303030;
                margin-right: 40px;

                span {
                    pointer-events: none;
                }

                .profile-menu {
                    position: absolute;
                    top: 60px;
                    right: 0;
                    width: 250px;
                    background-color: #303030;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);

                    .info {
                        display: flex;
                        align-items: center;
                        padding: 15px;
                        border-bottom: 1px solid white;

                        .initials {
                            position: initial;
                            width: 40px;
                            height: 40px;
                            background-color: #fff;
                            color: #303030;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            border-radius: 50%;
                        }

                        .right {
                            flex: 1;
                            margin-left: 24px;

                            p:nth-child(1) {
                                font-size: 14px;
                            }

                            p:nth-child(2),
                            p:nth-child(3) {
                                font-size: 12px;
                            }
                        }
                    }
                    .options {
                        padding: 15px;

                        .option {
                            text-decoration: none;
                            color: #fff;
                            display: flex;
                            align-items: center;
                            margin-bottom: 12px;

                            .icon {
                                width: 18px;
                                height: auto;
                                filter: brightness(0) invert(1)
                            }

                            p {
                                font-size: 14px;
                                margin-left: 12px;
                            }

                            &:last-child {
                                margin-bottom: 0px;
                            }
                        }

                    }
                }
            }

        }
    }

    .menu-icon {
            cursor: pointer;
            position: absolute;
            top: 32px;
            right: 25px;
            height: 25px;
            width: auto
        }

        .mobile-nav {
            padding: 20px;
            width: 70%;
            max-width: 250px;
            display: flex;
            flex-direction: column;
            position: fixed;
            height: 100%;
            background-color: #303030;
            top: 0;
            left: 0;

            .link {
                padding: 15px 0;
                color: white;
            }
        }

        .mobile-nav-enter-active,
        .mobile-nav-leave-active {
            transition: all 1s ease;
        }

        .mobile-nav-enter,
        .mobile-nav-leave-to {
            transform: translateX(-250px);
        }

        .mobile-nav-enter-to,
        .mobile-nav-leave {
            transform: translateX(0px);
        }
}
</style>