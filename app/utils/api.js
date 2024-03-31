import { META } from "@consumet/extensions";
import { ANIME } from "@consumet/extensions";

const anilist = new META.Anilist();
const mal = new META.Myanimelist();
const gogoanime = new ANIME.Gogoanime();
const anify = new ANIME.Anify();

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
            for(var i = 0; i < data.results.length; i++) {
                if (data.results[i].cover.includes('banner')) {
                    return data.results[i];
                }
            }
        }
        return -1;
    } catch (e) {
        console.log('Message ' + e.message);
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
        console.log('Message ' + e.message);    
        return -1;
    }
}

export async function getEpisodes(malId, dub = false) {
    try {
        const episodeList = mal.fetchAnimeInfo(malId, dub);
        return episodeList;
    } catch (e) {
        console.log('Message ' + e.message);
        return -1;
    }

}

export async function getAnimeInfo(id) {
    try {
        const res = await anilist.fetchAnimeInfo(id);
        return res;
    } catch (e) {
        return -1;
    }
}

export async function getEpisodeSource(id) {
    let backUp;
    let bestQuality;
    try {
        const res = await mal.fetchEpisodeSources(id);

        if (res.sources) {
            for(var i = res.sources.length - 1; i > 0; i--) {
                if (res.sources[i].quality === 'backup') {
                    backUp = res.sources[i].url;
                } else if (res.sources[i].quality === '1080p') {
                    bestQuality = res.sources[i].url;
                    break;
                } else if (res.sources[i].quality === '720p') {
                    bestQuality = res.sources[i].url;
                    break;
                }
            }
        }
        if (bestQuality) {
            return bestQuality;
        }
        return backUp;
    } catch (e) {
        return -1;
    }
}

export async function getInfo(id) {
    console.log("id is : " + id);
    const hi = anify.fetchAnimeInfo(id);
    return hi;
}
