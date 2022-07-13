<template>
	<hr />
	<button @click="getAllMessages()">Get All Messages</button><br />
	<hr />
	<button @click="removeAllMessages()">Remove All Messages</button>
	<hr />
	<h1>Messages</h1>
	<hr />
	<ul v-for="message in messages" :key="message.id">
		<li>
			<p>{{ message.type }}</p>
			<a target="_blank" :href="'http://localhost:3030/messages/' + message.id">Details</a>
			<!-- <p>{{ message.properties }}</p> -->
		</li>
		<hr />
	</ul>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
const messages = ref(null);

async function getAllMessages() {
	const response = await fetch('http://localhost:3030/messages');
	messages.value = await response.json();
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
</style>
