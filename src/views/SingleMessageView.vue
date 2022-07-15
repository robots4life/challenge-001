<template>
	<div class="single-message">
		<h1>Single Message Details</h1>
		<h2>Case : {{ $route.params.id }}</h2>
		<hr />
	</div>
</template>

<style scoped>
.single-message {
	text-align: center;
	padding: 2rem;
	font-size: 1.5rem;
}
</style>
