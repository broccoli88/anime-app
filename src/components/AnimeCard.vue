<script setup>
	import { RouterLink } from "vue-router";
	import { ref, onMounted } from "vue";
	import state from "../store/store";

	const props = defineProps(["anime", "index"]);
	const emits = defineEmits(["save-anime"]);

	const isSaved = ref(false);

	const saveAnime = () => {
		const anime = {
			title: props.anime.title,
			genre: [...props.anime.genres],
			type: props.anime.type,
			img: props.anime.image,
			// ranking: props.anime.ranking,
			// synopsis: props.anime.synopsis,
			status: props.anime.status,
			id: props.anime._id,
		};

		if (
			state.savedAnimeList.some((a) => {
				return a.id === anime.id;
			})
		)
			return;

		state.savedAnimeList.push(anime);
		console.log(state.savedAnimeList);

		isSaved.value = true;
	};

	const removeAnime = () => {
		state.savedAnimeList = state.savedAnimeList.filter((a) => {
			return a.id !== props.anime._id;
		});

		isSaved.value = false;
	};

	onMounted(async () => {
		if (state.savedAnimeList.some((a) => a.id === props.anime._id)) {
			isSaved.value = true;
		}
	});
</script>
<template>
	<div class="anime-container">
		<figure class="add">
			<img
				src="@/assets/images/add.svg"
				alt=""
				v-if="!isSaved"
				@click.stop="saveAnime"
			/>
			<img
				src="@/assets/images/subtract.svg"
				alt=""
				@click.stop="removeAnime"
				v-else
			/>
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
