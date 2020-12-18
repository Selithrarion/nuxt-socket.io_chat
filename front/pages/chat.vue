<template>
	<div class="chat">
<!--		<v-list flat>-->
<!--			<v-list-item-group>-->
<!--				<ChatMessage-->
<!--					v-for="message in messages"-->
<!--					:key="message.createdAt"-->
<!--					:message="message"-->
<!--					:isOwner="user.id === message.id"-->
<!--				/>-->
<!--			</v-list-item-group>-->
<!--		</v-list>-->
		<ChatMessage
			v-for="message in messages"
			:key="message.createdAt"
			:message="message"
			:isOwner="user.id === message.id"
		/>

		<div class="divider"></div>

		<ChatFormAddMessage class="chat-form-add-message pt-2" />
	</div>
</template>
<script>
import { mapState } from 'vuex';
export default {
	middleware: ['isAuth'],
	data() {
		return {};
	},
	computed: {
		...mapState({
			user: 'user',
			messages: 'messages',
		}),
	},
	methods: {},
};
</script>
<style scoped>
	.divider {
		height: 4px;
		background: #eaeaea;
		border-radius: 4px;
	}
</style>
