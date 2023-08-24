import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "https://shop-squad-api.onrender.com/";


// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: "api",
  // Base Query => https://shop-squad-api.onrender.com/
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    // Get Banners of Products
    getBanners:builder.query({
      query: () => "products/banners",
    }),
    // Get All Products 
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
    // Create Cart
    createCart: builder.mutation({
      query: (newCart) => ({
        url: "cart",
        method: "POST",
        body: newCart,
      }),
    }),
    getCart: builder.query({
      query: (ref) => `cart/${ref}`,
    }),
    clearCart: builder.mutation({
      query: (cart) => ({
        url: `cart/${ref}/clear`,
        method: "DELETE",
        body: cart,
      }),
    }),
    // Create User
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "users",
        method: "POST",
        body: newUser,
      }),
    }),
    getUser: builder.query({
      query: (ref) => `users/${ref}`,
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
  // Products
  useGetProductsQuery,
  useGetProductQuery,
  // Order
  useCreateOrderMutation,
  useGetOrderQuery,
  // Cart
  useCreateCartMutation,
  useGetCartQuery,
  useClearCartMutation,
  // Payment
  useCreatePaymentIntentMutation,
  // user
  useCreateUserMutation,
  useGetUserQuery,
} = apiSlice;
