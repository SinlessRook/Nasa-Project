// LineChart.jsx
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { LineChart_CO } from '../assets/Constants';
import { m } from 'framer-motion';

const LineChart = (props) => {
    const country = props.country
    const type =props.type
    console.log(country,type)
    let data;
    data = LineChart_CO(country,type);
    const chartRef = useRef(null);


    useEffect(() => {
        // Initialize the ECharts instance
        const chartInstance = echarts.init(chartRef.current);

        // Define chart options with updated X and Y axes
        const options = {
            title: {
                text: `${type} Emissions Over Years`,
                left: 'center',
            },
            tooltip: {
                trigger: 'axis',
            },
            xAxis: {
                type: 'category',
                data: data[0],
                name: 'Year',
            },
            yAxis: {
                type: 'value',
                name: `${type} Emissions (in ppm)`, // Y-axis label
            },
            series: [
                {
                    name: 'CO Emissions',
                    type: 'line',
                    data: data[1], // CO emission values
                },
            ],
        };

        // Use the options to render the chart
        chartInstance.setOption(options);

        // Clean up on unmount
        return () => {
            chartInstance.dispose();
        };
    }, [country]);

    return <div ref={chartRef} style={{ width: '115%', height: '500px' }} />;
};

export default LineChart;
