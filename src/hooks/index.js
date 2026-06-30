import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useIndexMutation = () => {
  return useMutation({
    mutationKey: ["index"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(`${API.index}`, payload);
      return data;
    },
  });
};

export const useIndexQuery = (payload) => {
  return useQuery({
    queryKey: ["index", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(`${API.index}`, payload);
      return data;
    },
  });
};
