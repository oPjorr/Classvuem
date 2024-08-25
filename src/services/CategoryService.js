import spotifyClient from "../plugins/spotify";

class CategoryService {
  async get() {
    const { data } = await spotifyClient.get("/browse/categories", {
      params: {
        locale: "pt_BR",
      },
    });

    return data;
  }
}

export default new CategoryService();
