import axios, { AxiosError } from "axios";
import { create } from "zustand";
import { Product } from "./LocalStore";

export interface ApiState {
  data: Product[];
  loading: boolean;
  hasUpdated: boolean;
  error: string | null;
  search: string;
  category: string;
  sortBy: string;
  page: number;
  hasMore: boolean;
  isLoggedIn: boolean;
  result: Product[];
  setHasUpdated: (hasUpdated: boolean) => void;
  fetchData: (url: string) => Promise<void>;
  setSearch: (search: string) => void;
  setCategory: (category: string) => void;
  setSortBy: (sortBy: string) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  loadMoreData: () => void;
  setData: (data: Product[] | ((prevData: Product[]) => Product[])) => void;
  setResult: (result: Product[]) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const ITEMS_PER_PAGE = 9;

const useApiStore = create<ApiState>((set, get) => ({
  // Initial state
  data: [],
  search: "",
  category: "all",
  sortBy: "price",
  page: 1,
  loading: false,
  error: null,
  hasMore: true,
  hasUpdated: true,
  result: [],
  isLoggedIn: false,

  // State setters
  setHasUpdated: (hasUpdated) => set({ hasUpdated }),
  setResult: (result) => set({ result }),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  setData: (newData) =>
    set((state) => ({
      data: typeof newData === "function" ? newData(state.data) : newData,
    })),

  // Data fetching actions
  setCategory: (category) => {
    set({ category, page: 1, data: [], hasMore: true });
    const { sortBy, search } = get();
    get().fetchData(buildUrl({ category, sortBy, search, page: 1 }));
  },

  setSortBy: (sortBy) => {
    set({ sortBy, page: 1, data: [], hasMore: true });
    const { category, search } = get();
    get().fetchData(buildUrl({ category, sortBy, search, page: 1 }));
  },

  setSearch: (query) => {
    set({ search: query, page: 1, data: [], hasMore: true });
    const { category, sortBy } = get();
    get().fetchData(buildUrl({ category, sortBy, search: query, page: 1 }));
  },

  loadMoreData: () => {
    const { hasMore, loading, page, search, category, sortBy } = get();
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    set({ page: nextPage });
    get().fetchData(buildUrl({ category, sortBy, search, page: nextPage }));
  },

  fetchData: async (url) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<{ products: Product[] }>(url);
      const newData = response.data.products;

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const productsWithQuantity = newData.map((product) => ({
        ...product,
        quantity:
          cart.find((item: Product) => item._id === product._id)?.quantity || 0,
      }));

      set((state) => ({
        data:
          state.page === 1
            ? productsWithQuantity
            : [...state.data, ...productsWithQuantity],
        hasMore: newData.length > 0,
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({ error: axiosError.message, loading: false, hasMore: false });
    }
  },
}));

const buildUrl = ({
  category,
  sortBy,
  search,
  page,
}: {
  category: string;
  sortBy: string;
  search: string;
  page: number;
}) => {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const baseUrl = "http://localhost:8000/products";

  if (category === "all") {
    return `${baseUrl}/search?q=${search}&limit=${ITEMS_PER_PAGE}&skip=${skip}&sortBy=${sortBy}`;
  }

  return `${baseUrl}/category/${category}?limit=${ITEMS_PER_PAGE}&skip=${skip}&sortBy=${sortBy}${
    search ? `&q=${search}` : ""
  }`;
};

export default useApiStore;
