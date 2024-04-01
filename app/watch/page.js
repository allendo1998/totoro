import { getAnimeInfo, getEpisodeSource, getEpisodeSources } from "../utils/api";
import Link from "next/link";
import { Navbar } from "../components/navbar";
import VideoPlayer from "../components/videoPlayer";


async function watch(props) {
  const query = props.searchParams.query;
  const number = props.searchParams.number;
  const animeInfo = await getAnimeInfo(props.searchParams.id);
  const episodeList = await getEpisodeSources(props.searchParams.id);
  const episodeSource = await getEpisodeSource(episodeList[number - 1].id);
 
  function getAnimInfoData() {
    return (
      <div>
        <div className="md:shrink-0">
          <img className="h-48 w-full object-cover" src={animeInfo.cover} />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
            {animeInfo.title.userPreferred
              ? animeInfo.title.userPreferred
              : animeInfo.title.english}
          </div>
          <p className="mt-2 text-slate-500">
            {animeInfo.type} &#183; {animeInfo.status}
          </p>
        </div>
      </div>
    );
  }

  function getEpisodeList() {
    let list = [];
    let style;
    for (var i = 0; i < episodeList.length; i++) {
      if (episodeList[i].number.toString() === props.searchParams.number) {
        style = "w-full border-b-2 border-b-[#333] bg-[#333] px-8 py-5"
      } else {
        style = "w-full border-b-2 border-b-[#333] px-8 py-5";
      }

      list.push(
        <Link
          href={{
            pathname: "/watch",
            query: {
              id: props.searchParams.id,
              number: episodeList[i].number
            },
          }}
          key={i}
        >
          <div className={style}>
          <p>
            {episodeList[i].number}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {episodeList[i].title}
          </p>
          </div>
        </Link>
      );
    }

    return list;
  }

  function getRelations() {
    let relations = animeInfo.relations;
    let list = [];

    for (var i = 0; i < relations.length; i++) {
      list.push(
        <Link
          href={{
            pathname: "/watch",
            query: {
              id: relations[i].id,
            },
          }}
          key={i}
          className="w-28 md:hover:scale-150 md:hover:z-10 transform transition duration-200"
        >
          <div className="h-36">
            <img
              className="rounded-md w-full h-full object-cover	"
              src={relations[i].image}
              alt="Info card image"
            />
          </div>
          <h2 className="text-sm leading-tight text-[#73787B] mt-2.5 line-clamp-2">
            {relations[i].title.userPreferred
              ? relations[i].title.userPreferred
              : relations[i].title.english}
          </h2>
        </Link>
      );
    }
    return list;
  }

  return (
    <div className="bg-[#242428] pb-5">
      <Navbar search={query}/>
      <div className="flex flex-col gap-5 justify-items-center 2xl:px-96">
        <VideoPlayer url={episodeSource}/>
        {getAnimInfoData()}
        <h2 className="px-8 pb-3 text-xl font-bold">episodes</h2>
        <ul className="h-96 overflow-y-auto">{getEpisodeList()}</ul>
        <div>
          <h2 className="px-8 pb-3 text-xl font-bold">Related anime</h2>
          <div className="grid gap-y-10 justify-items-center grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {getRelations()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default watch;
