import styled from "styled-components";

export const Wrapper = styled.div`
	display: grid;
	padding: 1rem;
	grid-template-columns: 2fr 4fr 1fr 1fr 1fr;
	justify-content: center;
	align-items: center;
	gap: 1rem;
	cursor: pointer;
	transition: all 0.1s ease-in-out;
	&:hover {
		box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
	}
`;
