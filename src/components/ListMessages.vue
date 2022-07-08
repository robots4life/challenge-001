<script setup>
import { ref } from 'vue';

const messages = ref(null);

async function getAllMessages() {
	const response = await fetch('http://localhost:3030/messages');

	// https://developer.mozilla.org/en-US/docs/Web/API/Response/json
	// takes JSON and returns a JavaScript object !! JSON != JS ;)
	messages.value = await response.json();
}

function removeAllMessages() {
	return (messages.value = '');
}
</script>

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
			<p>{{ message.type }} : {{ message.id }}</p>
			<p>{{ message.properties.service_code }}</p>
			<!-- <p>{{ message.properties.description }}</p> -->
			<a target="_blank" :href="message.properties.url">{{ message.properties.url }}</a>
		</li>
		<hr />
	</ul>
</template>

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
