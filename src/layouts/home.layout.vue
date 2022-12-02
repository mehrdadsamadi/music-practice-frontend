<template>
    <div>
        <transition name="moveX" mode="out-in">
            <router-view/>
        </transition>
        <v-navigation-drawer
            v-model="drawer"
            fixed
            bottom
            temporary
            style="height: unset"
            v-if="$store.getters.get_state('user')?.role == 'ADMIN' "
        >
            <v-list
                nav
                dense
            >
                <v-list-item-group
                    active-class="primary--text"
                >
                    <v-list-item to="/instrument">
                        <v-list-item-icon>
                            <v-icon>mdi-plus-box-multiple-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل ساز ها</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item to="/gift">
                        <v-list-item-icon>
                            <v-icon>mdi-gift-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل هدیه ها</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item to="/festival">
                        <v-list-item-icon>
                            <v-icon>mdi-tournament</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل جشنواره ها</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
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

            <v-btn color="error" v-if="$store.getters.get_state('user')?.role =='ADMIN'" @click.stop="drawer = !drawer" style="min-width: unset; min-height: unset; bottom: 2rem; height: 68px;" class="rounded-circle">
                <v-icon large style="transform: unset;">mdi-plus</v-icon>
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
            navigation: 2,
            drawer: false
        }
    },
    methods: {
        logout() {
            this.prompt({title: "خروج", message: "آیا برای خروج از حساب خود مطمعن هستید؟"})
                .then(() => {
                    delete axios.defaults.headers.common["authorization"];
                    this.$store.commit("set_data", {key: "user", data: null})
                    this.notify("خروج با موفقیت انجام شد", "success")
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