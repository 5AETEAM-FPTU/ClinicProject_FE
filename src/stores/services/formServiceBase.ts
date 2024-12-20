import { constants } from "@/settings";
import webStorageClient from "@/utils/webStorageClient";
import { createApi, fetchBaseQuery, BaseQueryFn } from "@reduxjs/toolkit/query/react";
import { FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';

interface CustomExtraOptions {
  skipAuth?: boolean;
}

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, CustomExtraOptions> = async (args, api, extraOptions) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: constants.SERVICE_API_SERVIER,
    prepareHeaders: (headers) => {
      const accessToken = webStorageClient.getToken();

      // Skip setting the Authorization header if skipAuth is passed
      if (!extraOptions?.skipAuth && accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }

      return headers;
    },
    responseHandler: async (response) => {
      const contentType = response.headers.get('Content-Type');

      if (contentType?.includes('application/pdf')) {
        // If response is a PDF, return it as a Blob
        return await response.blob();
      }

      // Default to JSON for other content types
      return response.json();
    },
  });

  return baseQuery(args, api, extraOptions);
};

export const formServiceBaseApi = createApi({
  reducerPath: 'form',
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
