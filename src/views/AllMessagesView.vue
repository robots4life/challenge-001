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
				<RouterLink :to="`/message/${message.id}`">{{ message.id }}</RouterLink>
			</li>
			<hr />
		</ul>
	</div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';

const messages = ref(null);
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
	padding: 1rem;
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
h1 {
	font-size: 2.5rem;
}
</style>
