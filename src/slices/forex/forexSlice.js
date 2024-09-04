import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchConverterParityRateThunk, getAllParitiesRateThunk, getAllParitiesTSThunk } from "./forexThunks";

export const fetchConverterParityRate = createAsyncThunk("forex/fetchConverterParityRate", fetchConverterParityRateThunk);
export const getAllParitiesRate = createAsyncThunk("forex/getAllParitiesRate", getAllParitiesRateThunk);
export const getAllParitiesTS = createAsyncThunk("forex/getAllParitiesTS", getAllParitiesTSThunk);

const initialState = {
	converterCurrencyLeft: "EUR",
	converterCurrencyRight: "USD",
	converterValueLeft: null,
	converterValueRight: null,
	converterParityRate: null,
	allParitiesList: [],
	allParitiesTS: [],
};

const forexSlice = createSlice({
	name: "forex",
	initialState,
	reducers: {
		updateConverterCurrencyLeft: (state, { payload }) => {
			state.converterCurrencyLeft = payload;
		},
		updateConverterCurrencyRight: (state, { payload }) => {
			state.converterCurrencyRight = payload;
		},
		updateConverterValueLeft: (state, { payload }) => {
			state.converterValueLeft = payload;
		},
		updateConverterValueRight: (state, { payload }) => {
			state.converterValueRight = payload;
		},
		resetConverterValues: (state) => {
			state.converterValueLeft = null;
			state.converterValueRight = null;
		},
	},
	extraReducers: (builder) => {
		builder
			// fetch one parity
			.addCase(fetchConverterParityRate.fulfilled, (state, { payload }) => {
				state.converterParityRate = payload;
			})
			// fetch may parities
			.addCase(getAllParitiesRate.fulfilled, (state, { payload }) => {
				state.allParitiesList = payload;
			})
			// fetch all parities TSs
			.addCase(getAllParitiesTS.fulfilled, (state, { payload }) => {
				state.allParitiesTS = payload;
			});
	},
});

export const { updateConverterCurrencyLeft, updateConverterCurrencyRight, updateConverterValueLeft, updateConverterValueRight, resetConverterValues } = forexSlice.actions;

export default forexSlice.reducer;
