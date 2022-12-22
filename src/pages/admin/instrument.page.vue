<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">کنترل ساز ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <v-data-table
            :headers="headers"
            :items="instruments"
            :items-per-page="10"
            :loading="tableLoading"
            loading-text="در حال دریافت اطلاعات ..."
            hide-default-footer
            class="elevation-1"
        >
            <template v-slot:no-data>
                <p>فستیوالی برای نمایش وجود ندارد</p>
            </template>

            <template #[`item.name`]="{item}">
                <v-chip
                    v-text="item.name"
                    :color="item.name == 'تمبک' ? 'primary' : item.name == 'دف' ? 'error' : 'secondary'"
                ></v-chip>
            </template>

            <template #[`item.actions`]="{ item }">
                <v-icon
                    @click="deleteInstroment(item)"
                >
                    mdi-trash-can-outline
                </v-icon>
            </template>
        </v-data-table>

        <div class="row mt-10">
            <div class="col-10">
                <v-text-field
                    v-model="name"
                    @keyup.enter="addInstrument"
                    label="نام ساز"
                    class="w-100"
                    background-color="light"
                    hide-details
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>
            <div class="col-2 pr-0">
                <v-btn
                    outlined
                    fab
                    color="primary"
                    :loading="loading"
                    @click="addInstrument"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "instrumentPage",
    data() {
        return {
            headers: [
                { text: 'نام', value: 'name', sortable: false },
                { text: "", value: "actions", sortable: false}
            ],
            instruments: [],
            name: "",
            loading: false,
            tableLoading: false,
        }
    },
    created() {
        this.getInstruments()
    },
    methods: {
        getInstruments() {
            this.$store.commit("set_state", { group: "loading", field: "show", value: true })

            this.tableLoading = true
            axios.get("instrument/get-all")
                .then(({data}) => {
                    this.instruments = data.data.instruments
                })
                .catch(err => this.handle_error(err))
                .finally(() => {
                    this.tableLoading = false
                    this.$store.commit("set_state", { group: "loading", field: "show", value: false })
                })
        },
        deleteInstroment(item) {
            this.prompt({title: "حذف", message: "برای حذف این ساز مطمعن هستید؟"})
                .then(() => {
                    axios.delete(`instrument/remove/${item._id}`)
                        .then(({data}) => {
                            this.notify(data.data.message, "success")
                            this.getInstruments()
                        })
                        .catch(err => this.handle_error(err))
                })
        },
        addInstrument() {
            this.loading = true

            axios.post("instrument/add", {name: this.name})
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.name = ""
                    this.getInstruments()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style>

</style>