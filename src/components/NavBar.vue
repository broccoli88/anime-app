<script setup>
	const props = defineProps({
		title: String,
	});
	const emit = defineEmits(["update:title", "search"]);

	const updateTitle = (e) => {
		emit("update:title", e.target.value);
	};

	const emitSearch = () => {
		emit("search");
	};
</script>

<template>
	<nav class="nav">
		<h2>AnimeList</h2>
		<section class="nav__search">
			<form class="nav-search__input-form" @submit.prevent="emitSearch">
				<input
					type="text"
					placeholder="Search..."
					class="nav-search__input"
					:value="title"
					@input="updateTitle"
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
		// background-color: $base-bg-light;

		.nav__search {
			flex: 1;
			.nav-search__input-form {
				width: fit-content;
				margin-left: auto;
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
