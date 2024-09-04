import React, { useEffect } from "react";
import styled from "styled-components";
import ParitiesGraph from "./ParitiesGraph";
import { useDispatch } from "react-redux";
import { getAllParitiesTS } from "../../slices/forex/forexSlice";

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

const ParitiesHistory = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getAllParitiesTS());
	}, []);

	return (
		<Wrapper>
			<div className="title">main parities - history</div>
			<ParitiesGraph />
		</Wrapper>
	);
};

export default ParitiesHistory;
