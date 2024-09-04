import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFiltersTickersListThunk, getInitTickersListThunk, getSearchTermTickersListThunk, getSelectedTickerDataThunk, getSelectedTickerEodThunk } from "../common/commonThunks";

export const getInitTickersList = createAsyncThunk("indexes/getInitTickersList", async () => getInitTickersListThunk("indices"));
export const getSearchTermTickersList = createAsyncThunk("indexes/getSearchTermTickersList", async (_, thunkAPI) =>
	getSearchTermTickersListThunk("symbol_search", "indexes", thunkAPI)
);
export const getFiltersTickersList = createAsyncThunk("indexes/getFiltersTickersList", async (_, thunkAPI) => getFiltersTickersListThunk("symbol_search", "indexes", thunkAPI));
export const getSelectedTickerEod = createAsyncThunk("indexes/getSelectedTickerEod", async (_, thunkAPI) => getSelectedTickerEodThunk("eod", "indexes", thunkAPI));
export const getSelectedTickerData = createAsyncThunk("indexes/getSelectedTickerData", async (_, thunkAPI) => getSelectedTickerDataThunk("time_series", "indexes", thunkAPI));

const initialState = {
	isLoading: false,
	tickersList: [],
	searchTerm: "",
	filters: {
		ticker: "",
	},
	selectedTicker: {},
	selectedTickerEod: {},
	selectedTickerData: {},
};

const indexesSlice = createSlice({
	name: "indexes",
	initialState,
	reducers: {
		updateSearchTerm: (state, { payload }) => {
			state.searchTerm = payload;
		},
		resetSearchTerm: (state) => {
			state.searchTerm = "";
		},
		updateFilters: (state, { payload: { key, value } }) => {
			state.filters[key] = value;
		},
		resetFilters: (state) => {
			state.filters.ticker = "";
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
			// Init list
			.addCase(getInitTickersList.pending, (state, { payload }) => {
				state.isLoading = true;
			})
			.addCase(getInitTickersList.fulfilled, (state, { payload }) => {
				state.isLoading = false;
				state.tickersList = payload.data;
			})
			.addCase(getInitTickersList.rejected, (state, { payload }) => {
				state.isLoading = false;
			})
			// Searchterm list
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
			// Filters list
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

export const { updateSearchTerm, resetFilters, resetSearchTerm, updateFilters, updateSelectedTicker, resetSelectedTicker } = indexesSlice.actions;

export default indexesSlice.reducer;
