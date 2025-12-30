import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl, type ResourceInput } from "@shared/routes";

export function useResources(filters?: { type?: "study_material" | "question_paper" | "video", year?: number, classLevel?: string }) {
  // Build query string for filters
  const queryString = filters 
    ? "?" + new URLSearchParams(
        Object.entries(filters).reduce((acc, [k, v]) => 
          v ? { ...acc, [k]: String(v) } : acc, {}
        )
      ).toString()
    : "";

  const queryKey = [api.resources.list.path, filters];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await fetch(api.resources.list.path + queryString);
      if (!res.ok) throw new Error("Failed to fetch resources");
      return api.resources.list.responses[200].parse(await res.json());
    },
  });
}

export function useCreateResource() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: ResourceInput) => {
      const validated = api.resources.create.input.parse(data);
      const res = await fetch(api.resources.create.path, {
        method: api.resources.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.resources.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to create resource");
      }
      
      return api.resources.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.resources.list.path] });
    },
  });
}

export function useDeleteResource() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.resources.delete.path, { id });
      const res = await fetch(url, {
        method: api.resources.delete.method,
      });
      
      if (!res.ok) throw new Error("Failed to delete resource");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.resources.list.path] });
    },
  });
}
