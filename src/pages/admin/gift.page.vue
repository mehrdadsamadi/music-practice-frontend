<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">کنترل هدیه ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <v-data-table
            :headers="headers"
            :items="gifts"
            :items-per-page="10"
            :loading="tableLoading"
            loading-text="در حال دریافت اطلاعات ..."
            hide-default-footer
            class="elevation-1"
        >

            <template v-slot:no-data>
                <p>هدیه ای برای نمایش وجود ندارد</p>
            </template>

            <template #[`item.in_festival`]="{item}">

                <v-chip
                    v-text="item.in_festival ? 'بله' : 'خیر'"
                    :color="item.in_festival ? 'secondary' : 'error'"
                ></v-chip>
                
            </template>

            <template #[`item.actions`]="{ item }">
                <v-icon
                    @click="setUpdateGift(item)"
                    class="ml-3"
                >
                    mdi-pencil-outline
                </v-icon>
                <v-icon
                    @click="deleteGift(item)"
                >
                    mdi-trash-can-outline
                </v-icon>
            </template>
        </v-data-table>

        <div class="row mt-10">
            <div class="col-12">
                <v-text-field
                    v-model="form.name"
                    label="نام هدیه"
                    class="w-100"
                    background-color="light"
                    hide-details
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>
            <div class="col-12 mt-3">
                <v-text-field
                    v-model="form.min_score"
                    label="حداقل امتیاز"
                    class="w-100"
                    background-color="light"
                    hide-details
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>
            <div class="col-12">
                <v-checkbox v-model="form.in_festival">
                    <template v-slot:label>
                        <div>هدیه برای جشنواره</div>
                    </template>
                </v-checkbox>
            </div>
            <div class="col-12 mt-3" v-if="form.in_festival">
                <v-autocomplete
                    v-model="form.rank"
                    :items="ranks"
                    label="رتبه"
                    hint="رتبه دریافت کننده هدیه"
                    clearable
                    dense
                    filled
                    rounded
                ></v-autocomplete>
            </div>
            <div class="col-12 w-100">
                <v-btn
                    v-if="isUpdate"
                    outlined
                    color="primary"
                    block
                    :loading="loading"
                    @click="updateGift"
                    v-text="'ویرایش هدیه'"
                ></v-btn>
                <v-btn
                    v-else
                    outlined
                    color="primary"
                    block
                    :loading="loading"
                    @click="addGift"
                    v-text="'ایجاد هدیه'"
                ></v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "giftPage",
    data() {
        return {
            headers: [
                { text: 'نام', value: 'name', sortable: false },
                { text: 'حداقل امتیاز', value: 'min_score', sortable: false },
                { text: 'استفاده در جشنواره', value: 'in_festival', sortable: false },
                { text: 'رتبه', value: 'rank', sortable: false },
                { text: "", value: "actions", sortable: false}
            ],
            gifts: [],
            ranks: ["1","2","3","4"],
            form: {
                name: "",
                min_score: "",
                in_festival: false,
                rank: ""
            },
            loading: false,
            tableLoading: false,
            isUpdate: false,
            updateId: ""
        }
    },
    created() {
        this.getGifts()
    },
    methods: {
        getGifts() {
            this.$store.commit("set_state", { group: "loading", field: "show", value: true })

            this.tableLoading = true
            axios.get("gift/get-all")
                .then(({data}) => {
                    this.gifts = data.data.gifts
                })
                .catch(err => this.handle_error(err))
                .finally(() => {
                    this.tableLoading = false
                    this.$store.commit("set_state", { group: "loading", field: "show", value: false })
                })
        },
        deleteGift(item) {
            this.prompt({title: "حذف", message: "برای حذف این هدیه مطمعن هستید؟"})
                .then(() => {
                    axios.delete(`gift/remove/${item._id}`)
                        .then(({data}) => {
                            this.notify(data.data.message, "success")
                            this.getGifts()
                        })
                        .catch(err => this.handle_error(err))
                })
        },
        resetForm() {
            this.form = {
                name: "",
                min_score: "",
                in_festival: false,
                rank: ""
            }
        },
        addGift() {
            this.loading = true

            axios.post("gift/add", this.form)
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.resetForm()
                    this.getGifts()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        },
        setUpdateGift(item) {
            this.isUpdate = true
            this.loading = true

            axios.get(`gift/get/${item._id}`)
                .then(({data}) => {
                    
                    Object.keys(this.form).forEach(field => {
                        this.form[field] = data.data.gift[field]
                    })

                    this.updateId = item._id

                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        },
        updateGift() {
            this.loading = true

            axios.patch(`gift/update/${this.updateId}`, this.form)
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.isUpdate = false
                    this.resetForm()
                    this.getGifts()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style>

</style>