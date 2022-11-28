<template>
    <div class="primary rounded-lg elevation-3 pa-4 d-flex flex-column align-center justify-center w-100" style="z-index: 1;position: relative;">
        <div class="grey rounded-lg overlaw d-flex justify-center align-center" v-if="!completeSignup">
            <v-icon color="error" style="font-size: 7rem">mdi-close</v-icon>
        </div>
        <h3 class="light--text mb-5">ایجاد کلمه عبور</h3>
        
        <v-text-field
            v-model="password"
            label="کلمه عبور"
            class="w-100"
            background-color="light"
            :rules="rules.password"
            :append-icon="show.password ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.password ? 'text' : 'password'"
            @click:append="show.password = !show.password"
            filled
            rounded
            dense
        ></v-text-field>
        
        <v-text-field
            v-model="repeatPassword"
            label="تکرار کلمه عبور"
            class="w-100"
            background-color="light"
            :rules="rules.password"
            :append-icon="show.repeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show.repeatPassword ? 'text' : 'password'"
            @click:append="show.repeatPassword = !show.repeatPassword"
            filled
            rounded
            dense
        ></v-text-field>

        <v-btn
            rounded
            depressed
            color="error"
            class="px-7"
            dark
            @click="setUserPassword"
            :disabled="disable"
            :loading="loading"
        >
            ذخیره
        </v-btn>

    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "setPassword",
    props: ["completeSignup"],
    data() {
        return {
            rules: {
                password: [
                    v => !!v || "وارد کردن این فیلد الزامی است",
                    v => (v.length >= 8 && v.length <= 12) || "کلمه عبور باید بین 8 تا 12 کاراکتر باشد"
                ]
            },
            password: "",
            repeatPassword: "",
            show: {
                password: true,
                repeatPassword: true
            },
            disable: true,
            loading: false
        }
    },
    methods: {
        setUserPassword() {
            if(this.password.localeCompare(this.repeatPassword) != 0) {
                return this.notify("کلمه عبور و تکرار آن باید مانند هم باشد","error")
            }

            axios.patch("/auth/set-password", {password: this.password})
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.$router.push('/')
                })
                .catch(err => {
                    this.handle_error(err)
                })
                .finally(() => {
                    this.loading = false
                })
        }
    },
    watch: {
        repeatPassword(newVal) {
            if(this.password.length >= 8 && this.password.length <= 12) {
                if(newVal.length >= 8 && newVal.length <= 12) {
                    this.disable = false
                }
            }
        }
    }
}
</script>

<style scoped>

.overlaw {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    opacity: .7;
    /* filter: blur(1rem); */
}
</style>