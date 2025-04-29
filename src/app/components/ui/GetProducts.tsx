// import axios from "axios";
// import React, { useState } from "react";

// interface Product {
//   id: number;
//   title: string;
//   description: string;
//   price: number;
//   thumbnail: string;
//   rating: number;
// }

// // First, define the props interface
// interface GetProductsProps {
//   search: string;
//   data: Product[];
//   loading: boolean;
//   hasMore: boolean;
//   setLoading: (loading: boolean) => void;
//   setData: (data: Product[] | ((prevData: Product[]) => Product[])) => void;
//   setHasMore: (hasMore: boolean) => void;
// }

// const GetProducts = ({ 
//   search, 
//   data, 
//   loading, 
//   hasMore,
//   setLoading,
//   setData,
//   setHasMore 
// }: GetProductsProps) => {
//   const [page, setPage] = useState(1);
//   const getProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `https://dummyjson.com/products/search/?limit=9&skip=${
//           (page - 1) * 9
//         }&q=${search}`
//       );
//       const productData = response.data.products;

//       if (page === 1) {
//         setData(productData);
//       } else {
//         setData((prevItem: Product[]) => [...prevItem, ...productData]);
//       }

//       setPage((prevPage) => prevPage + 1);
//       setHasMore(productData.length > 0);
//     } catch (error) {
//       setHasMore(false);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return <div>GetProducts</div>;
// };

// export default GetProducts;
