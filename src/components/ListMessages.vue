<template>
	<div class="home">
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
			<!-- 
				https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
				native alternative to the toggle show hide content
			-->
			<details>
				<summary>Details</summary>
				{{ message.properties }}
			</details>
			<hr />
		</ul>
	</div>
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
.home {
	text-align: center;
	padding: 2rem;
	font-size: 1.5rem;
}
ul,
p {
	font-size: 1.5rem;
}
li {
	list-style-type: none;
}
button {
	padding: 1rem;
	font-size: 1.5rem;
	margin: 1rem;
}
details {
	cursor: pointer;
	padding: 1rem;
	font-size: 1.5rem;
	margin: 1rem;
}
</style>
