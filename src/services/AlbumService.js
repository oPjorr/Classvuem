import spotifyClient from "../plugins/spotify";

class AlbumService {
  async get(albumId) {
    const { data } = await spotifyClient.get(`/albums/${albumId}`, {
      params: {
        market: "BR",
      },
    });

    return data;
  }
}

export default new AlbumService();
