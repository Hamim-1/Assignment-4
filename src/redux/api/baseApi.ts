import { createApi, fetchBaseQuery, } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: fetchBaseQuery({ baseUrl: 'https://assignment-3-rho-two.vercel.app/api' }),
    tagTypes: ['Book'],
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getBooks: builder.query({
            query: () => "/books",
            providesTags: ['Book'],
        }),
        getLimitedBook: builder.query({
            query: (quantity: number) => `/books/?limit=${quantity}`,
            providesTags: ['Book'],
        }),
        getSingleBook: builder.query({
            query: (id: string) => `/books/${id}`,
            providesTags: ['Book'],
        }),
        getBorrowedSummary: builder.query({
            query: () => "/borrow",
            providesTags: ['Book'],
        }),
        createBook: builder.mutation({
            query: (bookData) => ({
                url: '/books',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['Book'],
        }),
        borrowBook: builder.mutation({
            query: (bookData) => ({
                url: '/borrow',
                method: 'POST',
                body: bookData
            }),
            invalidatesTags: ['Book'],
        }),
        deleteBook: builder.mutation({
            query: (id) => ({
                url: `/books/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ['Book'],
        }),
        updateBook: builder.mutation({
            query: ({ id, book }) => ({
                url: `/books/${id}`,
                method: "PUT",
                body: book
            }),
            invalidatesTags: ['Book'],
        }),
    })
})

export const { useGetBooksQuery, useGetBorrowedSummaryQuery, useGetSingleBookQuery, useGetLimitedBookQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation, useBorrowBookMutation } = baseApi;
