<script setup>
	import useFetch from "./composables/useFetch";
	import NavBar from "./components/NavBar.vue";
	import { reactive, ref } from "vue";

	const animeList = reactive({ list: [] });

	// Fetch data - anime list
	const searchPhrase = ref();

	const getData = async () => {
		const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchPhrase.value}&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc`;
		const options = {
			method: "GET",
			headers: {
				"X-RapidAPI-Key":
					"c711947e3amsh0c697f08f7842e1p1f50d7jsndcb62addaea8",
				"X-RapidAPI-Host": "anime-db.p.rapidapi.com",
			},
		};
		const { response, fetchData } = useFetch(url, options);

		await fetchData();
		animeList.list = response.value.data;
		console.log(animeList.list);
	};
	const searchTitle = () => {
		getData();
	};
</script>

<template>
	<NavBar v-model:title="searchPhrase" @search="searchTitle" />

	<div v-if="searchPhrase && searchPhrase !== null">
		<p>{{ animeList.list[0].alternativeTitles[0] }}</p>
	</div>
	<p v-else>Loading...</p>
</template>

<style lang="scss" scoped></style>
