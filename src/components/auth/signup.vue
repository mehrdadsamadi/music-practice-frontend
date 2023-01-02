<template>
    <div class="primary rounded-lg elevation-3 pa-4 d-flex flex-column align-center justify-center w-100" style="z-index: 1; position: relative;">
        <div class="grey rounded-lg overlaw d-flex justify-center align-center" v-if="step > 1">
            <v-icon color="light" style="font-size: 7rem">mdi-check</v-icon>
        </div>
        <h3 class="light--text mb-5">ثبت نام</h3>

        <v-text-field
            v-model="form.mobile"
            label="شماره موبایل"
            placeholder="09123456789"
            class="w-100"
            background-color="light"
            :loading="mobileLoading"
            :disabled="disable.mobile"
            :rules="rules.mobile"
            @input="checkMobileLength"
            filled
            rounded
        ></v-text-field>

        <div v-if="!disable.otp">
            <span v-if="second !== 0" class="light--text" v-text="second + ' ثانیه '"></span>
            <v-btn v-else @click="getOtp(true)" color="error" text v-text="'برای ارسال مجدد کد کلیک کنید'"></v-btn>
        </div>

        <v-otp-input
            v-model="form.code"
            :disabled="disable.otp"
            :rules="rules.otp"
            @finish="checkOtp"
            dir="ltr"
            length="5"
            type="number"
        ></v-otp-input>

    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "signup",
    props: ["step"],
    data() {
        return {
            second: 120,
            interval: null,
            mobileLoading: false,
            rules: {
                mobile: [
                    v => !!v || 'شماره موبایل را وارد کنید',
                    v => /^09[0-9]{9}$/.test(v) || 'شماره موبایل معتبر وارد کنید',
                ],
                otp: [
                    v => !!v || 'کد ارسال شده را وارد کنید',
                    v => v.length == 5 || 'کد باید 5 رقم باشد' 
                ]
            },
            disable: {
                mobile: false,
                otp: true,
            },
            form: {
                mobile: "",
                code: ""
            }
        }
    },
    methods: {
        checkMobileLength() {
            if(this.form.mobile.length == 11) 
                this.getOtp()
        },
        getOtp(resend = false) {
            this.mobileLoading = true

            axios.post("/auth/get-otp", {mobile: this.form.mobile, resend})
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.disable = {
                        mobile: true,
                        otp: false,
                    }
                    this.downSec()
                })
                .catch(err => {
                    this.handle_error(err)
                })
                .finally(() => this.mobileLoading = false)
        },
        checkOtp() {
            axios.post("/auth/check-otp", this.form)
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.disable = {
                        mobile: true,
                        otp: true,
                    }

                    axios.defaults.headers.common["authorization"] = `Bearer ${data.data.accessToken}`
                    this.$emit("complete")
                })
                .catch(err => {
                    this.handle_error(err)
                })
        },
        downSec() {
            this.second = 120
            this.interval = setInterval(() => {
                if(this.second == 0) {
                    return clearInterval(this.interval)
                }
                this.second -= 1
            }, 1000);
        }
    },
    beforeDestroy() {
        clearInterval(this.interval)
    }
}
</script>

<style scoped>
.v-otp-input.theme--light {
    direction: ltr !important;
}

.overlaw {
    width: 100%;
    height: 100%;
    z-index: 1;
    position: absolute;
    opacity: .7;
    /* filter: blur(1rem); */
}

</style>