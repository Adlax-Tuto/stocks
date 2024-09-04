import React from "react";
import { Wrapper } from "../../css/TickerLineStyle";

const TickerLine = ({ tickerObj, mode }) => {
	const { currency, exchange, mic_code, country, symbol, name, instrument_name, currency_base, currency_quote, rate } = tickerObj;

	if (mode === "parity") {
		return (
			<Wrapper style={{ gridTemplateColumns: "1fr 2fr" }}>
				<span>{symbol}</span>
				<span>
					1 {currency_base} for {rate ? parseFloat(rate).toFixed(2) : "?"} {currency_quote}
				</span>
			</Wrapper>
		);
	}

	return (
		<Wrapper>
			<span>{country}</span>
			<span>{name || instrument_name}</span>
			<span>{currency}</span>
			<span>{exchange}</span>
			<span>{mic_code}</span>
		</Wrapper>
	);
};

export default TickerLine;
