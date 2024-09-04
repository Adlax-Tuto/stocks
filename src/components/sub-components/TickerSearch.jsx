import React, { useRef } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { resetFilters as resetStocksFilters, updateSearchTerm as updateStocksSearchTerm } from "../../slices/stocks/stocksSlice";
import { resetFilters as resetIndexesFilters, updateSearchTerm as updateIndexesSearchTerm } from "../../slices/indexes/indexesSlice";

const Wrapper = styled.aside`
	/* border: 1px solid red; */
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	.title {
		text-align: center;
		margin: 2rem auto;
		font-family: "Iceland";
		font-size: 3rem;
		color: var(--clr-jasper-5);
	}
	.input-container {
		/* border: 1px solid red; */
		display: flex;
		justify-content: center;
		.input {
			width: 200px;
			height: 4rem;
			border: none;
			outline: none;
			padding-left: 2rem;
			border-top-left-radius: 4px;
			border-bottom-left-radius: 4px;
			font-size: inherit;
		}
		.label {
			width: 4rem;
			height: 4rem;
			background-color: var(--clr-jasper-5);
			font-size: 3rem;
			font-weight: bold;
			cursor: pointer;
			border: none;
			outline: none;
			border-top-right-radius: 4px;
			border-bottom-right-radius: 4px;
			display: grid;
			place-content: center;
		}
	}
`;

const TickerSearch = ({ setResetFlag, mode }) => {
	const inputRef = useRef();
	const dispatch = useDispatch();

	const handleSearchTermUpdate = () => {
		const value = inputRef.current.value;

		if (mode === "stocks") {
			dispatch(resetStocksFilters());
			dispatch(updateStocksSearchTerm(value));
		} else {
			dispatch(resetIndexesFilters());
			dispatch(updateIndexesSearchTerm(value));
		}
		setResetFlag((state) => state + 1);
	};

	return (
		<Wrapper>
			{mode === "stocks" ? <div className="title">Search a stock</div> : <div className="title">Search an Index</div>}
			<div className="input-container">
				<input id="search-input" type="text" name="search" className="input" ref={inputRef} />
				<label htmlFor="search" className="label">
					<CiSearch onClick={handleSearchTermUpdate} />
				</label>
			</div>
		</Wrapper>
	);
};

export default TickerSearch;
