import spotifyClient from "../plugins/spotify";

class ArtistService {
  async get(artistId) {
    const { data } = await spotifyClient.get(`/artists/${artistId}`);

    return data;
  }

  async getAlbums(artistId, offset = 0) {
    const { data } = await spotifyClient.get(`/artists/${artistId}/albums`, {
      params: {
        q: query,
        offset: offset,
        include_groups: ["album", "single", "appears_on", "compilation"].join(
          ","
        ),
        market: "BR",
      },
    });

    return data;
  }

  async getTopTracks(artistId) {
    const { data } = await spotifyClient.get(
      `/artists/${artistId}/top-tracks`,
      {
        params: {
          market: "BR",
        },
      }
    );

    return data;
  }

  async getRelatedArtists(artistId) {
    const { data } = await spotifyClient.get(
      `/artists/${artistId}/related-artists`
    );

    return data;
  }
}

export default new ArtistService();
