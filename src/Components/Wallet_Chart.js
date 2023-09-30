import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';

document.body.style.position = 'relative';

var container = document.createElement('div');
document.body.appendChild(container);

var width = 600;
var height = 300;

var chart = createChart(container, {
  width: width,
  height: height,
  rightPriceScale: {
    scaleMargins: {
      top: 0.2,
      bottom: 0.2,
    },
    borderVisible: false,
  },
  timeScale: {
    borderVisible: false,
  },
  layout: {
    backgroundColor: '#ffffff',
    textColor: '#333',
  },
  grid: {
    horzLines: {
      color: '#eee',
    },
    vertLines: {
      color: '#ffffff',
    },
  },
});


export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = '#2962FF',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();

	useEffect(
		() => {
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			var chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: 'solid', color: backgroundColor },
					textColor,
				},
				height: 350,
			});
			chart.timeScale().fitContent();

			const newSeries = chart.addAreaSeries({ lineColor, topColor: areaTopColor, bottomColor: areaBottomColor });
			newSeries.setData(data);

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);

				chart.remove();
			};
		},
		[data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]
	);

	return (
		<div
			ref={chartContainerRef}
		/>
	);
};

const toTimeStamp = (strDate) => { 
	const dt = Date.parse(strDate); 
	return dt / 1000; 
  }

const initialData = [
    { time: '2022-12-22', value: 0.002975 },
    { time: '2023-02-10', value: 0 },
	{ time: '2023-03-18', value: 0.2 },
	{ time: '2023-03-20', value: 0.17996862 },
	{ time: '2023-04-19', value: 1000.17996862 },
	{ time: '2023-06-14', value: 1000.17998062 },
	{ time: '2023-06-17', value: 4912.44049648 },
	{ time: '2023-06-21', value: 2512.440346 },
	{ time: '2023-06-27', value: 3827.73917861 },
];


export default function WalletChart(props) {
	return (
		<ChartComponent {...props} data={initialData}></ChartComponent>
	);
}