<template >
    <div class="reset-password">
        <Modal v-if="showModal" v-on:close-modal="closeModal" />
        <Loading v-if="loading"/>
        <div class="form-wrap">
            <form action="" class="reset">
                <h2>Reset Password</h2>
                <p>Forgot your password? Enter your email to reset it</p>
                <div class="inputs">

                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email">
                        <img :src="Email" alt="" class="icon">
                    </div>

                </div>

                <button>Reset</button>
                <div class="angle"></div>
            </form>
            <div class="background">

            </div>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue"
import Email from "../assets/Icons/envelope-regular.svg"
import Modal from "../components/Modal.vue";
import Loading from "../components/Loading.vue"

let email = ref(null)
let showModal = ref(null);
let modalMessage = ref("")
let loading = ref(null)

function closeModal() {
    showModal.value = !showModal.value
    email.value = ""
}
</script>

<style lang="scss" scoped>
.reset-password {
    position: relative;

    .form-wrap {
        .reset {
            h2 {
                margin-bottom: 8px;
            }

            p {
                text-align: center;
                margin-bottom: 32px;
            }
        }
    }
}
</style>