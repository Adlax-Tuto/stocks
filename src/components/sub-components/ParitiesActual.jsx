import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllParitiesRate } from "../../slices/forex/forexSlice";
import styled from "styled-components";
import TickerLine from "./TickerLine";

const Wrapper = styled.aside`
	color: var(--clr-prussian-blue-5);

	.title {
		font-family: "Iceland";
		font-size: 3rem;
		margin-bottom: 2rem;
		text-align: center;
		text-transform: capitalize;
		color: var(--clr-prussian-blue-5);
	}
`;

const ParitiesActual = () => {
	const dispatch = useDispatch();
	const { allParitiesList } = useSelector((store) => store.forex);

	useEffect(() => {
		dispatch(getAllParitiesRate());
	}, []);

	return (
		<Wrapper>
			<div className="title">main parities - actual rate</div>
			{allParitiesList.map((parity, idx) => (
				<div key={idx}>
					<TickerLine tickerObj={parity} mode="parity" />
				</div>
			))}
		</Wrapper>
	);
};

export default ParitiesActual;
