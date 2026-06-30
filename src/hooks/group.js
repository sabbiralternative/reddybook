import { useQuery } from "@tanstack/react-query";
import { API } from "../api";
import { AxiosSecure } from "../lib/AxiosSecure";
import handleDecryptData from "../utils/handleDecryptData";

export const useGroupQuery = (payload) => {
  const { data = {}, ...rest } = useQuery({
    queryKey: ["group", payload],
    queryFn: async () => {
      if (payload.sportsType === 0) {
        const sportsType = [1, 2, 4];

        const groupData = await Promise.all(
          sportsType.map(async (type) => {
            const { data } = await AxiosSecure.get(
              `${API.groupSportsBook}/${type}`,
              {
                headers: {
                  "Cache-Control": "public",
                  "max-age": 1,
                },
              },
            );

            if (data?.ct) {
              return handleDecryptData(JSON.stringify(data));
            } else {
              return data;
            }
          }),
        );
        const groupDataObj = {
          ...groupData[0],
          ...groupData[1],
          ...groupData[2],
        };
        return groupDataObj;
      } else {
        const { data } = await AxiosSecure.get(
          `${API.groupSportsBook}/${payload.sportsType}`,
          {
            headers: {
              "Cache-Control": "public",
              "max-age": 1,
            },
          },
        );

        if (data?.ct) {
          return handleDecryptData(JSON.stringify(data));
        } else {
          return data;
        }
      }
    },
    refetchInterval: 1000,
  });

  return { data, ...rest };
};
