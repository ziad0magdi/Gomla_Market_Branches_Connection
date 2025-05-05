import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import * as d3 from "d3";

const PieChart = ({ data, labels }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data.length) return;

    // Always generate clean positive values from latest data
    const positiveValues = data.map(Math.abs);

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
    const pieData = pie(positiveValues);

    const arcs = chart.selectAll("g.arc").data(pieData, (d, i) => i);

    arcs.exit().remove();

    const enterArcs = arcs.enter().append("g").attr("class", "arc");

    enterArcs
      .append("path")
      .attr("fill", (d, i) => color(i))
      .style("cursor", "pointer")
      .on("click", function (event, d) {
        const index = d.index;
        const cashier = labels[index];
        const value = positiveValues[index];

        chart
          .selectAll("path")
          .transition()
          .duration(200)
          .attr("transform", "translate(0,0)")
          .style("opacity", 0.6);

        d3.select(this)
          .transition()
          .duration(200)
          .attr("transform", () => {
            const [x, y] = arc.centroid(d);
            return `translate(${x * 0.1}, ${y * 0.1})`;
          })
          .style("opacity", 1);

        toast(`Cashier: ${cashier}\nValue: ${value}`);
      });

    chart
      .selectAll("g.arc path")
      .data(pieData)
      .transition()
      .duration(500)
      .attr("d", arc)
      .attr("fill", (d, i) => color(i));
  }, [data, labels]);

  return <svg ref={ref}></svg>;
};

export default PieChart;
