import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Paper, Box } from '@mui/material';

export default function TopPaper({ name }) {
  return (
    <Paper sx={{ p: 1 }}>
      <Typography align="center" variant="overline" display="block">
        {name}
      </Typography>
    </Paper>
  );
}

export function TopPaperSkeleton() {
  return (
    <Paper sx={{ p: 1 }}>
      <Box variant="overline" sx={{ p: 2 }} />
    </Paper>
  );
}
TopPaper.propTypes = {
  name: PropTypes.string,
};
TopPaper.defaultProps = {
  name: '',
};
