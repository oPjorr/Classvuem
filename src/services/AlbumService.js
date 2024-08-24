import apiClient from "../plugins/axios";

class AlbumService {
  async get(albumId) {
    const { data } = await apiClient.get(`/albums/${albumId}`, {
      params: { market: "BR" },
    });

    return data;
  }
}

export default new AlbumService();
