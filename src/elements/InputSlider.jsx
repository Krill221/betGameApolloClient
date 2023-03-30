import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Slider } from '@mui/material';
import Header from './Header';

const marks = [
  {
    value: 1,
    label: '1x',
  },
  {
    value: 2,
    label: '2x',
  },
  {
    value: 3,
    label: '3x',
  },
  {
    value: 4,
    label: '4x',
  },
  {
    value: 5,
    label: '5x',
  },
];

export default function InputSlider({
  name, value, onChange, disabled,
}) {
  return (
    <>
      <Header text={name} />
      <Paper sx={{ p: 2 }}>
        <Slider
          disabled={disabled}
          aria-label="Small steps"
          defaultValue={1}
          step={1}
          marks={marks}
          min={1}
          max={5}
          valueLabelDisplay="auto"
          value={value}
          onChange={(e) => onChange(e)}
        />
      </Paper>
    </>
  );
}

InputSlider.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
InputSlider.defaultProps = {
  name: '',
  value: 0,
  onChange: () => {},
  disabled: false,
};
