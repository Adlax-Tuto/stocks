import React from "react";
import { IoMdArrowDropup, IoMdCloseCircleOutline } from "react-icons/io";
import TickerInfos from "./TickerInfos";
import TickerGraphs from "./TickerGraphs";

const Modal = ({ showModal, handleCloseModal, toggleSavedState, getSavedStateStar, slice }) => {
	return (
		<>
			<article id="cursor" className={`cursor ${showModal ? "show" : "hide"}`}>
				<IoMdArrowDropup />
			</article>
			<article id="modal" className={`modal ${showModal ? "show" : "hide"}`}>
				<div className="cross-icon" onClick={handleCloseModal}>
					<IoMdCloseCircleOutline />
				</div>
				<div className="save-icon" onClick={toggleSavedState}>
					{getSavedStateStar()}
				</div>
				<div className="grid-2-1">
					<div className="selected-ticker-infos">
						<TickerInfos slice={slice} />
					</div>
					<div className="selected-ticker-graphs">
						<TickerGraphs slice={slice} />
					</div>
				</div>
			</article>
		</>
	);
};

export default Modal;
