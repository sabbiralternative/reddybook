import { useQuery } from "@tanstack/react-query";
import { AxiosSecure } from "../lib/AxiosSecure";
import { API } from "../api";

export const useLiveCasinoIFrame = (payload) => {
  return useQuery({
    queryKey: ["iframe", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(
        `${API.liveCasinoIFrame}`,
        payload,
      );
      return data;
    },
  });
};
