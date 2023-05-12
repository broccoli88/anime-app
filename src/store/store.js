import { reactive } from "vue";

const state = reactive({
	savedAnimeList: [
		{
			title: "Steins;Gate",
			genre: ["Drama", "Sci-Fi", "Suspense"],
			type: "TV",
			status: "Finished Airing",
			img: "https://cdn.myanimelist.net/images/anime/1935/127974.jpg",
			id: "9253",
		},
		{
			title: "Shingeki no Kyojin",
			genre: ["Action", "Award Winning", "Drama", "Suspense"],
			type: "TV",
			status: "Finished Airing",
			img: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
			id: "16498",
		},
		{
			title: "Yakusoku no Neverland",
			genre: ["Mystery", "Sci-Fi", "Suspense"],
			type: "TV",
			status: "Finished Airing",
			img: "https://cdn.myanimelist.net/images/anime/1830/118780.jpg",
			id: "37779",
		},
	],
});

export default state;
