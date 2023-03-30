import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { scaleLinear } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { Box } from '@mui/material';
import XYAxis from './LineChartAxisD3';

const margins = {
  top: 100,
  right: 20,
  bottom: 20,
  left: 20,
};

export function LineChartPathD3({
  target,
  status,
  width,
  height,
  speed,
  onEnd,
}) {
  const duration = status === 'end' ? 0 : 5300 - speed * 1000;
  const d = [];
  if (target !== 0) {
    let i = 0;
    let y = 0;
    while (y < 100) {
      y = (i * i * i) / 10;
      d.push({ x: i, y: (target / 1000) * y });
      i += 1;
    }
  } else d.push({ x: 0, y: 0 });

  const xScale = scaleLinear().domain([0, 10]).rangeRound([0, width]);
  const yScale = scaleLinear().domain([0, 100]).range([height, 0]);
  const lg = line()
    .x((item) => xScale(item.x))
    .y((item) => yScale(item.y))
    .curve(curveMonotoneX);

  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    select(node)
      .append('path')
      .datum(d)
      .attr('id', 'line')
      .attr('stroke', '#CC0000')
      .attr('stroke-width', 6)
      .attr('fill', 'none')
      .attr('d', lg);
    select(node)
      .append('circle')
      .attr('id', 'circle')
      .attr('class', 'circle')
      .attr('stroke', '#ECC417')
      .attr('stroke-width', '10')
      .attr('fill', '#333')
      .attr('r', 3);
    select(node)
      .append('text')
      .attr('id', 'text')
      .attr('class', 'charttext')
      .text('0.00x')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height / 2 - 100);

    // anim line
    const lineEl = select('#line').interrupt().datum(d).attr('d', lg);
    const path = lineEl.node();
    const pathLength = path.getTotalLength();
    const transitionPath = transition().duration(duration);

    lineEl
      .attr('stroke-dashoffset', pathLength)
      .attr('stroke-dasharray', pathLength)
      .transition(transitionPath)
      .attr('stroke-dashoffset', 0)
      .on('end', onEnd);

    // anim cycle
    function translateAlong() {
      return () => (t) => {
        const { x, y } = path.getPointAtLength(t * pathLength);
        const cur = (height - y) / height;
        select('#text').text(`${(cur * 10).toFixed(2)}x`);
        return `translate(${x},${y})`;
      };
    }
    select('#circle')
      .transition(transitionPath)
      .attrTween('transform', translateAlong());
  }, []);

  return (
    <svg
      width={width + margins.left + margins.right}
      height={height + margins.top + margins.bottom}
    >
      <g transform={`translate(${margins.left}, ${margins.top})`}>
        <XYAxis {...{ xScale, height }} />
        <g className="line-group" ref={ref} />
      </g>
    </svg>
  );
}

export function LineChartPathSkeletonD3({ w, h }) {
  return (
    <Box
      sx={{ p: 2 }}
      width={w + margins.left + margins.right}
      height={h + margins.top + margins.bottom}
    />
  );
}

LineChartPathD3.propTypes = {
  target: PropTypes.number,
  status: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  speed: PropTypes.number,
  onEnd: PropTypes.func,
};
LineChartPathD3.defaultProps = {
  target: 0,
  status: '',
  width: 600,
  height: 300,
  speed: 0,
  onEnd: () => {},
};

LineChartPathSkeletonD3.propTypes = {
  w: PropTypes.number,
  h: PropTypes.number,
};
LineChartPathSkeletonD3.defaultProps = {
  w: 600,
  h: 300,
};
