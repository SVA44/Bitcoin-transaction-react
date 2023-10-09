import { brown } from '@mui/material/colors';
import { createChart, ColorType } from 'lightweight-charts';
import React, { useEffect, useRef } from 'react';


export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'lightgrey',
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

			const chart = createChart(chartContainerRef.current, {
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				width: chartContainerRef.current.clientWidth,
				height: 300,
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


//We will be importing transaction data. 
//if value is not set at each tick 
const initialData = [
  { time: '2018-12-03', value: 27.02 },
  { time: '2018-12-04', value: 27.02 }, 
  { time: '2018-12-05', value: 27.02 }, // see here, inbetween these points bar is straight - which would indicate no change in value
  { color: brown, time: '2018-12-06', value: 29.69 }, // whitespace
  { time: '2018-12-07' }, // whitespace
  { time: '2018-12-08', value: 23.92 },
  { time: '2018-12-13', value: 30.74 },
];

export default function Chart(props) {
	return (
		<ChartComponent {...props} data={initialData}></ChartComponent>
	);
}