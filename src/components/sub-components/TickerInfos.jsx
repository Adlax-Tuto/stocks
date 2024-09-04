import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { getSelectedTickerEod as getSelectedStockEod, getSelectedTickerLogo as getSelectedStockLogo } from "../../slices/stocks/stocksSlice";
import { getSelectedTickerEod as getSelectedIndexEod } from "../../slices/indexes/indexesSlice";
import { getSelectedTickerEod as getSelectedSavedEod, getSelectedTickerLogo as getSelectedSavedLogo } from "../../slices/saved/savedSlice";

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	.logo-container {
		border-radius: 10px;
		overflow: hidden;
		width: 10rem;
		height: 10rem;
		.logo {
			width: 100%;
			height: 100%;
		}
	}
	.infos-container {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		.subtitle {
			font-weight: bold;
			color: var(--clr-jasper-5);
		}
	}
`;

const TickerInfos = ({ slice }) => {
	const dispatch = useDispatch();

	// Stocks
	const { selectedTicker, selectedTickerEod, selectedTickerLogo } = useSelector((store) => store[slice]);
	const { currency, exchange, mic_code, symbol, name, country, exchange_timezone, type } = selectedTicker;
	const { datetime, close } = selectedTickerEod;

	useEffect(() => {
		if (Object.keys(selectedTicker).length > 0) {
			if (slice === "stocks") {
				dispatch(getSelectedStockEod());
				dispatch(getSelectedStockLogo());
			} else if (slice === "indexes") {
				dispatch(getSelectedIndexEod());
			} else {
				dispatch(getSelectedSavedLogo());
				dispatch(getSelectedSavedEod());
			}
		}
	}, [selectedTicker]);

	return (
		<Wrapper>
			{selectedTickerLogo?.url && (
				<div className="logo-container">
					<img src={selectedTickerLogo.url} alt="logo-img" className="logo" />
				</div>
			)}
			<div className="infos-container">
				<div>
					<span className="subtitle">Country : </span>
					<span>{country || "?"}</span>
				</div>
				<div>
					<span className="subtitle">Name : </span>
					<span>{name || "?"}</span>
				</div>
				<div>
					<span className="subtitle">Mic Code : </span>
					<span>{mic_code || "?"}</span>
				</div>
				<div>
					<span className="subtitle">Symbol : </span>
					<span>{symbol || "?"}</span>
				</div>
				<div>
					<span className="subtitle">Type : </span>
					<span>{type || "?"}</span>
				</div>
				<div>
					<span className="subtitle">Currency : </span>
					<span>{currency || "?"}</span>
				</div>
				<div>
					<span className="subtitle">Exchange : </span>
					<span>{exchange || "?"}</span>
				</div>
				<div>
					<span className="subtitle">Last closure price : </span>
					<span>
						{Math.round(close) || "?"}&nbsp;{currency || "?"}
					</span>
				</div>
				<div>
					<span className="subtitle">At date of : </span>
					<span>{datetime || "?"}</span>
				</div>
			</div>
		</Wrapper>
	);
};

export default TickerInfos;
