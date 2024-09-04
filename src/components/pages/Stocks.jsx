import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFiltersTickersList, getInitTickersList, getSearchTermTickersList, getTickersList, resetSelectedTicker, updateSelectedTicker } from "../../slices/stocks/stocksSlice";
import { Wrapper } from "../../css/PageStyle";
import TickerLine from "../sub-components/TickerLine";
import usePagination from "../../hooks/usePagination";
import Pagination from "../sub-components/Pagination";
import TickerSearch from "../sub-components/TickerSearch";
import StocksFilters from "../sub-components/StocksFilters";
import Criteria from "../sub-components/Criteria";
import Reset from "../sub-components/Reset";
import useModal from "../../hooks/useModal";
import { addToSavedList, removeFromSavedList } from "../../slices/saved/savedSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import Modal from "../sub-components/Modal";

const Stocks = () => {
	const dispatch = useDispatch();
	const [resetFlag, setResetFlag] = useState(0);

	const { savedList } = useSelector((store) => store.saved);

	const { tickersList, searchTerm, filters, isLoading, selectedTicker } = useSelector((store) => store.stocks);
	const { region, country, market } = filters;

	const { currentPageIndex, setCurrentPageIndex, maxPageIndex, increasePagePerOne, decreasePagePerOne } = usePagination(tickersList.length, 20);
	const { showModal, openModal, closeModal, placeModal, placeCursor, replaceModal, replaceCursor } = useModal();

	const listElt = document.getElementById("list");

	useEffect(() => {
		if (!country && !region && !market && !searchTerm) {
			setCurrentPageIndex(0);
			dispatch(getInitTickersList());
		}
	}, [region, country, market, searchTerm]);

	useEffect(() => {
		if (searchTerm !== "") {
			setCurrentPageIndex(0);
			dispatch(getSearchTermTickersList());
		}
	}, [searchTerm]);

	useEffect(() => {
		if (filters.country !== "" || filters.market !== "") {
			setCurrentPageIndex(0);
			dispatch(getFiltersTickersList());
		}
	}, [filters]);

	const handleTickerSelection = (evt, stock) => {
		dispatch(updateSelectedTicker(stock));
		openModal(evt);
	};

	const handleCloseModal = () => {
		dispatch(resetSelectedTicker());
		closeModal();
	};

	const toggleSavedState = () => {
		const foundObjIndex = savedList.findIndex((obj) => obj.ticker.symbol === selectedTicker.symbol);
		if (foundObjIndex >= 0) {
			dispatch(removeFromSavedList(foundObjIndex));
		} else {
			dispatch(addToSavedList({ ticker: selectedTicker, tickerType: "stock" }));
		}
	};

	const getSavedStateStar = () => {
		const foundObj = savedList.find((obj) => obj.ticker.symbol === selectedTicker.symbol);
		if (foundObj) {
			return <FaStar />;
		} else {
			return <FaRegStar />;
		}
	};

	window.addEventListener("resize", () => {
		if (listElt) {
			replaceModal(listElt);
			replaceCursor(listElt);
		}
	});

	return (
		<Wrapper>
			<article className="filters">
				<StocksFilters key={resetFlag} />
			</article>
			<article className="search">
				<TickerSearch setResetFlag={setResetFlag} mode="stocks" />
			</article>
			{(filters.country !== "" || filters.market !== "" || searchTerm !== "") && (
				<article className="criteria">
					<Criteria length={tickersList.length} maxPageIndex={maxPageIndex} mode="stocks" />
				</article>
			)}
			{(filters.region !== "" || filters.country !== "" || filters.market !== "" || searchTerm !== "") && (
				<article className="reset">
					<Reset setResetFlag={setResetFlag} mode="stocks" />
				</article>
			)}
			<article className="list-header">
				<div className="list-header-grid">
					<span>Country</span>
					<span>Name</span>
					<span>Currency</span>
					<span>Market</span>
					<span>Mic code</span>
				</div>
			</article>
			<article className="list" id="list">
				{isLoading ? (
					<p>Loading...</p>
				) : tickersList.length < 1 ? (
					<p>No results found</p>
				) : (
					tickersList.slice(currentPageIndex * 20, (currentPageIndex + 1) * 20).map((stock, idx) => (
						<div
							key={`${idx}-${stock.name}`}
							onClick={(evt) => handleTickerSelection(evt, stock)}
							className={stock.symbol === selectedTicker.symbol ? "active" : null}
						>
							<TickerLine tickerObj={stock} />
						</div>
					))
				)}
			</article>
			<Modal showModal={showModal} handleCloseModal={handleCloseModal} toggleSavedState={toggleSavedState} getSavedStateStar={getSavedStateStar} slice="stocks" />
			<Pagination
				setCurrentPageIndex={setCurrentPageIndex}
				currentPageIndex={currentPageIndex}
				maxPageIndex={maxPageIndex}
				increasePagePerOne={increasePagePerOne}
				decreasePagePerOne={decreasePagePerOne}
			/>
		</Wrapper>
	);
};

export default Stocks;
