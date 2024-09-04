import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const Wrapper = styled.aside`
	display: flex;
	align-items: center;
	justify-content: space-between;
	.highlight {
		color: var(--clr-jasper-5);
	}
`;

const Criteria = ({ length, maxPageIndex, mode }) => {
	const { filters: stocksFilters, searchTerm: stocksSearchTerm } = useSelector((store) => store.stocks);
	const { filters: indexesFilters, searchTerm: indexesSearchTerm } = useSelector((store) => store.indexes);
	const { country, market } = stocksFilters;
	const { ticker } = indexesFilters;

	if (mode === "stocks") {
		return (
			<Wrapper>
				<p>
					Search criteria : <span className="highlight">{country}</span>
					<span className="highlight">{country && market && ", "}</span>
					<span className="highlight">{market}</span>
					<span className="highlight">{stocksSearchTerm}</span>
				</p>
				<p>
					Results : {length} / {maxPageIndex + 1} page(s)
				</p>
			</Wrapper>
		);
	} else {
		return (
			<Wrapper>
				<p>
					Search criteria : <span className="highlight">{ticker}</span>
					<span className="highlight">{indexesSearchTerm}</span>
				</p>
				<p>
					Results : {length} / {maxPageIndex + 1} page(s)
				</p>
			</Wrapper>
		);
	}
};

export default Criteria;
