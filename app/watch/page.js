import {
  getAnimeInfo,
  getEpisodeSource,
  getEpisodeSources,
} from "../utils/api";
import Link from "next/link";
import { Navbar } from "../components/navbar";
import VideoPlayer from "../components/videoPlayer";
import { ErrorPage } from "../components/errorPage";
import { Description } from "../components/description";
import { Suspense } from "react";
import Loading from "./loading";

async function watch(props) {
  const query = props.searchParams.query;
  const number = props.searchParams.number;
  const dub = props.searchParams.dub;
  const animeInfo = await getAnimeInfo(props.searchParams.id);
  const episodeList = await getEpisodeSources(props.searchParams.id, dub);
  if (animeInfo === -1 || episodeList === -1) {
    return <ErrorPage />;
  }

  const episodeSource = await getEpisodeSource(episodeList[number - 1]?.id);

  if (episodeSource === -1) {
    return (
      <div className="bg-[#242428]">
        <Navbar search={query} />
        <div className="bg-[#242428] flex flex-col gap-10 py-12 px-10">
          <h1 className="text-lg">Could not find any episode sources</h1>
        </div>
      </div>
    );
  }

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
          <Description
            description={animeInfo.description}
            style={"mt-2 text-sm text-white"}
          />
        </div>
      </div>
    );
  }

  function getEpisodeList() {
    let list = [];
    let style;
    for (var i = 0; i < episodeList.length; i++) {
      if (episodeList[i].number.toString() === props.searchParams.number) {
        style = "w-full border-b-2 border-b-[#333] bg-[#333] px-8 py-5";
      } else {
        style = "w-full border-b-2 border-b-[#333] px-8 py-5";
      }

      list.push(
        <Link
          href={{
            pathname: "/watch",
            query: {
              id: props.searchParams.id,
              number: episodeList[i].number,
            },
          }}
          key={i}
        >
          <div className={style}>
            <p className="text-white">
              {episodeList[i].number}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className="text-sm text-white">{episodeList[i].title}</span>
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
              number: 1
            },
          }}
          key={i}
          className="w-28 md:hover:scale-125 md:hover:z-10 transform transition duration-200"
        >
          <div className="h-36">
            <img
              className="w-full h-full object-cover	"
              src={relations[i].image}
              alt="Info card image"
            />
          </div>
          <h2 className="text-sm leading-tight text-white mt-2.5 line-clamp-2">
            {relations[i].title.userPreferred
              ? relations[i].title.userPreferred
              : relations[i].title.english}
          </h2>
        </Link>
      );
    }
    return list;
  }

  function subOrDub() {
    let subStyle =
      "border-2 border-white py-2 px-4 text-white font-bold uppercase text-xs rounded";
    let dubStyle =
      "border-2 border-white py-2 px-4 text-white font-bold uppercase text-xs rounded";

    if (dub === "true") {
      dubStyle =
        "bg-[#58A557] py-2 px-4 text-white font-bold uppercase text-xs rounded";
    } else {
      subStyle =
        "bg-[#58A557] py-2 px-4 text-white font-bold uppercase text-xs rounded";
    }

    return (
      <div className="px-8 flex flex-row gap-5">
        <Link
          href={{
            pathname: "/watch",
            query: {
              id: props.searchParams.id,
              number: props.searchParams.number,
              dub: false,
            },
          }}
        >
          <p className={subStyle}>Sub</p>
        </Link>

        <Link
          href={{
            pathname: "/watch",
            query: {
              id: props.searchParams.id,
              number: props.searchParams.number,
              dub: true,
            },
          }}
        >
          <p className={dubStyle}>Dub</p>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#242428] pb-5">
      <Navbar search={query} />
      <div className="flex flex-col gap-5 justify-items-center 2xl:px-96">
        <Suspense fallback={<Loading />}>
          <VideoPlayer
            url={episodeSource}
            title={episodeList[number - 1].title}
            id={props.searchParams.id}
            number={props.searchParams.number}
          />
        </Suspense>
        {getAnimInfoData()}
        {subOrDub()}
        <h2 className="px-8 pb-3 text-xl font-bold text-white">episodes</h2>
        <ul className="h-96 overflow-y-auto">{getEpisodeList()}</ul>
        <div>
          <h2 className="px-8 pb-3 text-xl font-bold text-white">
            Related anime
          </h2>
          <div className="grid gap-y-10 justify-items-center grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {getRelations()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default watch;
