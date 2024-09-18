import { createSlice } from "@reduxjs/toolkit";


export interface ISideBar {
    collapsed: boolean
}
const initialState: ISideBar = {
    collapsed: false
};
const slice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
        state.collapsed = !state.collapsed
    }
  },
  
});
export const {
 toggleSidebar
} = slice.actions;
export default slice.reducer;
