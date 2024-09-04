import React from "react";
import Select, { components } from "react-select";
import styled from "styled-components";
import { regionsOptions, countriesOptions, marketOptions } from "../../data";
import { BiSolidDownArrow } from "react-icons/bi";
import { Placeholder } from "react-select/animated";
import { useDispatch, useSelector } from "react-redux";
import { resetSearchTerm, updateFilters } from "../../slices/stocks/stocksSlice";

const Wrapper = styled.aside`
	/* border: 1px solid red; */
	width: 100%;
	height: 100%;
	color: var(--clr-charcoal-5);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	gap: 1rem;
	.title {
		text-align: center;
		margin: 2rem auto;
		font-family: "Iceland";
		font-size: 3rem;
	}
	.input-container {
		/* border: 1px solid green; */
		display: flex;
		justify-content: space-between;
		align-items: center;
		.label {
			margin-left: 1rem;
		}
		.input {
			width: 200px;
			height: 4rem;
			border: none;
			outline: none;
			font-size: inherit;
		}
	}
`;

const DropdownIndicator = (props) => {
	return (
		<components.DropdownIndicator {...props}>
			<BiSolidDownArrow label="icon" color="var(--clr-prussian-blue-5)" />
		</components.DropdownIndicator>
	);
};

const selectStyle = {
	placeholder: (base) => ({
		...base,
		color: "var(--clr-prussian-blue-5)",
	}),
	control: (base) => ({
		...base,
		cursor: "pointer",
	}),
	singleValue: (base) => ({
		...base,
		color: "var(--clr-prussian-blue-5)",
	}),
	option: (base) => ({
		...base,
		color: "var(--clr-prussian-blue-5)",
		backgroundColor: null,
	}),
};

const StocksFilters = () => {
	const dispatch = useDispatch();
	const { filters } = useSelector((store) => store.stocks);
	const { region, country, market } = filters;

	const handleRegionSelection = (region) => {
		dispatch(resetSearchTerm());
		const searchBoxInputElt = document.getElementById("search-input");
		searchBoxInputElt.value = "";
		dispatch(updateFilters({ key: "region", value: region.value }));
		dispatch(updateFilters({ key: "country", value: "" }));
		dispatch(updateFilters({ key: "market", value: "" }));
	};

	const handleCountrySelection = (country) => {
		dispatch(resetSearchTerm());
		const searchBoxInputElt = document.getElementById("search-input");
		searchBoxInputElt.value = "";
		dispatch(updateFilters({ key: "country", value: country.value }));
		dispatch(updateFilters({ key: "market", value: "" }));
	};

	const handleMarketSelection = (market) => {
		dispatch(resetSearchTerm());
		const searchBoxInputElt = document.getElementById("search-input");
		searchBoxInputElt.value = "";
		dispatch(updateFilters({ key: "market", value: market.value }));
	};

	const getCountryOptions = () => {
		if (region) {
			return countriesOptions.filter((obj) => obj.region === region);
		}
		return countriesOptions;
	};

	const getMarketOptions = () => {
		if (region && !country) {
			return marketOptions.filter((obj) => obj.region === region);
		} else if (!region && country) {
			return marketOptions.filter((obj) => obj.country === country);
		} else if (region && country) {
			return marketOptions.filter((obj) => obj.region === region && obj.country === country);
		} else {
			return marketOptions;
		}
	};

	return (
		<Wrapper>
			<div className="title">Regions / Countries</div>
			<div className="input-container">
				<label htmlFor="" className="label">
					Region:
				</label>
				<Select
					components={{ DropdownIndicator }}
					styles={selectStyle}
					name="region-select"
					id="region-select"
					className="input"
					options={regionsOptions}
					onChange={handleRegionSelection}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="" className="label">
					Country:
				</label>
				<Select
					key={region}
					components={{ DropdownIndicator }}
					styles={selectStyle}
					name="country-select"
					id="country-select"
					className="input"
					options={getCountryOptions()}
					onChange={handleCountrySelection}
				/>
			</div>
			<div className="input-container">
				<label htmlFor="" className="label">
					Market:
				</label>
				<Select
					key={region + country}
					components={{ DropdownIndicator }}
					styles={selectStyle}
					name="market-select"
					id="market-select"
					className="input"
					options={getMarketOptions()}
					onChange={handleMarketSelection}
				/>
			</div>
		</Wrapper>
	);
};

export default StocksFilters;
