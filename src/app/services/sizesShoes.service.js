import httpService from "./http.service";
const sizesShoesEndpoint = "sizesShoes/";

const sizesShoesService = {
  get: async () => {
    const { data } = await httpService.get(sizesShoesEndpoint);
    return data;
  }
};
export default sizesShoesService;
