<template >
    <div class="form-wrap">
        <form action="" class="login">
            <p class="login-register">
                Don't have an account?
                <RouterLink class="router-link" :to="{ name: 'Register' }">Register</RouterLink>
            </p>
            <h2>Login to ODBlogss</h2>
            <div class="inputs">
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

            <RouterLink class="forgot-password" :to="{ name: 'ForgotPassword' }">
                Forgot your password?
            </RouterLink>

            <button @click.prevent="signIn">Sign In</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router";
import Email from "../assets/Icons/envelope-regular.svg"
import Password from "../assets/Icons/lock-alt-solid.svg"
import { authenticateUserWithEmailPassword } from "../services/user"

let email = ref(null)
let password = ref(null)
let error = ref(false)
let errorMessage = ref("");
const router = useRouter()

async function signIn() {
    try {
        error.value = false
        errorMessage.value = ""

        await authenticateUserWithEmailPassword({
            email: email.value,
            password: password.value
        })

        router.push({
            name: "Home"
        })
    } catch (err) {
        console.log(err.message)
        error.value = true
        errorMessage.value = err.message
    }
}

</script>
<style lang="scss" >
.form-wrap {
    overflow: hidden;
    display: flex;
    height: 100vh;
    justify-content: center;
    align-self: center;
    margin: 0 auto;
    width: 90%;

    @media (min-width: 900px) {
        width: 100%;
    }

    .login-register {
        margin-bottom: 32px;

        .router-link {
            color: black
        }
    }

    form {
        padding: 0 10px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;

        @media (min-width: 900px) {
            padding: 0 50px;
        }

        h2 {
            text-align: center;
            font-size: 32px;
            color: #303030;
            margin-bottom: 40px;

            @media (min-width: 900px) {
                font-size: 40px;
            }
        }

        .inputs {
            width: 100%;
            max-width: 350px;

            .input {
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 8px;

                input {
                    width: 100%;
                    border: none;
                    background-color: #f2f7f6;
                    padding: 4px 4px 4px 30px;
                    height: 50px;

                    &:focus {
                        outline: none;
                    }
                }

                .icon {
                    width: 12px;
                    position: absolute;
                    left: 6px;
                }
            }
        }

        .forgot-password {
            text-decoration: none;
            color: black;
            cursor: pointer;
            font-size: 14px;
            margin: 16px 0 32px;
            border-bottom: 1px solid transparent;
            transition: .5s ease all;

            &:hover {
                border-color: #303030;
            }
        }

        .angle {
            display: none;
            position: absolute;
            background-color: #fff;
            transform: rotateZ(3deg);
            width: 60px;
            right: -30px;
            height: 101%;

            @media (min-width: 900px) {
                display: initial;
            }
        }
    }

    .background {
        display: none;
        flex: 2;
        background-size: cover;
        background-image: url("../assets/background.png");
        width: 100%;
        height: 100%;

        @media (min-width: 900px) {
            display: initial
        }
    }
}
</style>