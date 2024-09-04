export const filterBasicPlanTickers = (list) => {
	return list.filter((obj) => obj.access?.plan === "Basic");
};

export const timestampFormatter = (string) => {
	let date = new Date(string);
	let result = date.getTime();
	return result;
};
