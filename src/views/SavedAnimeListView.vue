<script setup>
	import SavedAnimeCard from "../components/SavedAnimeCard.vue";
	import state from "../store/store";
	import { ref } from "vue";

	const savedAnimeList = ref(state.savedAnimeList);
	const removeAnime = (id) => {
		savedAnimeList.value = savedAnimeList.value.filter((a) => {
			return a.id !== id;
		});

		state.savedAnimeList = savedAnimeList.value;
	};
</script>
<template>
	<div>
		<h1>Saved Anime List</h1>

		<div>
			<TransitionGroup tag="ul" name="fade" class="saved-anime-list">
				<SavedAnimeCard
					@remove-anime="removeAnime"
					v-for="(anime, index) in savedAnimeList"
					:key="anime.id"
					:anime="anime"
					:index="index"
				/>
			</TransitionGroup>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	h1 {
		margin-bottom: 4rem;
	}
	.saved-anime-list {
		display: grid;
		grid-auto-flow: row;
		gap: $gap-md;
	}

	.fade-leave-to {
		opacity: 0;
		transform: translateX(-100px);
	}

	.fade-move,
	.fade-leave-active {
		transition: 0.4s all ease;
	}

	.fade-leave-active {
		position: absolute;
	}
</style>
