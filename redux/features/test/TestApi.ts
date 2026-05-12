import { baseApi } from "@/redux/features/api/baseApi";
import type {
  Test,
  CreateTestDto,
  UpdateTestDto,
  TestListResponse,
  TestResponse,
} from "./TestTypes";

export const testApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getAllTests: builder.query<Test[], void>({
      query: () => ({ url: "/tests", method: "GET" }),
      transformResponse: (res: TestListResponse) => res.data,
      providesTags: ["Test"],
    }),

    getTestById: builder.query<Test, string>({
      query: (id) => ({ url: "/tests/${id}", method: "GET" }),
      transformResponse: (res: TestResponse) => res.data,
      providesTags: (_result, _err, id) => [{ type: "Test", id }],
    }),

    createTest: builder.mutation<Test, CreateTestDto>({
      query: (body) => ({ url: "/tests", method: "POST", body }),
      transformResponse: (res: TestResponse) => res.data,
      invalidatesTags: ["Test"],
    }),

    updateTest: builder.mutation<Test, { id: string; body: UpdateTestDto }>({
      query: ({ id, body }) => ({ url: "/tests/${id}", method: "PATCH", body }),
      transformResponse: (res: TestResponse) => res.data,
      invalidatesTags: (_result, _err, { id }) => [{ type: "Test", id }, "Test"],
    }),

    deleteTest: builder.mutation<void, string>({
      query: (id) => ({ url: "/tests/${id}", method: "DELETE" }),
      invalidatesTags: ["Test"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetAllTestsQuery,
  useGetTestByIdQuery,
  useCreateTestMutation,
  useUpdateTestMutation,
  useDeleteTestMutation,
} = testApi;
