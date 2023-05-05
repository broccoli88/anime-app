<script setup>
	import useFetch from "../composables/useFetch";
	import NavBar from "../components/NavBar.vue";
	import AnimeCard from "../components/AnimeCard.vue";
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
	<header>
		<NavBar v-model:title="searchPhrase" @search="searchTitle" />
	</header>
	<main>
		<section
			class="main-view"
			v-if="animeList.list.length > 0 && animeList.list !== null"
		>
			<AnimeCard
				v-for="anime in animeList.list"
				:key="anime._id"
				:anime="anime"
			/>
		</section>
		<p v-else>Loading...</p>
	</main>
</template>

<style lang="scss" scoped>
	main {
		width: min(1024px, 100%);
		min-height: 100vh;
		margin: 0 $margin-auto;
		// border: $border-secondary;
	}

	.main-view {
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		gap: $gap-sm;
		padding: $padding-md;
	}
</style>
