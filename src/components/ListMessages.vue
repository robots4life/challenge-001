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
//
// by doing getAllMessages we already get all the date for each message
// so having a query to get a single message data is redundant and only extra traffic to the API !
//
// async function getSingleMessageDetails(id) {
// 	const response = await fetch(`http://localhost:3030/messages/${id}`);
// 	singleMessageDetails.value = await response.json();
// 	console.log(singleMessageDetails.value);
// }
//
// solution: use the v-show directive ?
// https://vuejs.org/guide/essentials/conditional.html#v-show
/* "The difference is that an element with v-show will always be rendered and
	remain in the DOM; v-show only toggles the display CSS property of the element."
*/

let showMessageDetails = false;
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
			<!-- don't do this below -->
			<!-- <button @click="getSingleMessageDetails(message.id)">Show Message Details</button> -->
			<!-- {{ singleMessageDetails }} -->

			<!-- instead use the v-show directive -->
			<button @click="showMessageDetails = !showMessageDetails">Show Message Details</button>
			<!-- but this also does not work as expected -->
			<div v-show="showMessageDetails">
				<p>{{ message.properties }}</p>
			</div>
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
