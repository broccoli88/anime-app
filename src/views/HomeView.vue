<script setup>
	import useFetch from "../composables/useFetch";
	import AnimeCard from "../components/AnimeCard.vue";
	import { reactive, ref, watch, inject, onMounted } from "vue";

	const animeList = reactive({ list: [] });
	const animeGenres = reactive({ list: [] });
	const searchAnime = inject("search-anime");
	const isFetching = inject("fetching");

	const fetchAnimeList = async () => {
		const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&search=${searchAnime.value}&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc`;
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
	};

	onMounted(async () => {
		for (let i = 1; i <= 10; i++) {
			const url = `https://anime-db.p.rapidapi.com/anime/by-ranking/${i}`;
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
			animeGenres.list.push(response.value);
		}
		console.log(animeGenres.list);
	});

	watch(isFetching, () => {
		if (isFetching.value == true) {
			fetchAnimeList();
		}
	});
</script>
<template>
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
</template>

<style lang="scss" scoped>
	.main-view {
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		gap: $gap-sm;
		padding: $padding-md;
	}
</style>
