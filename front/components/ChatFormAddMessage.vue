<template>
	<div class="chat-form-add-message">
		<v-text-field
			v-model="text"
			solo
			@keydown.enter="sendMessage"
		></v-text-field>
	</div>
</template>

<script>
export default {
	data() {
		return {
			text: '',
			isCreatingMessage: false,
		};
	},
	methods: {
		async sendMessage() {
			try {
				if (this.text === '') return;
				this.isCreatingMessage = true;
				const formData = {
					text: this.text,
					id: this.$store.state.user.id,
				};

				await this.$socket.emit('createMessage', formData);

				this.isCreatingMessage = false;
				this.text = '';
			} catch (e) {
				this.isCreatingMessage = false;
				console.error(e);
			}
		},
	},
};
</script>
<style scoped>

</style>
