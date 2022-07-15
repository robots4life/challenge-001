<template>
	<div class="single-message">
		<h1>Single Message Details</h1>
		<h2>Case : {{ $route.params.id }}</h2>
		<hr />
		<p>{{ messageDetails.type }}</p>
		<p>{{ messageDetails.geometry.coordinates }}</p>
		<p>{{ messageDetails.properties.service_request_id }}</p>
		<p>{{ messageDetails.properties.service_code }}</p>
		<p>{{ messageDetails.properties.status }}</p>
		<p>{{ messageDetails.properties.detail }}</p>
		<p>{{ messageDetails.properties.media_url }}</p>
		<p>{{ messageDetails.properties.interface_used }}</p>
		<p>{{ messageDetails.properties.requested_datetime }}</p>
		<p>{{ messageDetails.properties.agency_sent_datetime }}</p>
		<p>{{ messageDetails.properties.updated_datetime }}</p>
		<p>{{ messageDetails.properties.service_notice }}</p>
		<p>{{ messageDetails.properties.title }}</p>
		<p>{{ messageDetails.properties.description }}</p>
		<p>{{ messageDetails.properties.service_name }}</p>
		<a href="{{ messageDetails.properties.url }}">{{ messageDetails.properties.url }}</a>
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
