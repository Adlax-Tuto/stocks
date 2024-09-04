import React, { useEffect, useState } from "react";
import { Wrapper } from "../../css/PageStyle";
import TickerLine from "../sub-components/TickerLine";
import { useDispatch, useSelector } from "react-redux";
import { getFiltersTickersList, getInitTickersList, getSearchTermTickersList, resetSelectedTicker, updateSelectedTicker } from "../../slices/indexes/indexesSlice";
import Pagination from "../sub-components/Pagination";
import usePagination from "../../hooks/usePagination";
import TickerSearch from "../sub-components/TickerSearch";
import IndexesFilters from "../sub-components/IndexesFilters";
import Criteria from "../sub-components/Criteria";
import Reset from "../sub-components/Reset";
import useModal from "../../hooks/useModal";
import { addToSavedList, removeFromSavedList } from "../../slices/saved/savedSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import Modal from "../sub-components/Modal";

const Indexes = () => {
	const dispatch = useDispatch();
	const { tickersList, filters, searchTerm, isLoading, selectedTicker } = useSelector((store) => store.indexes);
	const [resetFlag, setResetFlag] = useState(0);

	const { savedList } = useSelector((store) => store.saved);

	const { currentPageIndex, setCurrentPageIndex, maxPageIndex, increasePagePerOne, decreasePagePerOne } = usePagination(tickersList.length, 20);
	const { showModal, openModal, closeModal, placeModal, placeCursor, replaceModal, replaceCursor } = useModal();

	const listElt = document.getElementById("list");

	useEffect(() => {
		if (!filters.ticker && !searchTerm) {
			setCurrentPageIndex(0);
			dispatch(getInitTickersList());
		}
	}, [filters, searchTerm]);

	useEffect(() => {
		if (searchTerm !== "") {
			setCurrentPageIndex(0);
			dispatch(getSearchTermTickersList());
		}
	}, [searchTerm]);

	useEffect(() => {
		if (filters.ticker !== "") {
			setCurrentPageIndex(0);
			dispatch(getFiltersTickersList());
		}
	}, [filters]);

	const handleTickerSelection = (evt, index) => {
		dispatch(updateSelectedTicker(index));
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
			dispatch(addToSavedList({ ticker: selectedTicker, tickerType: "index" }));
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
				<IndexesFilters key={resetFlag} />
			</article>
			<article className="search">
				<TickerSearch setResetFlag={setResetFlag} />
			</article>
			{(filters.ticker !== "" || searchTerm !== "") && (
				<article className="criteria">
					<Criteria length={tickersList.length} maxPageIndex={maxPageIndex} />
				</article>
			)}
			{(filters.ticker !== "" || searchTerm !== "") && (
				<article className="reset">
					<Reset setResetFlag={setResetFlag} />
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
					tickersList.slice(currentPageIndex * 20, (currentPageIndex + 1) * 20).map((index, idx) => (
						<div
							key={`${idx}-${index.name}`}
							onClick={(evt) => handleTickerSelection(evt, index)}
							className={index.symbol === selectedTicker.symbol ? "active" : null}
						>
							<TickerLine tickerObj={index} />
						</div>
					))
				)}
			</article>
			<Modal
				showModal={showModal}
				handleCloseModal={handleCloseModal}
				toggleSavedState={toggleSavedState}
				getSavedStateStar={getSavedStateStar}
				slice="indexes"
			/>
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

export default Indexes;
