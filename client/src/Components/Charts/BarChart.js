import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { toast } from "react-toastify";
import { useUser } from "../../context/UserContext";
import "./Charts.css";
const BarChart = ({ xData, yData }) => {
  const { isDarkMode } = useUser();
  const svgRef = useRef();

  useEffect(() => {
    if (!xData || !yData || xData.length !== yData.length) return;
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 50 };

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", `${isDarkMode ? "#2e2e2e" : "#f4f4f4"}`)
      .style("overflow", "visible");

    svg.selectAll("*").remove();

    const xScale = d3
      .scaleBand()
      .domain(xData)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(yData)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(xAxis)
      .selectAll("text")
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "end")
      .attr("dx", "-4.0em")
      .attr("dy", "-0.5em");

    svg
      .append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(yAxis);

    svg
      .selectAll(".bar")
      .data(yData)
      .enter()
      .append("rect")
      .attr("x", (_, i) => xScale(xData[i]))
      .attr("y", (d) => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", (d) => height - margin.bottom - yScale(d))
      .attr("fill", "#3498db")
      .on("click", function (event, d, i) {
        const index = yData.indexOf(d);
        const label = xData[index];

        // Reset all bars
        svg
          .selectAll("rect")
          .transition()
          .duration(200)
          .style("opacity", 0.6)
          .attr("stroke", "none");

        // Highlight the clicked bar
        d3.select(this)
          .transition()
          .duration(200)
          .style("opacity", 1)
          .attr("stroke", "orange")
          .attr("stroke-width", 3);

        // Optional: show toast
        toast.info(`Cashier: ${label} | Value: ${d}`);
      });
  }, [xData, yData, isDarkMode]);

  return <svg ref={svgRef}></svg>;
};

export default BarChart;
