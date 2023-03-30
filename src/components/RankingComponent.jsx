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
  Skeleton,
} from '@mui/material';
import { AuthContext } from '../helpers/auth';
import Header from '../elements/Header';
import { S_USERS } from '../gql/shema';

export function RankingComponent() {
  // console.log('RankingComponent');

  const context = useContext(AuthContext);
  const { data } = useSubscription(S_USERS);
  const users = data?.users;
  users?.sort((a, b) => Number(b.points) - Number(a.points));

  return (
    <>
      <Header text="Ranking" />
      <Paper sx={{ p: 1 }}>
        <TableContainer>
          <Table size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>No</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((u, index) => (
                <TableRow
                  key={u.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {' '}
                    {index}
                  </TableCell>
                  <TableCell align="right">
                    {context?.user?.name === u.name ? 'You' : u.name}
                  </TableCell>
                  <TableCell align="right">{u.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

export function RankingComponentSkeleton() {
  return (
    <>
      <Header text="Ranking" />
      <Paper sx={{ p: 1 }}>
        <Skeleton animation={false} />
        <Skeleton animation={false} />
        <Skeleton animation={false} />
        <Skeleton animation={false} />
        <Skeleton animation={false} />
        <Skeleton animation={false} />
        <Skeleton animation={false} />
        <Skeleton animation={false} />
        <Skeleton animation={false} />
      </Paper>
    </>
  );
}
