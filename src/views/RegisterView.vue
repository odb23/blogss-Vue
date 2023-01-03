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
                    <input type="password" placeholder="Password" v-model="password">
                    <img :src="Password" alt="" class="icon">
                </div>
                <div class="error" v-show="error">
                    {{ errorMessage }}
                </div>
            </div>

            <button @click.prevent="register">Sign Up</button>
            <div class="angle"></div>
        </form>
        <div class="background">

        </div>
    </div>
</template>

<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import Email from "../assets/Icons/envelope-regular.svg"
import Password from "../assets/Icons/lock-alt-solid.svg"
import User from "../assets/Icons/user-alt-light.svg"
import { registerUser } from "../services/firebase";

let email = ref("")
let password = ref("")
let firstName = ref("")
let lastName = ref("")
let username = ref("")
let error = ref(false)
let errorMessage = ref("")

const router = useRouter()

async function register() {

    try {
        error.value = false;
        errorMessage.value = ""

        await registerUser({
            firstName: firstName.value,
            lastName: lastName.value,
            email: email.value,
            username: username.value,
            password: password.value
        })

        router.push({
            name: 'Home'
        })

    } catch (e) {
        error.value = true;
        errorMessage.value = e.message
    }
}

</script>
<style lang="scss" scoped>
.register {
    h2 {
        max-width: 350px;
    }
}
</style>