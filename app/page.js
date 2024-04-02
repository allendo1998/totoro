import { getSpotlight, getTrendingAnime } from "./utils/api";
import { Navbar } from "./components/navbar";
import { AnimeCard } from "./components/animeCard";
import { SpotlighCard } from "./components/spotLightCard";
import { ErrorPage } from "./components/errorPage";

export default async function Home(props) {
  let search = props.searchParams.query;

  const data = await getTrendingAnime();
  const spotLightData = await getSpotlight();

  if (data === -1 || spotLightData === -1) {
    return <ErrorPage/>
  }

  function getSpotlightData() {
    return (
      <SpotlighCard props={spotLightData}/>
    );
  }

  function getTrendingAnimeList() {
    let list = [];
    for (var i = 0; i < data.results.length; i++) {
      list.push(
        <AnimeCard key={i} props={data.results[i]}/>
      );
    }
    return list;
  }

  return (
    <div className="bg-[#242428]">
      <Navbar search={search} />
        {getSpotlightData()}
        <div className="py-12 px-10">
          <h1 className="mb-5 text-2xl font-bold text-white">Top airing</h1>
          <div className="grid gap-y-10 justify-items-center grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10">
            {getTrendingAnimeList()}
          </div>
        </div>
    </div>
  );
}
