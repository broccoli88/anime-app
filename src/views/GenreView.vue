<script setup>
	import AnimeCard from "../components/AnimeCard.vue";
	import useFetch from "../composables/useFetch";
	import { useRoute } from "vue-router";
	import { ref, reactive, onMounted, watchEffect } from "vue";

	const route = useRoute();
	const previousPath = route.fullPath;
	const animeGenre = route.params.genre;
	const animeList = reactive({ list: [] });

	onMounted(async () => {
		const url = `https://anime-db.p.rapidapi.com/anime?page=1&size=10&genres=${animeGenre}`;
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
	});
</script>
<template>
	<section
		class="main-view"
		v-if="animeList.list.length > 0 && animeList.list !== null"
	>
		<h1>Genre: {{ animeGenre }}</h1>
		<AnimeCard
			v-for="(anime, index) in animeList.list"
			:key="anime._id"
			:anime="anime"
			:index="index"
		/>
	</section>
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
