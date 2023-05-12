<script setup>
	import NavBar from "./components/NavBar.vue";
	import { RouterView, useRouter, useRoute } from "vue-router";
	import { provide, ref, watch } from "vue";

	const route = useRoute();
	const router = useRouter();
	const isFetching = ref(false);
	const searchAnime = ref("");

	const search = () => {
		router.push("/search");
		isFetching.value = true;
		setTimeout(() => {
			isFetching.value = false;
		}, 1000);
	};

	provide("search-anime", searchAnime);
	provide("fetching", isFetching);

	const backward = () => {
		router.back();
	};
</script>

<template>
	<header>
		<NavBar v-model:title="searchAnime" @search="search" />
	</header>

	<main>
		<div class="backwards" @click="backward" v-if="route.fullPath !== '/'">
			<img src="./assets/images/chevron.svg" alt="" />
			<span>Go back</span>
		</div>
		<RouterView v-slot="{ Component }">
			<transition name="fade" mode="out-in">
				<component :is="Component" />
			</transition>
		</RouterView>
	</main>
</template>

<style lang="scss" scoped>
	.backwards {
		cursor: pointer;
		transition: all 0.4s ease;

		@include breakpoint(1200px) {
			border: none;
			box-shadow: $box-shadow-dark-15;

			position: fixed;
			top: 50%;
			left: 0;

			transform: translateY(-50%);

			display: flex;
			align-items: center;
			gap: $gap-sm;

			span {
				text-orientation: upright;
				writing-mode: vertical-rl;
				text-transform: uppercase;
				text-align: center;
				font-size: 2rem;
			}

			img {
				display: initial;
				width: 0px;
				transition: all 0.3s ease;
			}

			&:hover img {
				width: 30px;
			}
		}
	}

	@media (max-width: 1199px) {
		.backwards {
			border: $border-base;
			border-radius: $border-radius-sm;
			padding: calc($padding-sm / 2);
			width: fit-content;
			margin-bottom: $margin-lg;

			&:hover {
				color: $color-primary-light;
				border-color: $color-primary-light;
			}

			img {
				display: none;
			}
		}
	}

	main {
		@include container;
	}

	.fade-enter-from {
		opacity: 0;
		transform: translateX(400px);
	}
	.fade-leave-to {
		opacity: 0;
		transform: translateX(-400px);
	}

	.fade-enter-active,
	.fade-leave-active {
		transition: 0.4s all ease-out;
	}
</style>
