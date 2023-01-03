<template >
    <div class="form-wrap">
        <form action="" class="register">
            <p class="login-register">
               Already have an account?
                <RouterLink class="router-link" :to="{ name: 'Login' }">Log In</RouterLink>
            </p>
            <h2>Create your ODBlogss account</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="First Name" v-model="firstName">
                    <img :src="User" alt="" class="icon">
                </div>
                <div class="input">
                    <input type="text" placeholder="Last Name" v-model="lastName">
                    <img :src="User" alt="" class="icon">
                </div>
                <div class="input">
                    <input type="text" placeholder="Username" v-model="username">
                    <img :src="User" alt="" class="icon">
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <img :src="Email" alt="" class="icon">
                </div>
                <div class="input">
                    <input type="pasword" placeholder="Password" v-model="password">
                    <img :src="Password" alt="" class="icon">
                </div>
            </div>

            <button>Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background">

        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import Email from "../assets/Icons/envelope-regular.svg"
import Password from "../assets/Icons/lock-alt-solid.svg"
import User from "../assets/Icons/user-alt-light.svg"

let email = ref(null)
let password = ref(null)
let firstName= ref(null)
let lastName = ref(null)
let username = ref(null)

</script>
<style lang="scss" scoped>
.register {
    h2 {
        max-width: 350px;
    }
}
</style>