import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Select, { components } from "react-select";
import { BiSolidDownArrow } from "react-icons/bi";
import { converterCurrencies } from "../../data";
import { useDispatch, useSelector } from "react-redux";
import {
	fetchConverterParityRate,
	resetConverterValues,
	updateConverterCurrencyLeft,
	updateConverterCurrencyRight,
	updateConverterValueLeft,
	updateConverterValueRight,
} from "../../slices/forex/forexSlice";

const Wrapper = styled.aside`
	color: var(--clr-prussian-blue-5);
	.title {
		text-align: center;
		font-family: "Iceland";
		font-size: 3rem;
		margin-bottom: 2rem;
		text-transform: capitalize;
	}
	.grid-3 {
		display: grid;
		grid-template-columns: 1fr 50px 1fr;
		row-gap: 1rem;
		.converter-header {
			text-align: center;
		}
		.input-container {
			/* border: 1px solid red; */
			.input {
				width: 100%;
				height: 4rem;
				border-radius: 4px;
				outline: none;
				border: none;
				font-family: inherit;
				font-size: inherit;
				color: var(--clr-prussian-blue-5);
			}
			.text-input {
				padding-left: 1rem;
				padding-right: 1rem;
			}
			.align-right {
				text-align: end;
			}
		}
		.equal-container {
			display: grid;
			place-content: center;
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

const Converter = () => {
	const dispatch = useDispatch();
	const { converterCurrencyLeft, converterCurrencyRight, converterValueLeft, converterValueRight, converterParityRate } = useSelector((store) => store.forex);

	const leftValueRef = useRef();
	const rightValueRef = useRef();

	const resetInputValues = () => {
		leftValueRef.current.value = "";
		rightValueRef.current.value = "";
		dispatch(resetConverterValues());
	};

	useEffect(() => {
		dispatch(fetchConverterParityRate());
		resetInputValues();
	}, [converterCurrencyLeft, converterCurrencyRight]);

	useEffect(() => {
		if ((converterValueLeft || converterValueLeft === 0) && converterParityRate && typeof converterParityRate === "number") {
			const newRightValue = converterValueLeft * converterParityRate;
			rightValueRef.current.value = newRightValue.toFixed(2);
		} else {
			resetInputValues();
		}
	}, [converterValueLeft]);

	useEffect(() => {
		if ((converterValueRight || converterValueRight === 0) && converterParityRate && typeof converterParityRate === "number") {
			const newLeftValue = converterValueRight / converterParityRate;
			leftValueRef.current.value = newLeftValue.toFixed(2);
		} else {
			resetInputValues();
		}
	}, [converterValueRight]);

	const leftDefaultCurrency = () => {
		return converterCurrencies.find((obj) => obj.code === "EUR");
	};

	const rightDefaultCurrency = () => {
		return converterCurrencies.find((obj) => obj.code === "USD");
	};

	const handleLeftCurrencySelection = (selection) => {
		dispatch(updateConverterCurrencyLeft(selection.code));
	};

	const handleRightCurrencySelection = (selection) => {
		dispatch(updateConverterCurrencyRight(selection.code));
	};

	const handleLeftValueInput = (input) => {
		const value = input.target.value;
		const regexp = /^-?\d*\.?\d*$/;
		if (value.match(regexp)) {
			dispatch(updateConverterValueLeft(parseFloat(value)));
		} else {
			resetInputValues();
		}
	};

	const handleRightValueInput = (input) => {
		const value = input.target.value;
		const regexp = /^-?\d*\.?\d*$/;
		if (value.match(regexp)) {
			dispatch(updateConverterValueRight(parseFloat(value)));
		} else {
			resetInputValues();
		}
	};

	return (
		<Wrapper>
			<div className="title">currency converter</div>
			<div className="grid-3">
				<div className="converter-header">From/To</div>
				<div></div>
				<div className="converter-header">To/From</div>
				<div className="input-container">
					<Select
						components={{ DropdownIndicator }}
						styles={selectStyle}
						name="region-select"
						id="region-select"
						className="input"
						options={converterCurrencies}
						defaultValue={leftDefaultCurrency}
						onChange={handleLeftCurrencySelection}
					/>
				</div>
				<div></div>
				<div className="input-container">
					<Select
						components={{ DropdownIndicator }}
						styles={selectStyle}
						name="region-select"
						id="region-select"
						className="input"
						options={converterCurrencies}
						defaultValue={rightDefaultCurrency}
						onChange={handleRightCurrencySelection}
					/>
				</div>
				<div className="input-container">
					<input type="text" className="input text-input align-right" onChange={handleLeftValueInput} ref={leftValueRef} />
				</div>
				<div className="equal-container">=</div>
				<div className="input-container">
					<input type="text" className="input text-input " onChange={handleRightValueInput} ref={rightValueRef} />
				</div>
			</div>
		</Wrapper>
	);
};

export default Converter;
