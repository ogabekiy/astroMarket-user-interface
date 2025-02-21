import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const allApi = createApi({
  reducerPath: "allApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Users
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auths/login",
        method: "POST",
        body: credentials,
      }),
    }),

    register: builder.mutation({
      query: (credentials) => ({
        url: "/auths/register",
        method: "POST",
        body: credentials,
      }),
    }),

    getOneUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
    }),

    updateOneUser: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: credentials,
      }),
    }),

    // Categories
    getAllCategories: builder.query({
      query: () => `/categories`,
    }),

    getAllProductsOfCategory: builder.query({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "GET",
      }),
    }),

    // Products
    getAllProducts: builder.query({
      query: () => `/products`,
    }),

    searchProduct: builder.query({
      query: (query) => `/products/search/${query}`,
    }),

    getOneProduct: builder.query({
      query: (id) => `/products/${id}`,
    }),

    // Reviews
    writeReview: builder.mutation({
      query: ({ id, ...credentials }) => ({
        url: "/reviews",
        method: "POST",
        body: credentials,
      }),
    }),

    // Cart Products
    addProductToCart: builder.mutation({
      query: (credentials) => {
        console.log(credentials); // Avval credentials ni log qilamiz
    
        return {
          url: "/cart-products",
          method: "POST",
          body: {
            product_id: Number(credentials.product_id), // String bo'lsa, numberga aylantiradi
            quantity: 1, // Default qiymat 1
          },
        };
      },
    }),
    
    

    getCartProducts: builder.query({
      query: () => `/carts/active`,
    }),

    decreaseProductFromCart: builder.mutation({
      query: (id) => ({
        url: `/cart-products/decrease/${id}`,
        method: "PATCH",
      }),
    }),


    resetCart: builder.mutation({
      query: () => ({
        url: "/carts",
        method: "DELETE"
      })
    }),

    // Orders
    createOrder: builder.mutation({
      query: (body) => ({
        url: `/orders`,
        method: "POST",
        body: body,
      }),
    }),

    getOrders: builder.query({
      query: () => `/orders`,
    }),

    getOneOrder: builder.query({
      query: (id) => `/orders/${id}`,
    }),

    cancelOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
    }),

    acceptOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/accept/${id}`,
        method: "PATCH",
      }),
    }),

    // Payments
    createPayment: builder.mutation({
      query: (body) => ({
        url: `/payments`,
        method: "POST",
        body: body,
      }),
    }),

    getPayments: builder.query({
      query: () => `/payments`,
    }),

    //likes
    likeProduct: builder.mutation({
      query: (credentials) => ({
        url: `/likes`,
        method: "POST",
        body: {
          product_id: Number(credentials.product_id), 
        },
      })
    }),

    viewLikes: builder.query({
      query: () => '/likes'
    })



  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetOneUserQuery,
  useUpdateOneUserMutation,
  useGetAllCategoriesQuery,
  useGetAllProductsOfCategoryQuery,
  useGetAllProductsQuery,
  useSearchProductQuery,
  useGetOneProductQuery,
  useWriteReviewMutation,
  useAddProductToCartMutation,
  useGetCartProductsQuery,
  useDecreaseProductFromCartMutation,
  useCreateOrderMutation,
  useGetOrdersQuery,
  useGetOneOrderQuery,
  useCancelOrderMutation,
  useAcceptOrderMutation,
  useCreatePaymentMutation,
  useGetPaymentsQuery,
  useResetCartMutation,
  useLikeProductMutation,
  useViewLikesQuery
} = allApi;
