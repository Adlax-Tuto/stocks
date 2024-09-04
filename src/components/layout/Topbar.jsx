import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.section`
	background-color: var(--clr-white-2);
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 3rem;
	box-shadow: 0px 10px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
	.text {
		text-transform: capitalize;
		font-family: "Iceland";
		color: var(--clr-jasper-5);
		text-shadow: 0px 3px 3px var(--clr-rose-taupe-5);
	}
`;

const Topbar = () => {
	const location = useLocation();

	return (
		<Wrapper>
			<p className="text">{location.pathname.slice(1)}</p>
		</Wrapper>
	);
};

export default Topbar;
