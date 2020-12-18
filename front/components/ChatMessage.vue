<template>
	<!--	<v-list-item class="message" :class="{ owner: isOwner }">-->
	<!--		<v-list-item-content v-if="isSystemMessage">-->
	<!--			<v-list-item-title class="message__title-system mb-2">-->
	<!--				<span>{{ message.text }}</span>-->
	<!--			</v-list-item-title>-->
	<!--			<v-divider />-->
	<!--		</v-list-item-content>-->

	<!--		<v-list-item-content v-else>-->
	<!--			<v-list-item-title class="message__title mb-1">-->
	<!--				<span class="font-weight-bold">{{ message.name }}</span>-->
	<!--				<span class="text&#45;&#45;disabled">{{new Date(message.createdAt).toLocaleString()}}</span>-->
	<!--			</v-list-item-title>-->
	<!--			<span>{{ message.text }}</span>-->
	<!--		</v-list-item-content>-->
	<!--	</v-list-item>-->
	<div class="chat-message">
		<v-card v-if="isSystemMessage" class="mb-2" elevation="0">
			<v-card-title class="pt-2 pb-1">
				{{ message.text }}
			</v-card-title>
			<v-divider></v-divider>
		</v-card>

		<v-card v-else class="mb-2" elevation="1" :class="{ owner: isOwner }">
			<v-card-title class="pt-2 pb-1">
				<span>{{ message.name }}</span>
				<span class="message__title-date">
				{{ new Date(message.createdAt).toLocaleString() }}
			</span>
			</v-card-title>
			<v-card-text class="">{{ message.text }}</v-card-text>
		</v-card>
	</div>
</template>
<script>
export default {
	props: {
		message: {
			type: Object,
			required: true,
		},
		isOwner: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		isSystemMessage() {
			return this.message.name === 'admin';
		},
	},
};
</script>

<style scoped>
.v-card__title {
	display: flex;
	justify-content: space-between;
	font-size: 1rem;
}
.message__title-date {
	font-size: 0.8rem;
	opacity: 0.5;
}
.message__title-system {
	display: flex;
	justify-content: space-between;
	color: orangered;
}
.owner {
	background: #f8f8f8;
}
</style>
