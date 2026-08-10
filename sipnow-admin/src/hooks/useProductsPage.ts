import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useProductsPage<T>(
  queryKey: string,
  page: number,
  search: string,
  perPage: number,
  categoryId?: string,
  isVerified?: boolean | null,
  promotionType?: string,
) {
  return useQuery({
    queryKey: [queryKey, page, search, categoryId, isVerified, promotionType],
    queryFn: () => {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(perPage),
      });
      if (search) params.set("q", search);
      if (categoryId) params.set("categoryId", categoryId);
      if (promotionType) params.set("promotionType", promotionType);
      // null = no filter (admin sees all); true/false = explicit filter
      if (isVerified === true) params.set("isVerified", "true");
      else if (isVerified === false) params.set("isVerified", "false");
      else params.set("isVerified", "all");
      return api.get<{ products: T[]; total: number }>(`/products?${params}`);
    },
    placeholderData: keepPreviousData,
  });
}
