import apiClient from "../plugins/axios";

class CategoryService {
  async get() {
    const { data } = await apiClient.get("/browse/categories", {
      params: { locale: "pt_BR" },
    });

    return data;
  }
}

export default new CategoryService();
