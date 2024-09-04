import React, { useRef } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Stockchart from "highcharts/modules/stock";
import { timestampFormatter } from "../../utils/functions";

Stockchart(Highcharts);

const ParitiesGraph = () => {
	const graphRef = useRef();
	const { allParitiesTS } = useSelector((store) => store.forex);

	const valuesFormatter = () => {
		let result = [];
		result = allParitiesTS.map((obj) => {
			let serie = obj.values?.map((obj) => [timestampFormatter(obj.datetime), parseFloat(obj.close)]).reverse();
			return { name: obj.symbol, data: serie };
		});
		return result;
	};

	const allParitiesTSTransformed = allParitiesTS && valuesFormatter(allParitiesTS);

	const options = {
		yAxis: {
			opposite: true,
			title: {
				enabled: false,
			},
			labels: {
				style: {
					fontSize: "1.5rem",
					color: "var(--clr-prussian-blue-5)",
				},
				format: "{value}%",
			},
			gridLineColor: "var(--clr-prussian-blue-5)",
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
			lineColor: "var(--clr-prussian-blue-5)",
			tickColor: "var(--clr-prussian-blue-5)",
			labels: {
				style: {
					fontSize: "1.5rem",
					color: "var(--clr-prussian-blue-5)",
				},
			},
		},
		title: {
			text: null,
		},
		legend: {
			itemStyle: {
				fontSize: "2rem",
				color: "var(--clr-prussian-blue-5)",
			},
		},
		chart: {
			backgroundColor: "var(--clr-wisteria-5)",
		},
		tooltip: {
			style: {
				fontSize: "1.5rem",
			},
			pointFormat: "<span style='color:{series.color}'>{series.name}</span>: <b>{point.y} </b> ({point.change}%)",
			valueDecimals: 2,
			split: true,
			crosshairs: {
				color: "green",
			},
		},
		plotOptions: {
			series: {
				compare: "percent",
			},
		},
		series: allParitiesTSTransformed,
	};

	window.addEventListener("resize", () => {
		if (graphRef.current) {
			const container = graphRef.current.container.current;
			container.style.width = "98%";
			container.style.height = "98%";
			graphRef.current.chart.reflow();
		}
	});

	if (allParitiesTS.find((obj) => obj.status === "error")) {
		return <>Issue while fetching data. Retry in a minute.</>;
	}

	return (
		<div>
			<HighchartsReact highcharts={Highcharts} options={options} ref={graphRef} />
		</div>
	);
};

export default ParitiesGraph;
