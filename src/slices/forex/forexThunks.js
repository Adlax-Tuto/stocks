import axios from "axios";
import { mainParitiesList } from "../../data";
import { updateIsLimit } from "../app/appSlice";

const baseUrl = process.env.REACT_APP_API_URL_BASE;
const apikey = `apikey=${process.env.REACT_APP_API_KEY}`;
const interval = `interval=1day`;

export const fetchConverterParityRateThunk = async (_, thunkAPI) => {
	const { converterCurrencyLeft: curr1, converterCurrencyRight: curr2 } = thunkAPI.getState().forex;
	if (curr1 === curr2) {
		return 1;
	}
	const endpoint = `exchange_rate`;
	const symbol = `symbol=${curr1}/${curr2}`;
	const targetUrl = baseUrl + endpoint + `?` + symbol + `&` + apikey;
	try {
		const response = await axios.get(targetUrl);
		const responseData = response.data;
		if (responseData.code === 429) {
			thunkAPI.dispatch(updateIsLimit(true));
		}
		return responseData.rate;
	} catch (error) {
		console.log(error);
	}
};

const getSingleParityRate = async (pair, thunkAPI) => {
	const endpoint = `exchange_rate`;
	const symbol = `symbol=${pair}`;
	const targetUrl = baseUrl + endpoint + "?" + symbol + "&" + apikey;
	try {
		const response = await axios.get(targetUrl);
		const responseData = response.data;
		return responseData;
	} catch (error) {
		console.log(error);
	}
};

export const getAllParitiesRateThunk = async (_, thunkAPI) => {
	const newList = await Promise.all(
		mainParitiesList.map(async (obj) => {
			try {
				const rate = await getSingleParityRate(obj.symbol, thunkAPI);
				return { ...obj, ...rate };
			} catch (error) {
				return obj;
			}
		})
	);
	if (newList.find((obj) => obj.code === 429)) {
		thunkAPI.dispatch(updateIsLimit(true));
	}
	return newList;
};

const getSingleParityTSThunk = async (pair, thunkAPI) => {
	const endpoint = `time_series`;
	const symbol = `symbol=${pair}`;
	const targetUrl = baseUrl + endpoint + "?" + symbol + "&" + interval + "&" + apikey;
	try {
		const response = await axios.get(targetUrl);
		const responseData = response.data;
		return responseData;
	} catch (error) {
		console.log(error);
	}
};

export const getAllParitiesTSThunk = async (_, thunkAPI) => {
	const newList = await Promise.all(
		mainParitiesList.map(async (parity) => {
			try {
				const response = await getSingleParityTSThunk(parity.symbol, thunkAPI);
				return { ...parity, ...response };
			} catch (error) {
				return parity;
			}
		})
	);
	if (newList.find((obj) => obj.code === 429)) {
		thunkAPI.dispatch(updateIsLimit(true));
	}
	return newList;
};
