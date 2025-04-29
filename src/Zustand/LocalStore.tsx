import axios, { AxiosError } from "axios";
import { create } from "zustand";

export interface Product {
  _id: string;
  title: string;
  name: string;
  description: string;
  category: string;
  price: number;
  discounted_price: number;
  rating: number;
  stock: string;
  thumbnail: string;
  quantity: number;
  images?: string[];
  brand: string;
}

interface ApiResponse {
  data: Product[];
  pagination: {
    hasMore: boolean;
  };
}

interface SectionData {
  data: Product[];
  loading: boolean;
  error: string | null;
}

interface FetchParams {
  category: string;
  limit?: number;
  sortBy?: string;
  page?: number;
  search?: string;
}

export interface ApiStateLocal {
  data: Product[];
  loading: boolean;
  hasUpdated: boolean;
  search: string;
  category: string;
  sortBy: string;
  page: number;
  error: string | null;
  hasMore: boolean;
  isLoggedIn: boolean;
  result: Product[];
  loadMoreData: () => void;
  setHasUpdated: (hasUpdated: boolean) => void;
  setCategory: (category: string) => void;
  setSortBy: (sortBy: string) => void;
  fetchData: (url: string) => Promise<void>;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  setHasMore: (hasMore: boolean) => void;
  setData: (data: Product[] | ((prevData: Product[]) => Product[])) => void;
  setResult: (result: Product[]) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  sectionData: {
    [key: string]: {
      data: Product[];
      loading: boolean;
      error: string | null;
    }
  };
  fetchSectionData: (sectionId: string, params: FetchParams) => Promise<void>;
  fetchProducts: (params: {
    category: string;
    limit?: number;
    sortBy?: string;
  }) => Promise<Product[]>;
}

const ITEMS_PER_PAGE = 9;

const useLocalApiStore = create<ApiStateLocal>((set, get) => ({
  data: [],
  search: "",
  page: 0,
  loading: false,
  error: null,
  hasMore: true,
  hasUpdated: true,
  category: "all",
  sortBy: "price",
  result: [],
  isLoggedIn: false,
  sectionData: {},

  setHasUpdated: (hasUpdated) => set({ hasUpdated }),
  setResult: (result) => set({ result }),
  setPage: (page) => set({ page }),
  setHasMore: (hasMore) => set({ hasMore }),
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),

  setData: (newData) =>
    set((state) => ({
      data: typeof newData === "function" ? newData(state.data) : newData,
    })),

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

  setSearch: (query: string) => {
    set({ search: query, page: 1, data: [], hasMore: true });
    const { category, sortBy } = get();
    get().fetchData(buildUrl({ category, sortBy, search: query, page: 1 }));
  },

  loadMoreData: () => {
    const { hasMore, loading, category, sortBy, page, search } = get();
    if (!hasMore || loading) return;

    const nextPage = page + 1;
    set({ page: nextPage });
    get().fetchData(buildUrl({ category, sortBy, search, page: nextPage }));
  },

  fetchData: async (url) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<ApiResponse>(url);
      const newData = response.data.data;

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
        hasMore: response.data.pagination.hasMore,
        loading: false,
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set({ error: axiosError.message, loading: false, hasMore: false });
    }
  },

  fetchSectionData: async (sectionId: string, params: FetchParams) => {
    const { category, limit = 6, sortBy = 'title', page = 1, search = '' } = params;
    const skip = (page - 1) * limit;

    set((state) => ({
      sectionData: {
        ...state.sectionData,
        [sectionId]: {
          ...state.sectionData[sectionId],
          loading: true,
          error: null
        }
      }
    }));

    try {
      const url = `http://localhost:8000/products/search?q=${search}&page=${page}&skip=${skip}&limit=${limit}&sortBy=${sortBy}&category=${category}`;
      const response = await axios.get<ApiResponse>(url);
      const newData = response.data.data;

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const productsWithQuantity = newData.map((product) => ({
        ...product,
        quantity: cart.find((item: Product) => item._id === product._id)?.quantity || 0,
      }));

      set((state) => ({
        sectionData: {
          ...state.sectionData,
          [sectionId]: {
            data: productsWithQuantity,
            loading: false,
            error: null
          }
        }
      }));
    } catch (error) {
      const axiosError = error as AxiosError;
      set((state) => ({
        sectionData: {
          ...state.sectionData,
          [sectionId]: {
            ...state.sectionData[sectionId],
            loading: false,
            error: axiosError.message
          }
        }
      }));
    }
  },

  fetchProducts: async ({ category, limit = 6, sortBy = 'title' }) => {
    try {
      const url = `http://localhost:8000/products/search?q=&page=1&skip=0&limit=${limit}&sortBy=${sortBy}&category=${category}`;
      const response = await axios.get<ApiResponse>(url);
      const products = response.data.data;

      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      return products.map((product) => ({
        ...product,
        quantity: cart.find((item: Product) => item._id === product._id)?.quantity || 0,
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  },
}));

const buildUrl = ({
  search = "",
  page = 1,
  sortBy = "price",
  category = "all",
}: {
  search: string;
  page: number;
  sortBy: string;
  category: string;
}) => {
  const skip = (page - 1) * ITEMS_PER_PAGE;
  const baseUrl = "http://localhost:8000/products";
  return `${baseUrl}/search?q=${search}&page=${page}&skip=${skip}&limit=${ITEMS_PER_PAGE}&sortBy=${sortBy}&category=${category}`;
};

export default useLocalApiStore;
