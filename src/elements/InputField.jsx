import React from 'react';
import PropTypes from 'prop-types';
import {
  Typography,
  ButtonGroup,
  Button,
  TextField,
  Paper,
} from '@mui/material';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function InputField({
  name,
  value,
  onChange,
  onUp,
  onDown,
  disabled,
}) {
  return (
    <Paper sx={{ p: 1 }}>
      <Typography align="center" variant="caption" display="block" gutterBottom>
        {name}
      </Typography>
      <ButtonGroup size="small">
        <Button disabled={disabled} onClick={() => onDown()} size="small">
          <ArrowDropDownIcon />
        </Button>
        <TextField
          disabled={disabled}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          size="small"
        />
        <Button disabled={disabled} onClick={() => onUp()} size="small">
          <ArrowDropUpIcon />
        </Button>
      </ButtonGroup>
    </Paper>
  );
}

InputField.propTypes = {
  name: PropTypes.string,
  value: PropTypes.number,
  onChange: PropTypes.func,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
  disabled: PropTypes.bool,
};
InputField.defaultProps = {
  name: '',
  value: 1,
  onChange: () => {},
  onUp: () => {},
  onDown: () => {},
  disabled: false,
};
