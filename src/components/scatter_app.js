import React from 'react';
import axios from 'axios';
import * as d3 from "d3";


class ScatterApp extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    const url = 'https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json';
    axios.get(url).then(res => {
      const data = res.data;

      const height = 500,
            width = 700,
            margins = {top: 20, right: 100, bottom: 50, left: 50};

      const chart = d3.select('.chart')
        .attr('width', width + margins.left + margins.right)
        .attr('height', height + margins.top + margins.bottom)
        .append('g')
        .attr('transform','translate(' + margins.left + ',' + margins.top + ')');

      const fastestTime = d3.min(data, d => {return d.Seconds; });

      const xScale = d3.scaleLinear()
        .range([width, 0])
        .domain([0, d3.max(data, d => {return d.Seconds - fastestTime; }) + 5 ]);

      const yScale = d3.scaleLinear()
        .range([0, height])
        .domain([1, data.length + 1]);

      const dots = chart.selectAll('dot')
        .data(data)
        .enter().append('circle')
        .attr('r', 5)
        .attr('cx', d => {return xScale(d.Seconds - fastestTime); })
        .attr('cy', d => {return yScale(d.Place)})
        .style('fill', d => {
          if (d.Doping) {
            return 'red';
          } else {
            return 'green';
          }
        });

      const details = d3.select('.container').append('div')
        .attr('class','details')
        .html('Details');

      dots.on('mouseover', d => {
        details.html(
          d.Name + ' (' + d.Nationality + ')<br/>Time: ' +
          d.Time + ' Year: ' + d.Year + '<br/><br/>' + d.Doping)
          .style('opacity', 1);
      }).on('mouseout', () => {
        details.style('opacity', 0);
      });

      // chart.selectAll('text')
      //   .data(data)
        // .enter().append('text')
        // .text(d => {return d.Name; })
        // .attr('x', d => {return xScale(d.Seconds - fastestTime); })
        // .attr('y', d => {return yScale(d.Place); })
        // .attr('transform', 'translate(10,5)');

      chart.append('g')
        .attr('transform','translate(0,' + height + ')')
        .call(d3.axisBottom(xScale));

      chart.append('g')
        .call(d3.axisLeft(yScale));

      chart.append('text')
        .style('font-size', '14px')
        .style('text-anchor', 'middle')
        .attr('x', width / 2)
        .attr('y', height + 50)
        .text('Seconds Behind Fastest Time')

      chart.append('text')
        .style('font-size', '14px')
        .style('text-anchor', 'middle')
        .attr('x', height / -2)
        .attr('y', -30)
        .attr('transform', 'rotate(-90)')
        .text('Ranking')
    });
  }

  render() {
    return (
       <div className="container">
       <h1>Scatterplot Aspp</h1>
       <svg className='chart'></svg>
       </div>
    );
  }
}







export default ScatterApp;
