<script setup>
	const props = defineProps(["anime", "index"]);
	const emits = defineEmits(["remove-anime"]);

	const emitRemoveAnime = () => {
		emits("remove-anime", props.anime.id);
	};
</script>
<template>
	<li class="anime-saved-container">
		<figure class="subtract" @click.stop="emitRemoveAnime">
			<img src="@/assets/images/subtract.svg" alt="" />
		</figure>
		<router-link class="saved__link" :to="`/anime/${anime.id}`">
			<figure class="saved__img">
				<img :src="anime.img" alt="" />
			</figure>
			<p class="saved__title">{{ anime.title }}</p>
			<p class="saved__type">{{ anime.type }}</p>
			<span class="saved__genre">
				<p v-for="genre in anime.genre" :key="genre">{{ genre }},</p>
			</span>
		</router-link>
	</li>
</template>

<style lang="scss" scoped>
	.anime-saved-container {
		border: $border-primary;
		border-radius: $border-radius-sm;

		position: relative;

		transition: scale 0.3s ease;

		& > * {
			font-size: 1.5rem;
		}

		&:hover {
			scale: 1.02;
		}

		.subtract {
			width: 24px;
			aspect-ratio: 1;
			cursor: pointer;

			position: absolute;
			top: -12px;
			right: -12px;
		}
		.saved__link {
			display: flex;
			align-items: center;
			justify-content: space-between;

			padding: $padding-sm $padding-md;
			.saved__img {
				img {
					height: calc(100px - 2rem);
					object-fit: cover;
				}
			}

			.saved__genre {
				display: flex;
				gap: 3px;
			}
		}
	}
</style>
