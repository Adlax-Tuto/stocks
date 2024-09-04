import styled from "styled-components";

export const Wrapper = styled.section`
	/* border: 1px solid red; */
	font-size: 2rem;
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 3rem;
	.list-header {
		grid-column: 1 / -1;
		background-color: var(--clr-poppy-5);
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		padding: 1rem;
		margin-bottom: -3rem;
		.list-header-grid {
			display: grid;
			grid-template-columns: 2fr 4fr 1fr 1fr 1fr;
			justify-content: center;
			align-items: center;
			gap: 1rem;
		}
	}
	.saved-title {
		font-family: "Iceland";
		font-size: 3rem;
	}
	.list {
		grid-column: 1 / -1;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		background-color: var(--clr-white-2);
		box-shadow: 21px 17px 15px -3px rgba(0, 0, 0, 0.2);
		padding: 1rem;
		.active {
			box-shadow: -10px 0px 13px -7px #000000, 10px 0px 13px -7px #000000, 5px 5px 15px 5px rgba(0, 0, 0, 0);
		}
	}
	.pagination {
		/* border: 1px solid red; */
		grid-column: 1 / -1;
		width: fit-content;
		margin: 10rem auto;
		display: flex;
		gap: 2rem;
		font-size: 2rem;
		align-items: center;
		background-color: var(--clr-white-2);
		color: var(--clr-charcoal-5);
		border-radius: 15px;
		.pagination-btn {
			/* border: 1px solid white; */
			display: grid;
			place-content: center;
			cursor: pointer;
			transition: all 0.3s ease-in-out;
			&:hover {
				color: var(--clr-jasper-5);
			}
		}
		.active {
			color: var(--clr-poppy-5);
			text-decoration: underline;
			border-color: var(--clr-jasper-5) !important;
		}
		.border {
			border-radius: 4px;
			padding: 1rem;
		}
		.dots {
			cursor: default;
			&:hover {
				color: var(--clr-charcoal-5);
			}
		}
	}
	.filters {
		border-radius: 10px;
		padding: 1rem;
		background-color: var(--clr-jasper-5);
		box-shadow: 21px 17px 15px -3px rgba(0, 0, 0, 0.2);
	}
	.search {
		border-radius: 10px;
		padding: 1rem;
		background-color: var(--clr-charcoal-5);
		box-shadow: 21px 17px 15px -3px rgba(0, 0, 0, 0.2);
	}
	.criteria {
		border-radius: 10px;
		padding: 1rem;
		background-color: var(--clr-white-2);
		box-shadow: 21px 17px 15px -3px rgba(0, 0, 0, 0.2);
		grid-column: 1 / -1;
	}
	.reset {
		grid-column: 1 / -1;
	}
	.cursor {
		font-size: 6rem;
	}
	.modal {
		position: relative;
		background-color: var(--clr-charcoal-5);
		color: var(--clr-pale-dogwood-5);
		border-radius: 10px;
		box-shadow: #364156 0 -1px 4px, #bc96e6 0 -2px 10px, #d66853 0 -10px 20px, #df2935 0 -18px 40px, 5px 5px 15px 5px rgba(0, 0, 0, 0);
		padding-bottom: 1rem;
		.cross-icon {
			cursor: pointer;
			position: absolute;
			top: 1rem;
			right: 1rem;
			font-size: 3rem;
			color: var(--clr-jasper-5);
			transition: all 0.2s ease-in-out;
			&:hover {
				color: var(--clr-pale-dogwood-5);
				transform: scale(1.2);
			}
		}
		.save-icon {
			cursor: pointer;
			position: absolute;
			top: 1rem;
			left: 1rem;
			font-size: 3rem;
		}
		.grid-2-1 {
			/* border: 1px solid red; */
			display: grid;
			grid-template-columns: 1fr 1fr;
			margin-top: 4rem;
			.selected-ticker-infos {
				/* border: 1px solid green; */
			}
			.selected-ticker-graphs {
				/* border: 1px solid yellow; */
			}
		}
		/*position: relative;
		overflow: hidden; */
	}
	.show {
		display: block;
	}
	.hide {
		display: none;
	}
	@media screen and (max-width: 700px) {
		.filters {
			grid-column: 1/-1;
		}
		.search {
			grid-column: 1/-1;
		}
	}
	@media screen and (max-width: 1000px) {
		.modal {
			.grid-2-1 {
				grid-template-columns: 1fr;
			}
		}
	}
`;
