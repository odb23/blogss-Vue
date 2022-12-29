
<script setup>
import MenuIcon from '../assets/Icons/bars-regular.svg'
import {ref} from 'vue'

let mobile = ref(null)
let mobileNav = ref(null)
let windowWidth = ref(null)

window.addEventListener("resize", checkScreen);
checkScreen()

function checkScreen () {
    windowWidth.value = window.innerWidth;

    console.log(windowWidth)
    if (windowWidth.value <= 750) {
        mobile.value = true;
        return
    }
    mobile.value = false
    mobileNav.value = false
    return
}

function toggleMobileNav (){
     mobileNav.value =  !mobileNav.value
}

// export default {
//     name: 'Navigation',
//     components: {
//         MenuIcon
//     }
// }
</script>

<template>
    <header>
        <nav class="container">
            <div class="branding">
                <RouterLink class="header" :to="{ name: 'Home' }">ODBlogss</RouterLink>
            </div>

            <div class="nav-links" v-show="!mobile">
                <ul>
                    <RouterLink class="link" to="#">Home</RouterLink>
                    <RouterLink class="link" to="#">Blogs</RouterLink>
                    <RouterLink class="link" to="#">Create Post</RouterLink>
                    <RouterLink class="link" to="#">Login/Register</RouterLink>
                </ul>
            </div>
        </nav>
        
        <img :src="MenuIcon" v-show="mobile" alt="logo" class="menu-icon" @click="toggleMobileNav"/>

        <Transition name="mobile-nav" >
            <ul class="mobile-nav" v-show="mobileNav"> 
                    <RouterLink class="link" to="#">Home</RouterLink>
                    <RouterLink class="link" to="#">Blogs</RouterLink>
                    <RouterLink class="link" to="#">Create Post</RouterLink>
                    <RouterLink class="link" to="#">Login/Register</RouterLink>
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

            .header{
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

                .link:last-child{
                    margin-right: 0;
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

    .mobile-nav-enter-active, .mobile-nav-leave-active {
        transition: all 1s ease;
    }

    .mobile-nav-enter, .mobile-nav-leave-to {
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to, .mobile-nav-leave {
        transform: translateX(0px);
    }


}
</style>