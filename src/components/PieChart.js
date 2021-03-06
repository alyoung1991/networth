import React, { useEffect } from 'react';
import * as d3 from 'd3';

function PieChart(props) {
    const data = [
        { label: 'Cash', value: props.cash }, 
        { label: 'Savings', value: props.savings }, 
        { label: 'Brokerage', value: props.brokerage }, 
        { label: 'IRA', value: props.ira }, 
        { label: 'Bitcoin', value: props.bitcoin }
    ];
    const netWorth = parseFloat(props.cash) + parseFloat(props.savings) + parseFloat(props.brokerage) + parseFloat(props.ira) + parseFloat(props.bitcoin);
    const outerRadius = 400;
    const innerRadius = 200;

    const margin = {
        top: 50, right: 50, bottom: 50, left: 50,
    };

    const width = 2 * outerRadius + margin.left + margin.right;
    const height = 2 * outerRadius + margin.top + margin.bottom;

    const colorScale = d3     
        .scaleSequential()      
        .interpolator(d3.interpolateCool)      
        .domain([0, data.length]);

    useEffect(() => {
        drawChart();
    }, [data]);

    function drawChart() {
        // Remove the old svg
        d3.select('#pie-container')
        .select('svg')
        .remove();

        // Create new svg
        const svg = d3
        .select('#pie-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const arcGenerator = d3
        .arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

        const pieGenerator = d3
        .pie()
        .padAngle(0)
        .value((d) => d.value);

        const arc = svg
        .selectAll()
        .data(pieGenerator(data))
        .enter();

        // Append arcs
        arc
        .append('path')
        .attr('d', arcGenerator)
        .style('fill', (_, i) => colorScale(i))
        .style('stroke', '#ffffff')
        .style('stroke-width', 0);

        // Append text labels
        arc
        .append('text')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .text((d) => d.data.label + ': $' + d.data.value)
        .style('fill', '#ffffff')
        .attr('transform', (d) => {
            const [x, y] = arcGenerator.centroid(d);
            return `translate(${x}, ${y})`;
        });

        svg.append('text')
                        .attr('class', 'toolCircle')
                        .html('Net Worth: $' + netWorth)
                        .style('font-size', '1.5em')
                        .style('text-anchor', 'middle');
    }    

    return <div id="pie-container" />;
}

export default PieChart;