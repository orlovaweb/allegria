import httpService from "./http.service";
const sizesClothEndpoint = "sizesCloth/";

const sizesClothService = {
  get: async () => {
    const { data } = await httpService.get(sizesClothEndpoint);
    return data;
  }
};
export default sizesClothService;
