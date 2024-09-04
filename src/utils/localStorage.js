export const getItemFromLocalStorage = (itemName) => {
	const result = localStorage.getItem(itemName);
	const returnedResult = result ? JSON.parse(result) : null;
	return returnedResult;
};

export const setItemToLocalStorage = (itemName, itemData) => {
	localStorage.setItem(itemName, JSON.stringify(itemData));
};
