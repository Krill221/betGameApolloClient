import React, { useContext, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Grid, TextField, Button, Paper,
} from '@mui/material';
import { AuthContext } from '../helpers/auth';
import { M_POST_MESSAGE } from '../gql/shema';

export default function ChatActionComponent() {
  // console.log('ChatAction');

  const { user } = useContext(AuthContext);
  const [text, setText] = useState('');
  const [postMessage] = useMutation(M_POST_MESSAGE);

  const sendMessage = () => {
    if (!user?.name) return;
    if (text.length === 0) return;
    postMessage({ variables: { name: user.name, text } });
    setText('');
  };

  return (
    <Paper elevation={3} sx={{ p: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <TextField
            onChange={(e) => {
              setText(e.target.value);
            }}
            value={text}
            size="small"
            fullWidth
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={2}>
          <Button onClick={sendMessage} fullWidth variant="contained">
            Send
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
