<template>
	<div class="single-message">
		<h1>Single Message Details</h1>
		<h2>Case : {{ $route.params.id }}</h2>
		<hr />
		<p>{{ messageDetails }}</p>
	</div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
let messageDetails = ref(null);

const route = useRoute();
console.log(route.params.id);

async function getSingleMessageDetails() {
	try {
		const response = await fetch(`http://localhost:3030/messages/${route.params.id}`);
		messageDetails.value = await response.json();
	} catch (error) {
		console.log(error);
	}
}

onBeforeMount(() => {
	getSingleMessageDetails();
});
</script>

<style scoped>
.single-message {
	text-align: center;
	padding: 2rem;
	font-size: 1.5rem;
}
</style>
