<script setup>
	import { RouterLink } from "vue-router";
	import { ref } from "vue";
	import state from "../store/store";

	const props = defineProps(["anime", "index"]);
	const emits = defineEmits(["save-anime"]);

	const saveAnime = () => {
		const anime = {
			title: props.anime.title,
			genre: [...props.anime.genres],
			type: props.anime.type,
			img: props.anime.image,
			ranking: props.anime.ranking,
			synopsis: props.anime.synopsis,
			status: props.anime.status,
			id: props.anime._id,
		};

		state.savedAnimeList.push(anime);
	};
</script>
<template>
	<div class="anime-container">
		<figure class="add" @click.stop="saveAnime">
			<img src="@/assets/images/add.svg" alt="" />
		</figure>
		<router-link :to="`/anime/${anime._id}`" class="anime__link">
			<figure class="anime__img">
				<img :src="anime.image" alt="" />
			</figure>
			<p class="anime__title">{{ index + 1 + "." }} {{ anime.title }}</p>
		</router-link>
	</div>
</template>

<style lang="scss" scoped>
	.anime-container {
		display: grid;
		grid-auto-rows: min-content;
		gap: 1rem;

		border: $border-primary;
		border-radius: $border-radius-sm;
		overflow: hidden;
		transition: 0.3s all ease;

		position: relative;

		&:hover {
			scale: 1.05;
		}
		.add {
			cursor: pointer;

			width: 24px;
			aspect-ratio: 1;

			position: absolute;
			bottom: 0.5rem;
			right: 1rem;
		}
	}

	.anime__link {
		padding: $padding-sm $padding-sm $padding-md;
		transition: 0.3s all ease;

		.anime__img {
			& > img {
				@include img;
			}
		}

		.anime__title {
			word-wrap: break-word;
		}
	}
</style>
