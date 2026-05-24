// settingsApi.ts
import { baseApi } from "@/redux/features/api/baseApi";
import type {
  GeneralSettings,
  GeneralSettingsResponse,
  UpdateGeneralSettingsDto,
  UpdatePasswordDto,
  UpdatePasswordResponse,
} from "./SettingsTypes";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    getGeneralSettings: builder.query<GeneralSettings, void>({
      query: () => ({
        url: "/dashboard/settings/general",
        method: "GET",
      }),
      transformResponse: (res: GeneralSettingsResponse) => res.data,
      providesTags: ["Settings"],
    }),

    updateGeneralSettings: builder.mutation<GeneralSettings, FormData>({
      query: (formData) => ({
        url: "/dashboard/settings/general/update-password",
        method: "PATCH",
        body: formData,
        formData: true,
      }),
      transformResponse: (res: GeneralSettingsResponse) => res.data,
      invalidatesTags: ["Settings"],
    }),

    updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordDto>({
      query: (body) => ({
        url: "/dashboard/settings/general/update-password",
        method: "PATCH",
        body,
      }),
      transformResponse: (res: UpdatePasswordResponse) => res,
      invalidatesTags: ["Settings"],
    }),

  }),
  overrideExisting: false,
});

export const {
  useGetGeneralSettingsQuery,
  useUpdateGeneralSettingsMutation,
  useUpdatePasswordMutation,
} = settingsApi;