import httpService from "./http.service";
const subscriptionEndpoint = "subscription/";

const subscriptionService = {
  get: async () => {
    const { data } = await httpService.get(subscriptionEndpoint);
    return data;
  },
  create: async (payload) => {
    const { data } = await httpService.put(subscriptionEndpoint + payload._id, payload);
    return data;
  }

};
export default subscriptionService;
