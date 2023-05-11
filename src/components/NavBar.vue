<script setup>
	import { useRoute } from "vue-router";
	import { onMounted, ref, watchEffect, watch } from "vue";

	const props = defineProps({
		title: String,
	});
	const emit = defineEmits(["update:title", "search"]);
	const route = useRoute();

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
		window.addEventListener("resize", () => {
			genresList.value.style.top = nav.value.offsetHeight - 3 + "px";
		});
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

	watch(
		() => route.params,
		() => {
			isGenreListToggled.value = false;
		}
	);
</script>

<template>
	<nav class="nav" ref="nav">
		<h2>AnimeList</h2>
		<article class="nav__navigation">
			<router-link to="/" class="navigation__link">Home</router-link>
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
			<router-link class="navigation__link" to="/saved-anime-list"
				>Saved Anime</router-link
			>
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
				<button class="nav-search__btn">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="26"
						height="26"
						viewBox="0 0 24 24"
					>
						<path
							fill="var(--base-font)"
							d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14z"
						/>
					</svg>
				</button>
			</form>
		</section>
	</nav>
</template>

<style lang="scss" scoped>
	.nav {
		@include grid {
			padding: $padding-md $padding-md;
			box-shadow: $box-shadow-dark-15;
			position: relative;
		}

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
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			order: 3;

			gap: $gap-lg;

			@include breakpoint(853px) {
				order: initial;
			}

			& > * {
				padding-inline: $padding-sm;
			}

			.navigation__link {
				&:hover {
					color: $color-primary-light;
				}
			}
			.genres {
				div {
					display: flex;
					align-items: center;
					gap: 0.6rem;
					cursor: pointer;

					.genres__heading,
					.arrow,
					.arrow path {
						transition: all 0.4s ease;
					}

					&:hover .genres__heading {
						color: $color-primary-light;
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
						auto-fit,
						minmax(min(100px, 100%), 1fr)
					);
					gap: $gap-md;

					padding: 0 $padding-lg;
					background-color: $base-bg;
					box-shadow: 0 11px 10px hsl(0, 0%, 0%, 0.2);
					transition: all 0.4s ease;

					@include tablet {
						grid-template-columns: repeat(
							5,
							minmax(min(100px, 100%), 1fr)
						);
					}
				}
			}
		}
		.nav__search {
			width: min(400px, 100%);

			.nav-search__input-form {
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
					display: grid;
				}
			}
		}
	}
</style>
