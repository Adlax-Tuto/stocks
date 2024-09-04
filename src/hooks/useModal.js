import React, { useState } from "react";

const useModal = () => {
	const [showModal, setShowModal] = useState(false);

	const openModal = (evt, obj) => {
		setShowModal(true);
		placeCursor(evt);
		placeModal(evt);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	const placeCursor = (evt) => {
		const rect = evt.target.parentElement.getBoundingClientRect();
		const cursor = document.getElementById("cursor");
		const realX = rect.x + rect.width / 2;
		const realY = window.scrollY + rect.y + rect.height - 30;
		const style = `position: absolute; left: ${realX}px; top: ${realY}px; transform: translateX(-50%); margin: 0px;`;
		cursor.setAttribute("style", style);
	};

	const placeModal = (evt) => {
		const rect = evt.target.parentElement.getBoundingClientRect();
		const modal = document.getElementById("modal");
		const realX = rect.x + rect.width / 2;
		const realY = window.scrollY + rect.y + rect.height + 20;
		const width = rect.width;
		const style = `position: absolute; width: ${width}px; top: ${realY}px; left: ${realX}px; transform: translateX(-50%);  margin: 0px;`;
		modal.setAttribute("style", style);
	};

	const replaceModal = (elt) => {
		const rect = elt.getBoundingClientRect();
		const modalElt = document.getElementById("modal");
		const realX = rect.x + rect.width / 2;
		if (modalElt) {
			modalElt.style.left = `${realX}px`;
			modalElt.style.width = `${rect.width}px`;
		}
	};

	const replaceCursor = (elt) => {
		const rect = elt.getBoundingClientRect();
		const cursorElt = document.getElementById("cursor");
		const realX = rect.x + rect.width / 2;
		if (cursorElt) {
			cursorElt.style.left = `${realX}px`;
		}
	};

	return { showModal, openModal, closeModal, placeModal, placeCursor, replaceModal, replaceCursor };
};

export default useModal;
