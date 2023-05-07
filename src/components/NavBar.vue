<script setup>
	import { onMounted, ref, watchEffect } from "vue";

	const props = defineProps({
		title: String,
	});
	const emit = defineEmits(["update:title", "search"]);

	const updateTitle = (e) => {
		if (!e.target.value) return;
		emit("update:title", e.target.value);
		e.target.value = "";
	};

	const emitSearch = () => {
		emit("search");
	};

	// Genre list toggle
	const genres = ref([
		"Award Winning",
		"Action",
		"Suspense",
		"Horror",
		"Ecchi",
		"Avant Garde",
		"Sports",
		"Supernatural",
		"Fantasy",
		"Gourmet",
		"Boys Love",
		"Drama",
		"Comedy",
		"Mystery",
		"Girls Love",
		"Slice of Life",
		"Adventure",
		"Romance",
		"Sci-Fi",
		"Erotica",
		"Hentai",
	]);
	const genresList = ref();
	const nav = ref();
	const isGenreListToggled = ref(false);

	const toggleGenreList = () => {
		isGenreListToggled.value = !isGenreListToggled.value;
	};

	onMounted(() => {
		genresList.value.style.top = nav.value.offsetHeight - 3 + "px";
	});

	watchEffect(() => {
		if (isGenreListToggled.value && genresList.value) {
			nav.value.classList.add("unwrapped");
		}

		if (!isGenreListToggled.value && genresList.value) {
			nav.value.classList.remove("unwrapped");
		}
		if (!genresList.value) return;
	});
</script>

<template>
	<nav class="nav" ref="nav">
		<h2>AnimeList</h2>
		<article class="nav__navigation">
			<router-link to="/" class="home">Home</router-link>
			<section class="genres">
				<div @click="toggleGenreList">
					<p class="genres__heading">Genres</p>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						class="arrow"
					>
						<path
							fill="var(--base-font)"
							d="m12 16l4-4l-1.4-1.4l-1.6 1.6V8h-2v4.2l-1.6-1.6L8 12l4 4Zm0 6q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"
						/>
					</svg>
				</div>
				<ul class="genres__list" ref="genresList">
					<li
						class="genres__item"
						v-for="genre in genres"
						:key="genre"
					>
						<router-link
							:to="`/genres/${genre}`"
							class="genres__link"
							>{{ genre }}</router-link
						>
					</li>
				</ul>
			</section>
		</article>
		<section class="nav__search">
			<form class="nav-search__input-form" @submit.prevent="emitSearch">
				<input
					type="text"
					placeholder="Search..."
					class="nav-search__input"
					:value="title"
					@input.trim="updateTitle"
				/>
				<button class="nav-search__btn">Search</button>
			</form>
		</section>
	</nav>
</template>

<style lang="scss" scoped>
	.nav {
		@include flex-space-between;
		padding: $padding-md $padding-md;
		box-shadow: $box-shadow-dark-15;
		position: relative;

		&.unwrapped {
			box-shadow: none;

			.nav__navigation .genres .genres__list {
				max-height: 100vh;
				padding-block: $padding-lg;
			}

			.genres__heading {
				color: $color-primary-light;
				font-weight: bold;
			}

			.arrow {
				transform: rotate(-180deg);

				path {
					fill: $color-primary-light;
				}
			}
		}

		.nav__navigation {
			display: grid;
			grid-auto-flow: column;

			gap: $gap-lg;

			& > * {
				font-size: 1.8rem;
				padding-inline: $padding-sm;
			}
			.genres {
				div {
					display: flex;
					gap: 0.6rem;
					cursor: pointer;

					.genres__heading,
					.arrow,
					.arrow path {
						transition: all 0.4s ease;
					}

					&:hover .genres__heading {
						color: $color-primary-light;
						font-weight: bold;
					}

					&:hover .arrow path {
						fill: $color-primary-light;
					}
				}

				.genres__list {
					position: absolute;
					left: 0;
					width: 100%;
					z-index: 1;

					max-height: 0;
					overflow: hidden;

					display: grid;
					grid-template-columns: repeat(
						5,
						minmax(min(100px, 100%), 1fr)
					);
					gap: $gap-sm;

					padding: 0 $padding-lg;
					background-color: $base-bg;
					// box-shadow: $box-shadow-dark-15;
					box-shadow: inset 0 -6px 5px hsl(0, 0%, 0%, 0.2);
					transition: all 0.4s ease;
				}
			}
		}
		.nav__search {
			.nav-search__input-form {
				width: fit-content;
				display: flex;
				box-shadow: $box-shadow-5;
				border-radius: $border-radius-sm;

				&:has(:first-child:focus) {
					outline: $base-outline;
				}

				.nav-search__input {
					@include input;
					border-radius: $border-radius-sm 0 0 $border-radius-sm;
				}

				.nav-search__btn {
					@include btn;
					border-radius: 0 $border-radius-sm $border-radius-sm 0;
				}
			}
		}
	}
</style>
