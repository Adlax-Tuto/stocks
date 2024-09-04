import styled from "styled-components";

export const Wrapper = styled.section`
	/* border: 1px solid red; */
	font-size: 2rem;
	display: grid;
	grid-template-columns: 1fr 2fr;
	gap: 3rem;
	.converter {
		border-radius: 10px;
		padding: 1rem;
		background-color: var(--clr-jasper-5);
		box-shadow: 21px 17px 15px -3px rgba(0, 0, 0, 0.2);
		grid-row: 1/2;
	}
	.parities-actual {
		border-radius: 10px;
		padding: 1rem;
		background-color: var(--clr-white-2);
		box-shadow: 21px 17px 15px -3px rgba(0, 0, 0, 0.2);
		grid-row: 2/3;
	}
	.parities-history {
		border-radius: 10px;
		padding: 1rem;
		background-color: var(--clr-wisteria-5);
		box-shadow: 21px 17px 15px -3px rgba(0, 0, 0, 0.2);
		grid-row: 1/3;
	}
	@media screen and (max-width: 700px) {
		grid-template-columns: 1fr;
		.converters {
			grid-column: 1/-1;
			grid-row: 1/2;
		}
		.parities-actual {
			grid-column: 1/-1;
			grid-row: 2/3;
		}
		.parities-history {
			grid-column: 1/-1;
			grid-row: 3/4;
		}
	}
`;
