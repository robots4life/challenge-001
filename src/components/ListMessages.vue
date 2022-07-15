<template>
	<hr />
	<button @click="getAllMessages()">Get All Messages</button><br />
	<hr />
	<div v-if="errorMessage" class="error">
		<p>Error Fetching Messages</p>
		<p>{{ errorDetails }}</p>
	</div>
	<button @click="removeAllMessages()">Remove All Messages</button>
	<hr />
	<h1>Messages</h1>
	<hr />
	<ul v-for="message in messages" :key="message.id">
		<li>
			<p>{{ message.type }} : {{ message.id }}</p>
			<a target="_blank" :href="'http://localhost:3030/messages/' + message.id">Details</a>
			<div class="messageDetails">
				<button
					class="messageDetailsButton"
					@click="
						{
							expandedMessageId = message.id;
						}
					"
				>
					Show Message
				</button>
				<p v-if="expandedMessageId == message.id">{{ message.properties }}</p>
			</div>
		</li>
		<hr />
	</ul>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';

const messages = ref(null);
let expandedMessageId = ref(null);
let errorMessage = ref(null);
let errorDetails = ref(null);

async function getAllMessages() {
	try {
		const response = await fetch('http://localhost:3030/messages');
		messages.value = await response.json();
	} catch (error) {
		errorMessage.value = true;
		errorDetails.value = error;
	}
}

onBeforeMount(() => {
	getAllMessages();
});

function removeAllMessages() {
	return (messages.value = '');
}
</script>

<style scoped>
ul,
p {
	font-size: 1.4rem;
	margin: 0;
	padding: 0;
}
li {
	list-style-type: none;
}
.messageDetails,
.messageDetailsButton {
	padding: 2rem;
	margin-bottom: 2rem;
}
</style>
