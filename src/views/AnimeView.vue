<script setup>
	import useFetch from "../composables/useFetch";
	import { useRoute } from "vue-router";
	import { ref, onMounted } from "vue";
	const anime = ref();
	const route = useRoute();
	const animeId = parseInt(route.params.id);

	onMounted(async () => {
		const url = `https://anime-db.p.rapidapi.com/anime/by-id/${route.params.id}`;
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
		anime.value = response.value;
		console.log(anime.value);
	});
</script>
<template>
	<section v-if="anime !== null && anime">
		<article class="container-anime">
			<div class="anime__side-info">
				<figure class="anime__img">
					<img :src="anime.image" alt="" />
				</figure>

				<h2 class="anime__title">{{ anime.title }}</h2>
				<h3 class="anime__type">{{ anime.type }}</h3>
				<span v-for="genre in anime.genres" :key="genre">
					<p class="anime__genres">{{ genre }}</p>
				</span>
			</div>
			<div class="anime__main-info">
				<p class="anime__synopsis">
					{{ anime.synopsis }}
				</p>
			</div>
		</article>
	</section>
	<div class="fallback" v-else>Loading...</div>
</template>

<style lang="scss" scoped></style>
