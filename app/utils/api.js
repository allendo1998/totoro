import { META } from "@consumet/extensions";

const anilist = new META.Anilist();
const url = "https://consumet-api-nine-dun.vercel.app/";

export async function getTrendingAnime() {
  try {
      const data = await anilist.fetchTrendingAnime();
      return data;
  } catch (e) {
      console.log('Message ' + e.message);
      return -1;
  }
}

export async function getSpotlight() {
  const secondPage = 2;
  try {
    const data = await anilist.fetchTrendingAnime(secondPage);

    // get this first anime that has a banner image, because some doesn't have a banner image
    if (data.results?.length !== 0) {
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].cover.includes("banner")) {
          return data.results[i];
        }
      }
    }
    return -1;
  } catch (e) {
    console.log("Message " + e.message);
    return -1;
  }
}

export async function searchAnime(query, page) {
  try {
    const data = await anilist.search(query, page);

    if (data.results?.length === 0) {
      return 0;
    }
    return data;
  } catch (e) {
    console.log("Message " + e.message);
    return -1;
  }
}

export async function getAnimeInfo(id) {
  try {
    const res = await anilist.fetchAnilistInfoById(id);
    return res;
  } catch (e) {
    return -1;
  }
}

export async function getEpisodeSource(id) {
  let backUp;
  let bestQuality;
  try {
    const res = await anilist.fetchEpisodeSources(id);

    if (res.sources) {
      for (var i = res.sources.length - 1; i > 0; i--) {
        if (res.sources[i].quality === "backup") {
          backUp = res.sources[i].url;
        } else if (res.sources[i].quality === "1080p") {
          bestQuality = res.sources[i].url;
          break;
        } else if (res.sources[i].quality === "720p") {
          bestQuality = res.sources[i].url;
          break;
        }
      }
    }
    if (bestQuality) {
      console.log('hls link ' + bestQuality);
      return bestQuality;
    }
    console.log('hls link: ' + backUp);
    return backUp;
  } catch (e) {
    return -1;
  }
}

export async function getEpisodeSources(id, dub = false) {
  console.log('id is ' + id);
  try {
    const res = await fetch(url + `meta/anilist/episodes/${id}?dub=${dub}`);
    const data = await res.json();
    return data;
  } catch(e) {
    return -1;
  }
}