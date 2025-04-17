import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const CircleGrid = () => {
  const svgRef = useRef();

  useEffect(() => {
    const data = [10, 20, 30, 40, 50];
    const xScale = d3.scaleUtc().domain([0, data.length]).range([0, 60]);

    const svg = d3
      .select(svgRef.current)
      .attr("width", 700)
      .attr("height", 100);

    // bind data to circles
    svg
      .selectAll("circle")
      .data(data)
      .join("circle") // handles enter/update/exit
      .attr("cx", xScale)
      .attr("cy", 50) // center vertically
      .attr("r", (d) => d / 2)
      .attr("fill", (c) => `hsl(${c * 10}, 100%, 50%)`); // color based on data value;
  }, []);

  return <svg ref={svgRef}></svg>;
};

export default CircleGrid;
