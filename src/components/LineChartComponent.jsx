import React, { useContext } from 'react';
import { Paper } from '@mui/material';
import { useMutation, useSubscription } from '@apollo/client';
import {
  LineChartPathD3,
  LineChartPathSkeletonD3,
} from '../elements/LineChartPathD3';
import { AuthContext } from '../helpers/auth';
import { M_END_ROUND, S_ROUND } from '../gql/shema';

export function LineChartComponent() {
  // console.log('LineChartComponent');

  const { user } = useContext(AuthContext);
  const sub = useSubscription(S_ROUND, { variables: { name: user.name } });
  const [endRound] = useMutation(M_END_ROUND);
  const target = Number(sub?.data?.round?.top) || 0;
  const speed = Number(sub?.data?.round?.speed);
  const status = sub?.data?.round?.status;

  function handleEnd() {
    if (status === 'started') {
      // console.log('handleEnd');
      endRound({ variables: { name: user.name } });
    }
  }

  return (
    <Paper sx={{ p: 1, overflow: 'hidden' }} align="center">
      <LineChartPathD3
        key={target + status}
        status={status}
        target={target}
        speed={speed}
        width={600}
        height={300}
        onEnd={() => handleEnd()}
      />
    </Paper>
  );
}

export function LineChartComponentSkeleton() {
  return (
    <Paper sx={{ p: 1, overflow: 'hidden' }} align="center">
      <LineChartPathSkeletonD3 w={600} h={300} />
    </Paper>
  );
}
