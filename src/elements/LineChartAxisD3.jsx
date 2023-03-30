import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { select } from 'd3-selection';
import { axisBottom } from 'd3-axis';

export default function LineChartAxisD3({ xScale, height }) {
  const ref = useRef();
  useEffect(() => {
    const node = ref.current;
    const axis = axisBottom(xScale);
    select(node).call(axis);
  }, []);
  return (
    <g className="axis-group">
      <g
        ref={ref}
        transform={`translate(0, ${height})`}
        className="bottom axis"
      />
    </g>
  );
}

LineChartAxisD3.propTypes = {
  height: PropTypes.number,
  xScale: PropTypes.func,
};
LineChartAxisD3.defaultProps = {
  height: 300,
  xScale: () => {},
};
