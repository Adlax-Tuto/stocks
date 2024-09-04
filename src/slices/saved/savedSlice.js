import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getSelectedTickerDataThunk, getSelectedTickerEodThunk, getSelectedTickerLogoThunk } from "../common/commonThunks";
import { getItemFromLocalStorage, setItemToLocalStorage } from "../../utils/localStorage";

export const getSelectedTickerLogo = createAsyncThunk("saved/getSelectedTickerLogo", async (_, thunkAPI) => getSelectedTickerLogoThunk("logo", "saved", thunkAPI));
export const getSelectedTickerEod = createAsyncThunk("saved/getSelectedTickerEod", async (_, thunkAPI) => getSelectedTickerEodThunk("eod", "saved", thunkAPI));
export const getSelectedTickerData = createAsyncThunk("saved/getSelectedTickerData", async (_, thunkAPI) => getSelectedTickerDataThunk("time_series", "saved", thunkAPI));

const initialState = {
	savedList: getItemFromLocalStorage("savedList") || [],
	selectedTicker: {},
	selectedTickerLogo: {},
	selectedTickerEod: {},
	selectedTickerData: {},
};

const savedSlice = createSlice({
	name: "saved",
	initialState,
	reducers: {
		addToSavedList: (state, { payload }) => {
			state.savedList.push(payload);
			setItemToLocalStorage("savedList", state.savedList);
		},
		removeFromSavedList: (state, { payload }) => {
			state.savedList.splice(payload, 1);
			setItemToLocalStorage("savedList", state.savedList);
		},
		updateSelectedTicker: (state, { payload }) => {
			state.selectedTicker = payload;
		},
		resetSelectedTicker: (state) => {
			state.selectedTicker = {};
		},
	},
	extraReducers: (builder) => {
		builder
			//logo fetch
			.addCase(getSelectedTickerLogo.fulfilled, (state, { payload }) => {
				state.selectedTickerLogo = payload;
			})
			//eod fetch
			.addCase(getSelectedTickerEod.fulfilled, (state, { payload }) => {
				state.selectedTickerEod = payload;
			})
			//time series fetch
			.addCase(getSelectedTickerData.fulfilled, (state, { payload }) => {
				state.selectedTickerData = payload;
			});
	},
});

export const { addToSavedList, removeFromSavedList, updateSelectedTicker, resetSelectedTicker } = savedSlice.actions;

export default savedSlice.reducer;
