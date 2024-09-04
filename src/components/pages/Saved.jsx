import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper } from "../../css/PageStyle";
import TickerLine from "../sub-components/TickerLine";
import { addToSavedList, removeFromSavedList, resetSelectedTicker, updateSelectedTicker } from "../../slices/saved/savedSlice";
import { FaRegStar, FaStar } from "react-icons/fa";
import useModal from "../../hooks/useModal";
import Modal from "../sub-components/Modal";

const Saved = () => {
	const dispatch = useDispatch();
	const { savedList, selectedTicker } = useSelector((store) => store.saved);
	const { showModal, openModal, closeModal, placeModal, placeCursor, replaceModal, replaceCursor } = useModal();

	const listElt = document.getElementById("list");

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
			<article className="saved-title">Saved stocks</article>
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
				{savedList.filter((obj) => obj.tickerType === "stock").length > 0 ? (
					<>
						{savedList
							.filter((obj) => obj.tickerType === "stock")
							.map((obj, idx) => (
								<div key={`${idx}-${obj.name}`} onClick={(evt) => handleTickerSelection(evt, obj.ticker)}>
									<TickerLine tickerObj={obj.ticker} onClick={(evt) => handleTickerSelection(evt, obj.ticker)} />
								</div>
							))}
					</>
				) : (
					<>No stocks saved</>
				)}
			</article>
			<article className="saved-title">Saved indexes</article>
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
				{savedList.filter((obj) => obj.tickerType === "index").length > 0 ? (
					<>
						{savedList
							.filter((obj) => obj.tickerType === "index")
							.map((obj, idx) => (
								<div key={`${idx}-${obj.name}`} onClick={(evt) => handleTickerSelection(evt, obj.ticker)}>
									<TickerLine tickerObj={obj.ticker} onClick={(evt) => handleTickerSelection(evt, obj.ticker)} />
								</div>
							))}
					</>
				) : (
					<>No indexes saved</>
				)}
			</article>
			<Modal showModal={showModal} handleCloseModal={handleCloseModal} toggleSavedState={toggleSavedState} getSavedStateStar={getSavedStateStar} slice="saved" />
		</Wrapper>
	);
};

export default Saved;
