import React, { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import {
  Paper,
  TableCell,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  TableBody,
} from '@mui/material';
import { AuthContext } from '../helpers/auth';
import Header from '../elements/Header';
import { S_ROUND } from '../gql/shema';

export default function RoundTableComponent() {
  // console.log('RoundTableComponent');

  const { user } = useContext(AuthContext);
  const { data } = useSubscription(S_ROUND, { variables: { name: user.name } });
  const round = data?.round;
  const isStatusEnd = round?.status === 'end';
  const bets = round?.bets;

  return (
    <>
      <Header text="Current Round" />
      <TableContainer component={Paper} sx={{ p: 1 }}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Point</TableCell>
              <TableCell align="right">Multiplier</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bets
              && bets.map((bet) => (
                <TableRow
                  key={bet.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {user.name === bet.name ? 'You' : bet.name}
                  </TableCell>
                  <TableCell align="right">{bet.score}</TableCell>
                  <TableCell align="right">
                    {bet.multi}
                    {' '}
                    {bet.win && isStatusEnd ? '(win)' : ''}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
