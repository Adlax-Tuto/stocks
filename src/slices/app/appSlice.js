import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	// desktopMode: false,
	isLimit: false,
};

const appSlice = createSlice({
	name: "app",
	initialState,
	reducers: {
		updateIsLimit: (state, { payload }) => {
			state.isLimit = payload;
		},
	},
});

export const { updateIsLimit } = appSlice.actions;

export default appSlice.reducer;
