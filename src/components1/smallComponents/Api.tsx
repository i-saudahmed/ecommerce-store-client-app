import axios from "axios";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  brand: string;
  category: string;
  stock: number;
  rating: number;
  quantity?: number;
}

export const getProducts = async (
  page: number = 1
): Promise<{ products: Product[]; total: number }> => {
  try {
    const limit = 9; // item per page show
    const skip = (page - 1) * limit;
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const productData = response.data.products;
    const total = response.data.total;
    console.log(productData);
    return { products: productData, total: total };
  } catch (error) {
    console.log(error);
    return { products: [], total: 0 };
  }
};

export const getProductById = async (id: string | number) => {
  try {
    const response = await axios.get<{ data: Product }>(
      `http://localhost:8000/products/${id}`
    );
    console.log("Product data:", response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
