import React, { useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { timestampFormatter } from "../../utils/functions";
import Stockchart from "highcharts/modules/stock";

Stockchart(Highcharts);

const TickerDoubleGraph = ({ data }) => {
	const graphRef = useRef();

	const valuesFormatter = () => {
		let result = [];
		result = data.map((obj) => [timestampFormatter(obj.datetime), parseFloat(obj.open), parseFloat(obj.high), parseFloat(obj.low), parseFloat(obj.close)]);
		return result;
	};
	const volumesFormatter = () => {
		let result = [];
		result = data.map((obj) => [timestampFormatter(obj.datetime), parseFloat(obj.volume)]);
		return result;
	};

	const valuesTransformed = data && valuesFormatter(data);
	const volumesTransformed = data && volumesFormatter(data);

	const options = {
		chart: {
			backgroundColor: "var(--clr-charcoal-5)",
		},

		title: {
			text: null,
		},

		legend: {
			enabled: false,
		},

		plotOptions: {
			candlestick: {
				color: "pink",
				lineColor: "red",
				upColor: "lightgreen",
				upLineColor: "green",
			},
			series: {
				pointWidth: 6,
			},
		},

		xAxis: {
			type: "datetime",
			dateTimeLabelFormats: {
				day: {
					main: "%e %b",
				},
				month: {
					main: "%b '%y",
				},
			},
			lineColor: "var(--clr-jasper-5)",
			tickColor: "var(--clr-jasper-5)",
			labels: {
				style: {
					color: "var(--clr-jasper-5)",
					fontSize: "1rem",
				},
			},
		},

		tooltip: {
			split: true,
			style: {
				fontSize: "1.6rem",
			},
		},

		yAxis: [
			{
				opposite: true,
				labels: {
					style: {
						color: "var(--clr-jasper-5)",
						fontSize: "1rem",
					},
				},
				gridLineColor: "var(--clr-jasper-5)",
				title: {
					text: "OHLC",
					style: {
						color: "var(--clr-jasper-5)",
						fontSize: "1rem",
					},
				},
				height: "60%",
				resize: {
					enabled: true,
				},
				lineWidth: 2,
			},
			{
				opposite: true,
				labels: {
					style: {
						color: "var(--clr-jasper-5)",
						fontSize: "1rem",
					},
				},
				gridLineColor: "var(--clr-jasper-5)",
				title: {
					text: "Volume",
					style: {
						color: "var(--clr-jasper-5)",
						fontSize: "1rem",
					},
				},
				top: "65%",
				height: "35%",
				resize: {
					enabled: true,
				},
				offset: 0,
				lineWidth: 2,
			},
		],

		series: [
			{
				type: "candlestick",
				data: valuesTransformed,
				name: "OHLC",
			},
			{
				type: "column",
				data: volumesTransformed,
				color: "var(--clr-jasper-5)",
				yAxis: 1,
				name: "Volume",
			},
		],
	};

	window.addEventListener("resize", () => {
		if (graphRef.current) {
			const container = graphRef.current.container.current;
			container.style.width = "98%";
			container.style.height = "98%";
			graphRef.current.chart.reflow();
		}
	});

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} ref={graphRef} />
		</div>
	);
};

export default TickerDoubleGraph;
