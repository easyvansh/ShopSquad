import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://shop-squad-api.onrender.com/";

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getBanners:builder.query({
      query: () => "products/banners",
    }),
    getProducts: builder.query({
      query: () => "products",
    }),
    getProduct: builder.query({
      query: (id) => `products/${id}`,
    }),
    createOrder: builder.mutation({
      query: (newOrder) => ({
        url: "orders",
        method: "POST",
        body: newOrder,
      }),
    }),
    getOrder: builder.query({
      query: (ref) => `orders/${ref}`,
    }),
    // Payments
    createPaymentIntent: builder.mutation({
      query: (data) => ({
      url: 'payments/intent',
      method: 'POST',
      body: data,
  }),
}),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetBannersQuery,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateOrderMutation,
  useGetOrderQuery,
  useCreatePaymentIntentMutation,
} = apiSlice;
