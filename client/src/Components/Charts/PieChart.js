import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import * as d3 from "d3";

const PieChart = ({ data, labels }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data.length) return;

    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const chart = svg
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal(d3.schemeCategory10);
    const pie = d3.pie();
    const arc = d3.arc().innerRadius(0).outerRadius(radius);

    const arcs = chart.selectAll("arc").data(pie(data)).enter().append("g");

    arcs
      .append("path")
      .attr("d", arc)
      .attr("fill", (d, i) => color(i))
      .style("cursor", "pointer")
      .on("click", function (event, d) {
        const index = d.index;
        const cashier = data[index];
        const value = labels[index];

        // Reset all slices to default
        chart
          .selectAll("path")
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.6);

        // Emphasize the clicked slice
        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", function () {
            const [x, y] = arc.centroid(d);
            return `translate(${x * 0.1}, ${y * 0.1})`; // slight pop-out effect
          })
          .style("opacity", 1);

        // Show alert
        toast(`Cashier: ${cashier}\nValue: ${value}`);
      });

    // No text labels are added
  }, [data, labels]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
