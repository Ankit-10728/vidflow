import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    loading: false,
    error: null
}

const NavSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        toggleNav: (state) => {
            state.isOpen = !state.isOpen
        },
    },
});

export const { toggleNav } = NavSlice.actions
export default NavSlice.reducer;
