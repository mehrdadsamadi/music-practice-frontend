<template>
	<v-dialog persistent v-model="loading_show" max-width="290" content-class="prompt">
		<div class="card">
			<div class="card-body text-center">
				<div class="d-flex flex-column justify-center align-center">
					<v-progress-linear
						indeterminate
						color="error"
					></v-progress-linear>
					<p class="font-size-sm mt-3" dir="ltr" v-text="loading.title"></p>
				</div>
			</div>
		</div>
	</v-dialog>
</template>

<script>
export default {
	computed: {
		loading: {
			get() {
				return this.$store.state.loading;
			},
			set() {
				//
			}
		},
		loading_show: {
			get() {
				return this.$store.state.loading.show;
			},
			set() {
				//
			}
		},
	}
}
</script>

<style lang="scss">
.v-dialog.prompt {
	.v-card__title {
		word-break: break-word;
	}
}

.v-snack__wrapper {
	position: fixed !important;
	bottom: 0px;
	// left: 0px;
}
</style>
