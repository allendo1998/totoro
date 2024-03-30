import { getSpotlight, getTrendingAnime } from "./utils/api";
import { Navbar } from "./components/navbar";
import Link from "next/link";

export default async function Home(props) {
  let search = props.searchParams.query;

  const data = await getTrendingAnime();
  const spotLightData = await getSpotlight();

  if (data === -1) {
    return <h1>Something went wrong.</h1>;
  }

  function getSpotlightData() {
    const title = spotLightData.title.userPreferred
      ? spotLightData.title.userPreferred
      : spotLightData.title.english;
    return (
      <div
        className="bg-cover bg-center h-auto text-white py-24 px-10 object-fill"
        style={{ backgroundImage: `url(${spotLightData.cover})` }}
      >
        <div className="md:w-1/2">
          <p className="text-3xl font-bold mb-8">{title}</p>
          <p className="font-bold text-sm mb-8 line-clamp-4">
            {spotLightData.description}
          </p>
          <a
            href="#"
            className={
              "bg-[#58A557] py-4 px-8 text-white font-bold uppercase text-xs rounded hover:bg-gray-200 hover:text-gray-800"
            }
          >
            Watch
          </a>
        </div>
      </div>
    );
  }

  function getTrendingAnimeList() {
    let list = [];
    for (var i = 0; i < data.results.length; i++) {
      list.push(
        <Link
          href={{
            pathname: '/watch',
            query: {
              malId: data.results[i].malId,
              id: data.results[i].id,
              number: 1
            }
          }}
          key={data.results[i].id}
          className="w-28 md:w-44 xl:w-36 md:hover:scale-150 md:hover:z-10 transform transition duration-200"
        >
          <div className="h-36 md:h-64 xl:h-52">
            <img
              className="rounded-md w-full h-full object-cover	"
              src={data.results[i].image}
              alt="Info card image"
            />
          </div>
          <h2 className="text-sm leading-tight text-[#73787B] mt-2.5 truncate ...">
            {data.results[i].title.userPreferred}
          </h2>
        </Link>
      );
    }
    return list;
  }

  return (
    <div className="bg-[#242428]">
      <Navbar search={search} />
      {getSpotlightData()}
      <div className="py-12 px-10">
        <h1 className="mb-5 text-2xl font-bold">Top airing</h1>
        <div className="grid gap-y-10 justify-items-center grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-8 2xl:grid-cols-10">
          {getTrendingAnimeList()}
        </div>
      </div>
    </div>
  );
}
