export const regionsOptions = [
	{ label: "North America", value: "North America" },
	{ label: "South America", value: "South America" },
	{ label: "Europe", value: "Europe" },
	{ label: "Asia", value: "Asia" },
];

export const countriesOptions = [
	{ label: "France", value: "France", region: "Europe" },
	{ label: "United Kingdom", value: "United Kingdom", region: "Europe" },
	{ label: "Italy", value: "Italy", region: "Europe" },
	{ label: "Germany", value: "Germany", region: "Europe" },
	{ label: "Spain", value: "Spain", region: "Europe" },
	{ label: "Sweden", value: "Sweden", region: "Europe" },
	{ label: "Netherlands", value: "Netherlands", region: "Europe" },
	{ label: "Canada", value: "Canada", region: "North America" },
	{ label: "United States", value: "United States", region: "North America" },
	{ label: "Brazil", value: "Brazil", region: "South America" },
	{ label: "Argentina", value: "Argentina", region: "South America" },
	{ label: "Japan", value: "Japan", region: "Asia" },
	{ label: "South Korea", value: "South Korea", region: "Asia" },
	{ label: "China", value: "China", region: "Asia" },
	{ label: "India", value: "India", region: "Asia" },
	{ label: "Hong Kong", value: "Hong Kong", region: "Asia" },
	{ label: "Taiwan", value: "Taiwan", region: "Asia" },
	{ label: "Russia", value: "Russia", region: "Europe" },
];

const marketsOptionsNotSorted = [
	{ label: "NASDAQ", value: "NASDAQ", region: "North America", country: "United States" },
	{ label: "NYSE", value: "NYSE", region: "North America", country: "United States" },
	{ label: "OTC", value: "OTC", region: "North America", country: "United States" },
	{ label: "IEX", value: "IEX", region: "North America", country: "United States" },
	{ label: "SSE", value: "SSE", region: "Asia", country: "China" },
	{ label: "SZSE", value: "SZSE", region: "Asia", country: "China" },
	{ label: "XPAR", value: "XPAR", region: "Europe", country: "France" },
	{ label: "KRX", value: "KRX", region: "Asia", country: "South Korea" },
	{ label: "KOSDAQ", value: "KOSDAQ", region: "Asia", country: "South Korea" },
	{ label: "HKEX", value: "HKEX", region: "Asia", country: "Hong Kong" },
	{ label: "TWSE", value: "TWSE", region: "Asia", country: "Taiwan" },
	{ label: "XSTU", value: "XSTU", region: "Europe", country: "Germany" },
	{ label: "FSX", value: "FSX", region: "Europe", country: "Germany" },
	{ label: "EUREX", value: "EUREX", region: "Europe", country: "Germany" },
	{ label: "XMUN", value: "XMUN", region: "Europe", country: "Germany" },
	{ label: "XBER", value: "XBER", region: "Europe", country: "Germany" },
	{ label: "XDUS", value: "XDUS", region: "Europe", country: "Germany" },
	{ label: "XETR", value: "XETR", region: "Europe", country: "Germany" },
	{ label: "XHAM", value: "XHAM", region: "Europe", country: "Germany" },
	{ label: "XHAN", value: "XHAN", region: "Europe", country: "Germany" },
	{ label: "LSE", value: "LSE", region: "Europe", country: "United Kingdom" },
	{ label: "AIM", value: "AIM", region: "Europe", country: "United Kingdom" },
	{ label: "LME", value: "LME", region: "Europe", country: "United Kingdom" },
	{ label: "NEX", value: "NEX", region: "Europe", country: "United Kingdom" },
	{ label: "NEO", value: "NEO", region: "North America", country: "Canada" },
	{ label: "TEX", value: "TEX", region: "North America", country: "Canada" },
	{ label: "TSX", value: "TSX", region: "North America", country: "Canada" },
	{ label: "CNSX", value: "CNSX", region: "North America", country: "Canada" },
	{ label: "XTSX", value: "XTSX", region: "North America", country: "Canada" },
	{ label: "BCBA", value: "BCBA", region: "South America", country: "Argentina" },
	{ label: "BVMF", value: "BVMF", region: "South America", country: "Brazil" },
	{ label: "XMIL", value: "XMIL", region: "Europe", country: "Italy" },
	{ label: "MTA", value: "MTA", region: "Europe", country: "Italy" },
	{ label: "BME", value: "BME", region: "Europe", country: "Spain" },
	{ label: "JPX", value: "JPX", region: "Asia", country: "Japan" },
	{ label: "XNGO", value: "XNGO", region: "Asia", country: "Japan" },
	{ label: "XFKA", value: "XFKA", region: "Asia", country: "Japan" },
	{ label: "XSAP", value: "XSAP", region: "Asia", country: "Japan" },
	{ label: "BSE", value: "BSE", region: "Asia", country: "India" },
	{ label: "NSE", value: "NSE", region: "Asia", country: "India" },
	{ label: "MOEX", value: "MOEX", region: "Europe", country: "Russia" },
	{ label: "OMX", value: "OMX", region: "Europe", country: "Sweden" },
	{ label: "XNGM", value: "XNGM", region: "Europe", country: "Sweden" },
	{ label: "XSAT", value: "XSAT", region: "Europe", country: "Sweden" },
	{ label: "EURONEXT", value: "XSAEURONEXTT", region: "Europe", country: "Netherlands" },
];

const marketSortFunction = (obj1, obj2) => {
	return obj1.label.localeCompare(obj2.label);
};

export const indexesPerCountry = {
	"United States": [
		{ label: "S&P500", code: "SPX" },
		{ label: "NASDAQ COMPOSITE", code: "IXIC" },
		{ label: "NASDAQ 100", code: "NDX" },
		{ label: "DOW JONES INDUSTRIAL", code: "DJI" },
	],
};

export const converterCurrencies = [
	{
		label: "Australian Dollar",
		code: "AUD",
	},
	{
		label: "Canadian Dollar",
		code: "CAD",
	},
	{
		label: "Swiss Franc",
		code: "CHF",
	},
	{
		label: "Euro",
		code: "EUR",
	},
	{
		label: "British Pound",
		code: "GBP",
	},
	{
		label: "Japanese Yen",
		code: "JPY",
	},
	{
		label: "New Zealand Dollar",
		code: "NZD",
	},
	{
		label: "US Dollar",
		code: "USD",
	},
];

export const mainParitiesList = [
	{
		symbol: "EUR/USD",
		currency_group: "Major",
		currency_base: "Euro",
		currency_quote: "US Dollar",
	},
	{
		symbol: "GBP/USD",
		currency_group: "Major",
		currency_base: "British Pound",
		currency_quote: "US Dollar",
	},
	{
		symbol: "CHF/USD",
		currency_group: "Major",
		currency_base: "Swiss Franc",
		currency_quote: "US Dollar",
	},
];

export const marketOptions = marketsOptionsNotSorted.sort(marketSortFunction);
