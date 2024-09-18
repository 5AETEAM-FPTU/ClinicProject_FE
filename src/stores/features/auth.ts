import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { constants } from "@/settings";;
import webStorageClient from "@/utils/webStorageClient";

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
    initAuth(state, action: PayloadAction<{ accessToken: string, refreshToken: string, user: { email: string, avatarUrl: string | null, fullName: string | null } }>) {
      state.user.email = action.payload.user.email;
      state.user.avatarUrl = action.payload.user.avatarUrl;
      state.user.fullName = action.payload.user.fullName;
      webStorageClient.setToken(action.payload.accessToken);
      webStorageClient.setRefreshToken(action.payload.refreshToken);
    }
    //todo adding reducers
  },
  extraReducers: (builder) => {

  },
});

export const {
  initAuth
  //todo add reducer in need
} = slice.actions;
export default slice.reducer;
