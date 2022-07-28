import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

type ScatterplotProps = {
    width: number;
    height: number;
    data: { lifeExp: number; gdpPercap: number }[];
};

 const Scatterplot = ({ width, height, data }: ScatterplotProps) => {
    // Layout. The div size is set by the given props.
    // The bounds (=area inside the axis) is calculated by substracting the margins
    const axesRef = useRef(null);
    const boundsWidth = width - MARGIN.right - MARGIN.left;
    const boundsHeight = height - MARGIN.top - MARGIN.bottom;

    // Y axis
    const yScale = useMemo(() => {
        const [min, max] = d3.extent(data.map((d) => d.lifeExp));
        return d3.scaleLinear().domain([min, max] as [number, number]).range([boundsHeight, 0]);
    }, [data, height]);

    // Y axis
    const xScale = useMemo(() => {
        const [min, max] = d3.extent(data.map((d) => d.gdpPercap));
        return d3.scaleLinear().domain([0, max] as [number, number]).range([0, boundsWidth]);
    }, [data, width]);

    // Render the X and Y axis using d3.js, not react
    useEffect(() => {
        const svgElement = d3.select(axesRef.current);
        svgElement.selectAll("*").remove();
        const xAxisGenerator = d3.axisBottom(xScale);
        svgElement
            .append("g")
            .attr("transform", "translate(0," + boundsHeight + ")")
            .call(xAxisGenerator);

        const yAxisGenerator = d3.axisLeft(yScale);
        svgElement.append("g").call(yAxisGenerator);
    }, [xScale, yScale, boundsHeight]);

    // Build the shapes
    const allShapes = data.map((d, i) => {
        return (
            <circle
                key={i}
                r={4}
                cx={xScale(d.gdpPercap)}
                cy={yScale(d.lifeExp)}
                opacity={1}
                stroke="#9a6fb0"
                fill="#9a6fb0"
                fillOpacity={0.7}
                strokeWidth={1}
            />
        );
    });

    return (
        <div className="-ml-10 ">
            <svg
                width={width}
                height={height}
                style={{ display: "inline-block", background: "white" }}
            >
                {/* first group is for the violin and box shapes */}
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                >
                    {allShapes}
                </g>
                {/* Second is for the axes */}
                <g
                    width={boundsWidth}
                    height={boundsHeight}
                    ref={axesRef}
                    transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
                />
            </svg>
        </div>
    );
};

export default Scatterplot