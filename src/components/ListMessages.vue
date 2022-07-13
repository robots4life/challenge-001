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
			<div class="messageDetails">
				<button @click="getMessageDetails(message.id)">Get Message Details</button>
				<p>{{ messageData.details }}</p>
			</div>
			<!-- <p>{{ message.properties }}</p> -->
		</li>
		<hr />
	</ul>
</template>

<script setup>
import { ref, onBeforeMount, reactive } from 'vue';
const messages = ref(null);

async function getAllMessages() {
	const response = await fetch('http://localhost:3030/messages');
	messages.value = await response.json();
}

onBeforeMount(() => {
	getAllMessages();
});

const messageData = reactive({
	details: 'Message Details'
});

async function getMessageDetails(id) {
	const response = await fetch(`http://localhost:3030/messages/${id}`);
	messageData.details = await response.json();
}

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
