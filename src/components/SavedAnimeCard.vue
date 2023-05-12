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
			<img class="saved__img" :src="anime.img" alt="" />

			<div class="saved__description">
				<p class="saved__title">{{ anime.title }}</p>
				<p class="saved__type">{{ anime.type }}</p>
				<span class="saved__genre">
					<p v-for="genre in anime.genre" :key="genre">
						{{ genre }},
					</p>
				</span>
			</div>
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
			font-size: 1.2rem;
		}

		@include breakpoint(600px) {
			& > * {
				font-size: 1.5rem;
			}
			&:hover {
				scale: 1.02;
			}
		}

		.saved__link {
			display: flex;
			padding: $padding-sm;

			@include breakpoint(600px) {
				align-items: center;

				padding: $padding-sm $padding-md;
			}

			.saved__img {
				height: 100px;
				object-fit: cover;
			}

			.saved__description {
				margin-left: $margin-md;
				display: flex;
				flex-direction: column;
				gap: $gap-sm;
				flex: 1;

				@include breakpoint(600px) {
					flex-direction: row;
					justify-content: space-between;
				}

				.saved__genre {
					display: flex;
					flex-wrap: wrap;
					gap: 3px;
				}
			}
		}

		.subtract {
			width: 24px;
			aspect-ratio: 1;
			cursor: pointer;

			position: absolute;
			top: -12px;
			right: -12px;
		}
	}

	// 	.saved__link {
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: space-between;

	// 		padding: $padding-sm $padding-md;
	// 		.saved__img {
	// 			img {
	// 				height: calc(100px - 2rem);
	// 				object-fit: cover;
	// 			}
	// 		}

	// 	}
	// }
</style>
