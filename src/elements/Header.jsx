import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';

export default function Header({ text }) {
  return (
    <Typography variant="subtitle1" gutterBottom>
      {text}
    </Typography>
  );
}

Header.propTypes = {
  text: PropTypes.string,
};
Header.defaultProps = {
  text: '',
};
