import React from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import { BiSolidDownArrow } from "react-icons/bi";
import { indexesPerCountry } from "../../data";
import { useDispatch } from "react-redux";
import { resetSearchTerm, updateFilters } from "../../slices/indexes/indexesSlice";

const Wrapper = styled.aside`
	/* border: 1px solid red; */
	width: 100%;
	height: 100%;
	color: var(--clr-charcoal-5);
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
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
			margin: auto;
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

const IndexesFilters = () => {
	const dispatch = useDispatch();

	const handleIndexSelection = (selection) => {
		dispatch(resetSearchTerm());
		dispatch(updateFilters({ key: "ticker", value: selection.code }));
	};

	return (
		<Wrapper>
			<div className="title">Some major indexes</div>
			<div className="input-container">
				<Select
					components={{ DropdownIndicator }}
					styles={selectStyle}
					name="region-select"
					id="region-select"
					className="input"
					options={indexesPerCountry["United States"]}
					onChange={handleIndexSelection}
				/>
			</div>
		</Wrapper>
	);
};

export default IndexesFilters;
