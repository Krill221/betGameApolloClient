import React, { useContext, useState } from 'react';
import {
  TextField, Button, Grid, Typography, Box,
} from '@mui/material';
import { useMutation } from '@apollo/client';
import { AuthContext } from '../helpers/auth';
import { M_LOGIN } from '../gql/shema';

export default function LoginComponent() {
  const [name, setName] = useState('Vasa');

  const { login } = useContext(AuthContext);
  const [getUser] = useMutation(M_LOGIN, {
    update(_, { data }) {
      login(data.login);
    },
  });

  const handleSubmit = () => {
    if (name.length === 0) return;
    getUser({ variables: { name } });
  };

  return (
    <Box sx={{ p: 1 }} height={400}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography align="center" variant="h4" gutterBottom>
            Welcome
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            align="center"
            variant="caption"
            display="block"
            gutterBottom
          >
            Please enter your name
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={() => handleSubmit()} fullWidth variant="contained">
            Login
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
