<script setup>
	import { RouterLink } from "vue-router";

	const props = defineProps(["anime", "index"]);
</script>
<template>
	<router-link :to="`/anime/${anime._id}`" class="anime-container">
		<figure class="anime__img">
			<img :src="anime.image" alt="" />
		</figure>

		<p class="anime__title">{{ index + 1 + "." }} {{ anime.title }}</p>
	</router-link>
</template>

<style lang="scss" scoped>
	.anime-container {
		display: grid;
		grid-auto-rows: min-content;
		gap: 1rem;

		padding: $padding-sm;
		border: $border-primary;
		border-radius: $border-radius-sm;
		overflow: hidden;

		&:hover {
			scale: 1.05;
		}

		.anime__img {
			// flex: 1;
			& > img {
				@include img;
			}
		}

		.anime__title {
			word-wrap: break-word;
		}
	}
</style>
