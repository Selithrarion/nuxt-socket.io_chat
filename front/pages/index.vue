<template>
	<v-form ref="form" v-model="isValid" class="mt-6">
		<v-text-field
			v-model="name"
			:counter="20"
			:rules="nameRules"
			label="Имя"
			required
		></v-text-field>
		<v-text-field
			v-model="room"
			:rules="roomRules"
			label="Комната"
			required
		></v-text-field>
		<v-btn
			color="primary"
			:disabled="!isValid"
			block
			class="mt-4"
			@click="submit"
		>
			Войти
		</v-btn>
	</v-form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	layout: 'empty',
	sockets: {
		connect() {
			console.log('client socket connected');
		},
	},
	data() {
		return {
			isValid: false,
			name: '',
			room: '',
			nameRules: [
				(v) => !!v || 'Имя обязательно',
				(v) => v.length <= 20 || 'Слишком длинное имя',
			],
			roomRules: [(v) => !!v || 'Название комнаты обязательно'],
		};
	},
	methods: {
		...mapActions({
			setUser: 'setUser',
		}),
		async submit() {
			try {
				const formData = {
					name: this.name,
					room: this.room,
				};

				await this.$socket.emit('userJoinRoom', formData, (data) => {
					if (typeof data === 'string') {
						console.error(data);
						return;
					} else {
						formData.id = data.userID;
					}
				});

				await this.setUser(formData);
				this.$router.push('/chat');
			} catch (e) {
				console.error(e);
			}
		},
	},
	mounted() {},
};
</script>
