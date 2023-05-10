<script setup>
	import Loader from "../components/Loader.vue";
	import useFetch from "../composables/useFetch";
	import { useRoute } from "vue-router";
	import { ref, onMounted } from "vue";
	const anime = ref();
	const route = useRoute();

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
	});
</script>
<template>
	<section v-if="anime !== null && anime">
		<article class="container-anime">
			<div class="anime__side-info">
				<figure class="anime__img">
					<img :src="anime.image" alt="" />
				</figure>
				<section class="anime__side-info-text">
					<h2 class="anime__title">{{ anime.title }}</h2>
					<p class="anime__type">Type: {{ anime.type }}</p>
					<div>
						<p>Genres:&nbsp;</p>
						<span v-for="genre in anime.genres" :key="genre">
							<p class="anime__genres">{{ genre }},</p>
						</span>
					</div>
					<p>Episodes: {{ anime.episodes }}</p>
					<p>Status: {{ anime.status }}</p>
				</section>
			</div>
			<div class="anime__main-info">
				<h3>Synopsis</h3>
				<p class="anime__synopsis">
					{{ anime.synopsis }}
				</p>
			</div>
		</article>
	</section>
	<Loader v-else></Loader>
</template>

<style lang="scss" scoped>
	.anime__side-info {
		display: grid;

		gap: $gap-lg;
		margin-bottom: $margin-lg;

		@include breakpoint(615px) {
			grid-template-columns: auto 1fr;
		}
		.anime__img {
			max-width: 250px;
			margin-inline: $margin-auto;

			& > img {
				width: 100%;
				object-fit: cover;
			}
		}

		.anime__side-info-text {
			padding: $padding-md;
			h2 {
				margin-bottom: $margin-lg;
			}

			p {
				margin-bottom: $margin-sm;
			}

			& div:nth-child(3) {
				display: flex;
			}
		}
	}

	.anime__main-info {
		padding: $padding-lg $padding-md;
		border-radius: $border-radius-md;

		h3 {
			margin-bottom: $margin-md;
		}

		.anime__synopsis {
			line-height: 1.5;
			letter-spacing: 1px;
		}
	}
</style>
