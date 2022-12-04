<template>
    <div class="primary rounded-lg elevation-3 pa-4 d-flex flex-column align-center justify-center w-100" style="z-index: 1">
        <h3 class="light--text mb-5">ورود</h3>

        <v-text-field
            v-model="form.mobile"
            label="شماره موبایل"
            placeholder="09123456789"
            class="w-100"
            background-color="light"
            filled
            rounded
        ></v-text-field>
        
        <v-text-field
            v-model="form.password"
            label="کلمه عبور"
            class="w-100"
            background-color="light"
            :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
            :type="passwordShow ? 'text' : 'password'"
            @click:append="passwordShow = !passwordShow"
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
            :loading="loading"
            @click="login"
        >
            ورود
        </v-btn>

        <v-btn color="light" to="/auth" text class="mt-3">میخواهم ثبت نام کنم</v-btn>

    </div>
</template>

<script>
import axios from "axios"
export default {
    name: "signin",
    data() {
        return {
            passwordShow: true,
            loading: false,
            form: {
                mobile: "",
                password: ""
            }
        }
    },
    methods: {
        login() {
            this.loading = true

            axios.post("/auth/login", this.form) 
                .then(({data}) => {
                    this.notify(data.data.message, "success")

                    this.$store.commit("set_data", {
                        key: "user",
                        data: data.data.user
                    })
                    axios.defaults.headers.common["authorization"] = `Bearer ${data.data.accessToken}`

                    this.$router.push({path: "/"})
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style>

</style>