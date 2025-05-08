import { useQuery } from "@tanstack/react-query";

import { BaseQueryKeys } from "@/lib/api/queryKeys";

export const useUserCompletions = (habitId: string | null) => {
  return useQuery({
    queryKey: [BaseQueryKeys.COMPLETIONS, habitId],
    queryFn: async () => {
      const response = await fetch(`/api/habits/${habitId}/completions`);
      if (!response.ok) {
        throw new Error("Failed to fetch user completions");
      }
      return response.json();
    },
    enabled: !!habitId,
  });
};
