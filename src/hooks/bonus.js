import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";

export const useBonusQuery = (payload) => {
  return useQuery({
    queryKey: ["bonus", payload],
    queryFn: async () => {
      const { data } = await AxiosSecure.post(API.bonus, payload);
      if (data?.success) {
        return data?.result;
      }
    },
  });
};
export const useBonusMutation = () => {
  return useMutation({
    mutationKey: ["bonus-mutation"],
    mutationFn: async (payload) => {
      const { data } = await AxiosSecure.post(API.bonus, payload);
      return data;
    },
  });
};
