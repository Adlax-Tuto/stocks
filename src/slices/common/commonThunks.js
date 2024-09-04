import axios from "axios";
import { filterBasicPlanTickers } from "../../utils/functions";

const baseUrl = process.env.REACT_APP_API_URL_BASE;
const apikey = `apikey=${process.env.REACT_APP_API_KEY}`;
const showplan = "show_plan=true";
const interval = `interval=1day`;

const filteredTryCatch = async (targetUrl) => {
	try {
		const response = await axios.get(targetUrl);
		const responseData = response.data;
		const results = {
			count: filterBasicPlanTickers(responseData.data).length,
			data: filterBasicPlanTickers(responseData.data),
		};
		return results;
	} catch (error) {
		console.log(error);
	}
};

const basicTryCatch = async (targetUrl) => {
	try {
		const response = await axios.get(targetUrl);
		const responseData = response.data;
		return responseData;
	} catch (error) {
		console.log(error);
	}
};

export const getInitTickersListThunk = async (endpoint) => {
	const targetUrl = baseUrl + endpoint + "?" + showplan + "&" + apikey;
	return filteredTryCatch(targetUrl);
};

export const getSearchTermTickersListThunk = async (endpoint, slice, thunkAPI) => {
	const { searchTerm } = thunkAPI.getState()[slice];
	const searchTermEncoded = encodeURIComponent(searchTerm);
	const symbol = `symbol=${searchTermEncoded}`;
	const targetUrl = baseUrl + endpoint + "?" + showplan + "&" + symbol + "&" + apikey;
	return filteredTryCatch(targetUrl);
};

export const getFiltersTickersListThunk = async (endpoint, slice, thunkAPI) => {
	const { filters } = thunkAPI.getState()[slice];
	let targetUrl = baseUrl + endpoint + "?";
	if (slice === "stocks") {
		const { country, market } = filters;
		const countrySegment = `country=${country}`;
		const marketSegment = `exchange=${market}`;
		if (country) {
			targetUrl += "&" + countrySegment;
		}
		if (market) {
			targetUrl += "&" + marketSegment;
		}
	} else {
		const { ticker } = filters;
		const symbolSegment = `symbol=${ticker}`;
		targetUrl += "&" + symbolSegment;
	}
	targetUrl += "&" + showplan + "&" + apikey;
	return filteredTryCatch(targetUrl);
};

export const getSelectedTickerLogoThunk = async (endpoint, slice, thunkAPI) => {
	const { selectedTicker } = thunkAPI.getState()[slice];
	const { symbol } = selectedTicker;
	const symbolSegment = `symbol=${symbol}`;
	const targetUrl = baseUrl + endpoint + "?" + symbolSegment + "&" + apikey;
	return basicTryCatch(targetUrl);
};

export const getSelectedTickerEodThunk = async (endpoint, slice, thunkAPI) => {
	const { selectedTicker } = thunkAPI.getState()[slice];
	const { symbol } = selectedTicker;
	const symbolSegment = `symbol=${symbol}`;
	const targetUrl = baseUrl + endpoint + "?" + symbolSegment + "&" + apikey;
	return basicTryCatch(targetUrl);
};

export const getSelectedTickerDataThunk = async (endpoint, slice, thunkAPI) => {
	const { selectedTicker } = thunkAPI.getState()[slice];
	const { symbol } = selectedTicker;
	const symbolSegment = `symbol=${symbol}`;
	const targetUrl = baseUrl + endpoint + "?" + interval + "&" + symbolSegment + "&" + apikey;
	return basicTryCatch(targetUrl);
};
