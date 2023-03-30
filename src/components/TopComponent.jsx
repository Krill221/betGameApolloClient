import React, { useContext } from 'react';
import { useSubscription } from '@apollo/client';
import { Paper, Grid } from '@mui/material';
import { AuthContext } from '../helpers/auth';
import LogoutComponent from './LogoutComponent';
import TopPaper, { TopPaperSkeleton } from '../elements/TopPaper';
import AccessLayout from '../layouts/AccessLayout';
import { S_USERS } from '../gql/shema';

export function TopComponent() {
  // console.log('TopComponent');

  const context = useContext(AuthContext);
  const { data } = useSubscription(S_USERS);
  const user = data?.users.find((u) => context?.user?.name === u.name);

  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <AccessLayout skeleton={<TopPaperSkeleton />}>
          <TopPaper name={user?.points} />
        </AccessLayout>
      </Grid>
      <Grid item xs={4}>
        <AccessLayout skeleton={<TopPaperSkeleton />}>
          <TopPaper name={user?.name} />
        </AccessLayout>
      </Grid>
      <Grid item xs={4}>
        <AccessLayout skeleton={<TopPaperSkeleton />}>
          <Paper sx={{ p: 1 }}>
            <LogoutComponent />
          </Paper>
        </AccessLayout>
      </Grid>
    </Grid>
  );
}

export function TopComponentSkeleton() {
  return (
    <Grid container spacing={4}>
      <Grid item xs={4}>
        <TopPaperSkeleton />
      </Grid>
      <Grid item xs={4}>
        <TopPaperSkeleton />
      </Grid>
      <Grid item xs={4}>
        <TopPaperSkeleton />
      </Grid>
    </Grid>
  );
}
