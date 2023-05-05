<script setup>
	import NavBar from "./components/NavBar.vue";
	import { RouterView } from "vue-router";
	import { provide, ref, reactive, watch } from "vue";

	const isFetching = ref(false);
	const searchAnime = ref("");

	const search = () => {
		isFetching.value = true;
		setTimeout(() => {
			isFetching.value = false;
		}, 1000);
	};

	provide("search-anime", searchAnime);
	provide("fetching", isFetching);
</script>

<template>
	<header>
		<NavBar v-model:title="searchAnime" @search="search" />
	</header>
	<main>
		<RouterView />
	</main>
</template>

<style lang="scss" scoped>
	main {
		@include container;
	}
</style>
