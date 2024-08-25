import spotifyClient from "../plugins/spotify";

class SearchService {
  async getAll(query) {
    const { data } = await spotifyClient.get("/search", {
      params: {
        q: query,
        limit: 6,
        type: [
          "album",
          "artist",
          "playlist",
          "track",
          "show",
          "episode",
          // "audiobook",
        ].join(","),
        market: "BR",
      },
    });

    return data;
  }

  async getAlbums(query, offset = 0) {
    const { data } = await spotifyClient.get("/search", {
      params: {
        q: query,
        offset: offset,
        type: "album",
        market: "BR",
      },
    });

    return data;
  }

  async getArtists(query, offset = 0) {
    const { data } = await spotifyClient.get("/search", {
      params: {
        q: query,
        offset: offset,
        type: "artist",
        market: "BR",
      },
    });

    return data;
  }

  async getSongs(query, offset = 0) {
    const { data } = await spotifyClient.get("/search", {
      params: {
        q: query,
        offset: offset,
        type: "track",
        market: "BR",
      },
    });

    return data;
  }

  async getPlaylists(query, offset = 0) {
    const { data } = await spotifyClient.get("/search", {
      params: {
        q: query,
        offset: offset,
        type: "playlist",
        market: "BR",
      },
    });

    return data;
  }

  async getShows(query, offset = 0) {
    const { data } = await spotifyClient.get("/search", {
      params: {
        q: query,
        offset: offset,
        type: ["show", "episode"].join(","),
        market: "BR",
      },
    });

    return data;
  }
}

export default new SearchService();
