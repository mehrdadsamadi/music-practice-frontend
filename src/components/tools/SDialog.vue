<template>
    <v-dialog :value="value" @input="v => $emit('input', v)" :width="width" :fullscreen="fullscreen" :content-class="contentClass">
        <div class="card border-0">
            <div v-if="$slots.title" class="card-title d-flex justify-content-between">
				<slot name="prev-title"></slot>

                <p class="h5 mt-2 mb-0">
                    <slot name="title"></slot>
                </p>

                <v-btn @click="$emit('input', false)" class="justify-content-end" icon>
                    <svg width="1.5em" height="1.5em" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </v-btn>
            </div>
            
            <v-divider class="mt-0"></v-divider>

            <div class="card-body px-0 pt-0" :class="verticalCenter ? 'd-flex align-items-center' : ''">
                <slot></slot>
            </div>

            <div v-if="$slots.actions" class="card-actions">
                <slot name="actions"></slot>
            </div>
        </div>
    </v-dialog>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
        },

        width: {
            default: 350
        },

		verticalCenter: {
			type: Boolean,
			default: false
		},

		fullscreen: {
			type: Boolean,
			default: false
		},

		contentClass: {
			type: String,
			default: ""
		}
    },
}
</script>

<style lang="scss">
.v-dialog.v-dialog--fullscreen {
	.card {
		height: auto;
		min-height: 100%;
	}
}
</style>
