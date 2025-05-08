import { useQuery } from "@tanstack/react-query";

import { BaseQueryKeys } from "@/lib/api/queryKeys";

export const useUserStats = () => {
  return useQuery({
    queryKey: [BaseQueryKeys.USER_STATS],
    queryFn: async () => {
      const res = await fetch("/api/habits/stats");
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    },
  });
};
