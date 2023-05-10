<script setup></script>
<template>
	<div class="loader-container">
		<figure class="loader">
			<img src="@/assets/images/loader.svg" alt="" />
		</figure>
		<h2>Loading...</h2>
	</div>
</template>

<style lang="scss" scoped>
	.loader-container {
		position: absolute;
		top: 50%;
		left: 50%;

		transform: translateX(-50%) translateY(-50%);
		text-align: center;
	}

	.loader {
		width: 100px;
		aspect-ratio: 1;
		margin-bottom: 2rem;
	}

	.loader > img {
		width: 100%;
		animation: rotate 2.5s infinite linear reverse;
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
