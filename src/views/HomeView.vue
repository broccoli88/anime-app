<script setup>
	import useFetch from "../composables/useFetch";
	import AnimeCard from "../components/AnimeCard.vue";
	import Loader from "../components/Loader.vue";
	import { reactive, onMounted } from "vue";

	const animeRanking = reactive({ list: [] });

	// onMounted(async () => {
	// 	const url =
	// 		"https://anime-db.p.rapidapi.com/anime?page=1&size=10&sortBy=ranking";

	// 	const options = {
	// 		method: "GET",
	// 		headers: {
	// 			"X-RapidAPI-Key":
	// 				"c711947e3amsh0c697f08f7842e1p1f50d7jsndcb62addaea8",
	// 			"X-RapidAPI-Host": "anime-db.p.rapidapi.com",
	// 		},
	// 	};

	// 	const { response, fetchData } = useFetch(url, options);

	// 	await fetchData();
	// 	animeRanking.list = response.value.data;
	// });
</script>
<template>
	<section
		class="main-view"
		v-if="animeRanking.list.length > 0 && animeRanking.list !== null"
	>
		<h1>Anime Ranking top 10:</h1>

		<AnimeCard
			v-for="(anime, index) in animeRanking.list"
			:key="anime._id"
			:anime="anime"
			:index="index"
			:data-index="index"
		/>
	</section>
	<Loader v-else></Loader>
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
