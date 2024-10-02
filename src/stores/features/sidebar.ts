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
    },
    setCollapsed: (state, action) => {
        state.collapsed = action.payload
    }
  },
  
});
export const {
 toggleSidebar,
 setCollapsed
} = slice.actions;
export default slice.reducer;
