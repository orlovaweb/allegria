import httpService from "./http.service";
const goodEndpoint = "good/";

const goodService = {
  get: async () => {
    const { data } = await httpService.get(goodEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(goodEndpoint + payload._id, payload);
    return data;
  },
  upload: async (payload) => {
    const { data } = await httpService.patch(goodEndpoint + payload._id, payload);
    return data;
  }

};
export default goodService;