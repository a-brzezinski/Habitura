import { Habit } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { BaseQueryKeys } from "@/lib/api/queryKeys";

export const useUserHabits = () => {
  return useQuery<Habit[]>({
    queryKey: [BaseQueryKeys.USER_HABITS],
    queryFn: async () => {
      const response = await fetch("/api/habits");
      if (!response.ok) {
        throw new Error("Failed to fetch user habits");
      }
      return response.json();
    },
  });
};
