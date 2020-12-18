<template>
	<v-app>
		<v-navigation-drawer app>
			<v-list flat>
				<v-list-item-group>
					<v-list-item v-for="otherUser in users" :key="otherUser.id">
						<v-list-item-content>
							<v-list-item-title>
								{{ otherUser.name }}
							</v-list-item-title>
						</v-list-item-content>
						<v-list-item-action>
							<v-icon
								:color="
									otherUser.id === user.id
										? 'primary'
										: 'grey'
								"
								>mdi-account</v-icon
							>
						</v-list-item-action>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-navigation-drawer>

		<v-app-bar flat app>
			<v-btn icon @click="logoutFromChat">
				<v-icon>mdi-logout</v-icon>
			</v-btn>
			<v-toolbar-title>Чат комнаты {{ user.room }}</v-toolbar-title>
		</v-app-bar>
		<v-main>
			<v-container style="height: 100vh">
				<v-row justify="center">
					<v-col cols="12" sm="12" md="8">
						<nuxt />
					</v-col>
				</v-row>
			</v-container>
		</v-main>
	</v-app>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
	data() {
		return {
		};
	},
	computed: {
		...mapState({
			user: 'user',
			users: 'users'
		}),
	},
	methods: {
		...mapActions({
			logout: 'logout',
		}),
		async logoutFromChat() {
			await this.$socket.emit('userLogout', this.user.id, () => {
				this.$router.push('/');
				this.logout();
			})

		},
	},
	mounted() {},
};
</script>
