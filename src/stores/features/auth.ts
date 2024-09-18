import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constants } from "@/settings";;
import webStorageClient from "@/utils/webStorageClient";
import { authApis } from "@/stores/services/auth";
export interface IAuth {
  user: {
    email: string;
    avatarUrl: string | null;
    fullName: string | null;
  };
}
const initialState: IAuth = {
  user: {
    email: "",
    avatarUrl: null,
    fullName: null
  }
};
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //todo adding reducers
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApis.endpoints.requestLogin.matchFulfilled, (state, action) => {
        const data = action.payload.body;
        state.user.email = data.user.email;
        state.user.avatarUrl = data.user.avatarUrl;
        state.user.fullName = data.user.fullName;
        webStorageClient.setToken(data.accessToken);
        webStorageClient.setRefreshToken(data.refreshToken);
      })
      .addMatcher(authApis.endpoints.requestForgetPassword.matchFulfilled, (state, action) => {

      })
      .addMatcher(authApis.endpoints.requestChangePassword.matchFulfilled, (state, action) => {

      })
      .addMatcher(authApis.endpoints.requestConfirmEmail.matchFulfilled, (state, action) => {

      })
      .addMatcher(authApis.endpoints.requestLogout.matchFulfilled, (state, action) => {

      })
  },
});

export const {
  //todo add reducer in need
} = slice.actions;

export default slice.reducer;

