<script setup>
	import useFetch from "../composables/useFetch";
	import AnimeCard from "../components/AnimeCard.vue";
	import { reactive, ref, watch, inject, onMounted } from "vue";

	const animeList = reactive({ list: [] });
	const searchAnime = inject("search-anime");
	const isFetching = inject("fetching");
	const isSearching = ref(false);

	const fetchAnimeList = async () => {
		isSearching.value = true;
		const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=12&search=${searchAnime.value}&genres=Fantasy%2CDrama&sortBy=ranking&sortOrder=asc`;
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
	onMounted(() => {
		fetchAnimeList();
	});

	watch(isFetching, () => {
		if (isFetching.value === true) {
			fetchAnimeList();
		}
	});
</script>
<template>
	<section
		class="main-view"
		v-if="
			animeList.list.length > 0 && animeList.list !== null && isSearching
		"
	>
		<h1>Search results for: {{ searchAnime }}</h1>
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
		@include mainView;

		h1 {
			display: block;
			grid-column: 1 / -1;
			margin-bottom: $margin-lg;
		}
	}
</style>
