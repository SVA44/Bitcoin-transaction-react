import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import './chart_styling.css';

export const ChartComponent = props => {
	const {
		data,
		colors: {
			backgroundColor = 'white',
			lineColor = 'black',
			textColor = 'black',
			areaTopColor = '#2962FF',
			areaBottomColor = 'rgba(41, 98, 255, 0.28)',
		} = {},
	} = props;

	const chartContainerRef = useRef();
	const [tooltipContent, setTooltipContent] = useState(null);

	useEffect(() => {
		//console.log('useEffect is running');
			const handleResize = () => {
				chart.applyOptions({ width: chartContainerRef.current.clientWidth });
			};

			let chart = createChart(chartContainerRef.current, {
				width: chartContainerRef.current.clientWidth,
				height: 300,
				rightPriceScale: {
					visible: true,
					scaleMargins: {
						top: 0.2,
						bottom: 0.2,
					},
					borderVisible: true,
					borderColor: 'black',
					axisLabel: 'Bitcoin Balance',
					axisLabelVisible: true,
					axisTitle: 'Bitcoin Balance (BTC)',

				},
				leftPriceScale: {
					visible: true,
					axisTitle: 'Bitcoin Price (USD)',
					axisLabel: 'Price (USD)',
					axisLabelVisible: true,
					scaleMargins: {
						top: 0.2,
						bottom: 0.2,
					},
					borderColor: 'black',
					priceFormat: {
						type: 'price',
						precision: -0, //removes a decimal
					},
				},
				timeScale: {
					borderVisible: true,
					borderColor: 'black',
					axisLabel: 'Time',
				},
				crosshair: {
					mdoe: CrosshairMode.Normal,
				},
				layout: {
					background: { type: ColorType.Solid, color: backgroundColor },
					textColor,
				},
				grid: {
					horzLines: {
					  color: '#F0F3FA',
					},
					vertLines: {
					  color: '#F0F3FA',
					},
				},
				handleScroll: {
					vertTouchDrag: false,
				},
			});
			
			chart.timeScale().fitContent();
			
			if (chart) {
		
				const areaSeries = chart.addLineSeries({ 
					lineColor: 'green', 
					className: 'green-line',
					priceScaleId: 'right',
					priceFormat: {
						type: 'price',
						precision: -0, //removes a decimal
					},
					lineWidth: 5,
					priceLineVisible: false,
				});
				areaSeries.setData(data);
				
				const lineSeries = chart.addLineSeries({
					lineColor: 'red', //hard coded red 
					className: 'red-line',
					priceScaleId: 'left',
					priceFormat: {
						type: 'price',
						precision: -0, //removes a decimal
					},
					priceLineVisible: false,
				});
				lineSeries.setData([
					{ time: '2022-12-22', value:  16829.64},
					{ time: '2023-02-10', value: 21793.57},
					{ time: '2023-03-18', value: 26411.48 },
					{ time: '2023-03-20', value: 27833.08 },
					{ time: '2023-04-19', value: 30121.65 },
					{ time: '2023-06-14', value: 25825 },
					{ time: '2023-06-17', value: 26021.2 },
					{ time: '2023-06-21', value: 28851.39 },
					{ time: '2023-06-27', value: 30742.37 },
				]);
			
				const tooltipSeries = chart.addLineSeries({
					lineColor: 'transparent',
					lineWidth: 1,
					priceLineVisible: false,
					lastValueVisible: false,
					});
					tooltipSeries.setData(data);
		
			chart.subscribeCrosshairMove(param => {
				//console.log('subscribeCrosshairMove is running', param);
				if (param.time) {
					//const tooltipEl = tooltipContainerRef.current;
					const price = param.seriesPrices ? param.seriesPrices.get(tooltipSeries) : undefined;

					if (price !== undefined) { //check is price is defined
						setTooltipContent(
							`<div>Time: ${param.time}</div><div>Price: ${price.toFixed(2)}</div>`
						);
					} else {
						setTooltipContent(null);
						//tooltipEl.style.display = 'none';
					}
				}
			});

			window.addEventListener('resize', handleResize);

			return () => {
				window.removeEventListener('resize', handleResize);
				chart.remove();
			};
		};
	}, [data, backgroundColor, lineColor, textColor, areaTopColor, areaBottomColor]);

	return (
		<div>
			<div ref={chartContainerRef}></div>
			{tooltipContent && (
				<div className="tooltip" style={{ left: '0px', top: '0px' }}>
					{tooltipContent}
				</div>
			)}
		</div>
	);
};

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


export default function Chart(props) {
	return (
		<div>
			<ChartComponent {...props} data={initialData}></ChartComponent>
		</div>
	);
}