<template>
    <div class="primary rounded-lg elevation-3 pa-4 d-flex flex-column align-center justify-center w-100" style="z-index: 1;position: relative;">
        <div class="grey rounded-lg overlaw d-flex justify-center align-center" v-if="step < 3">
            <v-icon color="error" style="font-size: 7rem">mdi-close</v-icon>
        </div>
        <h3 class="light--text mb-5">ثبت مشخصات</h3>
        
        <v-text-field
            v-model="form.first_name"
            :rules="rules.required"
            label="نام"
            class="w-100"
            background-color="light"
            filled
            rounded
            dense
        ></v-text-field>
        
        <v-text-field
            v-model="form.last_name"
            :rules="rules.required"
            label="نام خانوادگی"
            class="w-100"
            background-color="light"
            filled
            rounded
            dense
        ></v-text-field>

        <v-select
            v-model="form.instrument"
            :items="instruments"
            :rules="rules.required"
            item-text="name"
            item-value="_id"
            class="w-100"
            background-color="light"
            label="انتخاب ساز"
            filled
            rounded
            dense
        ></v-select>

        <v-btn
            rounded
            depressed
            color="error"
            class="px-7"
            dark
            @click="setUserInformation"
            :loading="loading"
        >
            ذخیره
        </v-btn>

    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "setUserInfo",
    props: ["step"],
    data() {
        return {
            instruments: [],
            rules: {
                required: [
                    v => !!v || "وارد کردن این فیلد الزامی است"
                ]
            },
            form: {
                instrument: "",
                first_name: "",
                last_name: "",
            },
            loading: false
        }
    },
    created() {
        axios.get("/instrument/get-all")
            .then(({data}) => {
                this.instruments = data.data.instruments
            })
            .catch(err => this.handle_error(err))
    },
    methods: {
        setUserInformation() {
            this.loading = true

            Object.keys(this.form).forEach(item => {
                if(item.length == 0) return this.notify("وارد کردن فیلد ها الزامی میباشد", "error")
            })

            axios.patch("/auth/set-info", this.form)
                .then(({data}) => {
                    this.notify(data.data.message, "success")

                    this.$store.commit("set_data", {
                        key: "user",
                        data: data.data.user
                    })
                    
                    this.$router.push("/")
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        }
    },
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