import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
	getFiltersTickersListThunk,
	getInitTickersListThunk,
	getSearchTermTickersListThunk,
	getSelectedTickerDataThunk,
	getSelectedTickerEodThunk,
	getSelectedTickerLogoThunk,
} from "../common/commonThunks";

export const getInitTickersList = createAsyncThunk("stocks/getInitTickersList", async () => getInitTickersListThunk("stocks"));
export const getSearchTermTickersList = createAsyncThunk("stocks/getSearchTermTickersList", async (_, thunkAPI) =>
	getSearchTermTickersListThunk("symbol_search", "stocks", thunkAPI)
);
export const getFiltersTickersList = createAsyncThunk("stocks/getFiltersTickersList", async (_, thunkAPI) => getFiltersTickersListThunk("stocks", "stocks", thunkAPI));
export const getSelectedTickerLogo = createAsyncThunk("stocks/getSelectedTickerLogo", async (_, thunkAPI) => getSelectedTickerLogoThunk("logo", "stocks", thunkAPI));
export const getSelectedTickerEod = createAsyncThunk("stocks/getSelectedTickerEod", async (_, thunkAPI) => getSelectedTickerEodThunk("eod", "stocks", thunkAPI));
export const getSelectedTickerData = createAsyncThunk("stocks/getSelectedTickerData", async (_, thunkAPI) => getSelectedTickerDataThunk("time_series", "stocks", thunkAPI));

const initialState = {
	isLoading: false,
	test: "salut",
	tickersList: [],
	searchTerm: "",
	filters: {
		region: "",
		country: "",
		market: "",
	},
	selectedTicker: {},
	selectedTickerLogo: {},
	selectedTickerEod: {},
	selectedTickerData: {},
};

const stocksSlice = createSlice({
	name: "stocks",
	initialState,
	reducers: {
		updateSearchTerm: (state, { payload }) => {
			state.searchTerm = payload;
		},
		updateFilters: (state, { payload: { key, value } }) => {
			state.filters[key] = value;
		},
		resetFilters: (state) => {
			state.filters.region = "";
			state.filters.country = "";
			state.filters.market = "";
		},
		resetSearchTerm: (state) => {
			state.searchTerm = "";
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
			//init list fetch
			.addCase(getInitTickersList.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(getInitTickersList.fulfilled, (state, { payload }) => {
				state.tickersList = payload.data;
				state.isLoading = false;
			})
			.addCase(getInitTickersList.rejected, (state, { payload }) => {
				state.tickersList = payload.data;
				state.isLoading = false;
			})
			//searchterm list
			.addCase(getSearchTermTickersList.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(getSearchTermTickersList.fulfilled, (state, { payload }) => {
				state.tickersList = payload.data;
				state.isLoading = false;
			})
			.addCase(getSearchTermTickersList.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			//filters list
			.addCase(getFiltersTickersList.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(getFiltersTickersList.fulfilled, (state, { payload }) => {
				state.tickersList = payload.data;
				state.isLoading = false;
			})
			.addCase(getFiltersTickersList.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
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

export const { updateSearchTerm, updateFilters, resetFilters, resetSearchTerm, updateSelectedTicker, resetSelectedTicker } = stocksSlice.actions;

export default stocksSlice.reducer;
