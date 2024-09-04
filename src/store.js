import { configureStore } from "@reduxjs/toolkit";
import stocksSliceReducer from "./slices/stocks/stocksSlice";
import indexesSliceReducer from "./slices/indexes/indexesSlice";
import forexSliceReducer from "./slices/forex/forexSlice";
import appSliceReducer from "./slices/app/appSlice";
import savedSliceReducer from "./slices/saved/savedSlice";

export const store = configureStore({
	reducer: {
		stocks: stocksSliceReducer,
		indexes: indexesSliceReducer,
		forex: forexSliceReducer,
		app: appSliceReducer,
		saved: savedSliceReducer,
	},
});
