<template>
	<v-snackbar
		v-model="snackbar_show"
		:timeout="snackbar.timeout"
		transition="slide-y-reverse-transition"
		class="rounded-lg"
	>
		<span v-html="snackbar.content"></span>

		<v-btn :color="snackbar.color" @click="snackbar_show = false" small tile class="mr-2" depressed>بستن</v-btn>
	</v-snackbar>
</template>

<script>
export default {
	computed: {
		snackbar() {
			return this.$store.state.snackbar;
		},

		snackbar_show: {
			get() {
				return this.$store.state.snackbar.show;
			},
			set(value) {
				this.$store.commit("set_state", {
					group: "snackbar",
					field: "show",
					value,
				});
			}
		}
	}
}
</script>

<style lang="scss">
.v-snack {
	.v-snack__content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-left: 0.6em;
	}

	@media only screen and(max-width: 599px) {
		left: 0px !important;
		right: 0px !important;
		bottom: 0px !important;

		.v-snack__wrapper {
			min-height: 4em !important;
			border-radius: 0px !important;
		}
	}
}
</style>
