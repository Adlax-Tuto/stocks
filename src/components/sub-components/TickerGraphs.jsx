import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSelectedTickerData as getSelectedStockData } from "../../slices/stocks/stocksSlice";
import { getSelectedTickerData as getSelectedIndexData } from "../../slices/indexes/indexesSlice";
import TickerDoubleGraph from "./TickerDoubleGraph";
import { getSelectedTickerData as getSelectedSavedData } from "../../slices/saved/savedSlice";

const TickerGraphs = ({ slice }) => {
	const dispatch = useDispatch();
	const { selectedTicker, selectedTickerData } = useSelector((store) => store[slice]);

	useEffect(() => {
		if (Object.keys(selectedTicker).length > 0) {
			if (slice === "stocks") {
				dispatch(getSelectedStockData());
			} else if (slice === "indexes") {
				dispatch(getSelectedIndexData());
			} else {
				dispatch(getSelectedSavedData());
			}
		}
	}, [selectedTicker]);

	return <div>{selectedTickerData.status === "ok" ? <TickerDoubleGraph data={selectedTickerData.values} /> : <>Error while fetching data</>}</div>;
};

export default TickerGraphs;
