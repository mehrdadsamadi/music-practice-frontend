<template>
    <div>
        <festivalBanner></festivalBanner>
        <timeGoalBanner></timeGoalBanner>

        <transition name="moveX" mode="out-in">
            <router-view/>
        </transition>
        
        <v-navigation-drawer
            v-model="drawer"
            fixed
            bottom
            temporary
            style="height: unset"
        >
            <v-list
                v-if="$store.getters.get_state('user')?.role == 'ADMIN' "
                nav
                dense
            >
                <v-list-item-group
                    active-class="primary--text"
                >
                    <v-list-item to="/admin-instrument">
                        <v-list-item-icon>
                            <v-icon>mdi-plus-box-multiple-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل ساز ها</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item to="/admin-gift">
                        <v-list-item-icon>
                            <v-icon>mdi-gift-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل هدیه ها</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item to="/admin-festival">
                        <v-list-item-icon>
                            <v-icon>mdi-tournament</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل جشنواره ها</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item to="/admin-message">
                        <v-list-item-icon>
                            <v-icon>mdi-message-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل پیام ها</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item to="/admin-timegoal">
                        <v-list-item-icon>
                            <v-icon>mdi-timelapse</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل اهداف زمانی</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item to="/admin-practice">
                        <v-list-item-icon>
                            <v-icon>mdi-music</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل تمرین ها</v-list-item-title>
                    </v-list-item>
                    
                    <v-list-item to="/admin-user">
                        <v-list-item-icon>
                            <v-icon>mdi-account-group-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>کنترل کاربر ها</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
            </v-list>

            <v-list
                v-if="$store.getters.get_state('user')?.role == 'USER' "
                nav
                dense
            >
                <v-list-item-group
                    active-class="primary--text"
                >
                    <v-list-item to="/user-myGifts">
                        <v-list-item-icon>
                            <v-icon>mdi-cart-check</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>هدیه های من</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>
             
                <v-list-item-group
                    active-class="primary--text"
                >
                    <v-list-item to="/user-gift">
                        <v-list-item-icon>
                            <v-icon>mdi-gift-outline</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>هدیه ها</v-list-item-title>
                    </v-list-item>

                </v-list-item-group>

                <v-list-item-group
                    active-class="primary--text"
                >
                    <v-list-item to="/user-festival">
                        <v-list-item-icon>
                            <v-icon>mdi-tournament</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>جشنواره</v-list-item-title>
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

            <v-btn to="/user-practice">
                <span>تمرین ها</span>

                <v-icon>mdi-music</v-icon>
            </v-btn>

            <v-btn color="error" @click.stop="drawer = !drawer" style="min-width: unset; min-height: unset; bottom: 2rem; height: 68px;" class="rounded-circle">
                <v-icon large style="transform: unset;">mdi-plus</v-icon>
            </v-btn>

            <v-btn to="/user-score">
                <span>امتیاز ها</span>

                <v-icon>mdi-numeric</v-icon>
            </v-btn>

            <v-badge
                v-if="!seenMessage"
                overlap
                left
                color="error"
            >
                <v-btn to="/user-message" class="h-100">
                    <span>پیام ها</span>
                    <v-icon>mdi-message-outline</v-icon>
                </v-btn>
            </v-badge>
            <v-btn to="/user-message" v-else>
                <span>پیام ها</span>
                <v-icon>mdi-message-outline</v-icon>
            </v-btn>

        </v-bottom-navigation>
    </div>
</template>

<script>
import axios from 'axios'
import timeGoalBanner from '@/components/banners/timeGoalBanner.vue'
import festivalBanner from '@/components/banners/festivalBanner.vue'

export default {
    name: "homeLayout",
    components: {
        timeGoalBanner,
        festivalBanner
    },  
    data() {
        return {
            navigation: 2,
            drawer: false,
        }
    },
    created() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {

        } else {
            return this.prompt({title: "خطا", message: "برای استفاده از این اپلیکیشن ، با موبایل خود وارد شوید", show_btn: false})
        }
        this.$store.dispatch("checkUnreadMessages")
    },
    computed: {
        seenMessage() {
            return this.$store.getters.get_state("seenMessage")
        }
    },
    methods: {
        
        async logout() {
            this.prompt({title: "خروج", message: "آیا برای خروج از حساب خود مطمعن هستید؟"})
                .then(() => {
                    delete axios.defaults.headers.common["authorization"];
                    this.$store.commit("set_data", {key: "user", data: null})
                    this.notify("خروج با موفقیت انجام شد", "success")
                    return this.$router.push("/login")
                })
            
            await this.$nextTick()
            this.navigation = 2
        }
    },
}
</script>

<style>
@keyframes pulse {
  from {transform: scale(1);}
  to {transform: scale(.9);}
}

span.v-badge__badge.error {
    right: 1rem !important;
    top: 0.3rem !important;
    transform: scale(1);
    animation-name: pulse;
    animation-duration: 1s;
    animation-iteration-count: infinite;
}
</style>