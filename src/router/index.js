import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AnimeView from "../views/AnimeView.vue";
import GenreView from "../views/GenreView.vue";
import SearchView from "../views/SearchView.vue";
import SavedAnimeListView from "../views/SavedAnimeListView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/anime/:id",
			name: "anime",
			component: AnimeView,
		},
		{
			path: "/genres/:genre",
			name: "genre",
			component: GenreView,
		},
		{
			path: "/search",
			name: "search",
			component: SearchView,
		},
		{
			path: "/saved-anime-list",
			name: "saved-anime-list",
			component: SavedAnimeListView,
		},
	],
});

export default router;
