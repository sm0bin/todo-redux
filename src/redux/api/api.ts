// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/" }),
  tagTypes: ["Todo"],
  endpoints: (builder) => ({
    getTodos: builder.query({
      query: (priority) => {
        const params = new URLSearchParams();

        if (priority) {
          params.append("priority", priority);
        }

        return {
          url: "tasks",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["Todo"],
    }),
    addTodo: builder.mutation({
      query: (data) => {
        console.log("Adding todo:", data);
        return {
          url: "tasks",
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    updateTodo: builder.mutation({
      query: (options) => {
        console.log("Updating todo:", options);
        return {
          url: `tasks/${options.id}`,
          method: "PUT",
          body: options.data,
        };
      },
      invalidatesTags: ["Todo"],
    }),
    deleteTodo: builder.mutation({
      query: (id) => {
        console.log("Deleting todo with id:", id);
        return {
          url: `tasks/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Todo"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = baseApi;
