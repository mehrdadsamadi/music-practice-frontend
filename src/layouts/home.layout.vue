<template>
    <div>
        <transition name="moveX" mode="out-in">
            <router-view/>
        </transition>
        <v-bottom-navigation
            v-model="navigation"
            background-color="primary"
            fixed
            dark
            shift
        >
            <v-btn @click="logout">
                <span>خروج</span>

                <v-icon>mdi-logout</v-icon>
            </v-btn>

            <v-btn>
                <span>تمرین ها</span>

                <v-icon>mdi-music</v-icon>
            </v-btn>

            <v-btn>
                <span>امتیاز ها</span>

                <v-icon>mdi-numeric</v-icon>
            </v-btn>

            <v-btn>
                <span>پیام ها</span>

                <v-icon>mdi-message-outline</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "homeLayout",
    data() {
        return {
            navigation: 2
        }
    },
    methods: {
        logout() {
            this.prompt({title: "خروج", message: "آیا برای خروج از حساب خود مطمعن هستید؟"})
                .then(() => {
                    delete axios.defaults.headers.common["authorization"];
                    this.$store.commit("set_data", {key: "user", data: null})
                    return this.$router.push("/login")
                })
                
            // FIXME: navigation doesn't changed
            this.navigation = 2
        }
    },
}
</script>

<style>

</style>