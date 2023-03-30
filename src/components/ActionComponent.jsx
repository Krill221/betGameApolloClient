import React, { useContext, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { useMutation, useSubscription } from '@apollo/client';
import { AuthContext } from '../helpers/auth';
import InputField from '../elements/InputField';
import InputSlider from '../elements/InputSlider';
import { M_START_ROUND, S_ROUND, S_USERS } from '../gql/shema';

export default function ActionComponent() {
  // console.log('ActionComponent');

  const { user } = useContext(AuthContext);
  const [points, setPoints] = useState(50);
  const [multi, setMulti] = useState(parseFloat(2.5));
  const [speed, setSpeed] = useState(5);

  const [startRound] = useMutation(M_START_ROUND);
  const sub = useSubscription(S_ROUND, { variables: { name: user.name } });
  const status = sub?.data?.round?.status === 'started';

  const { data } = useSubscription(S_USERS);
  const currentUser = data?.users.find((u) => user.name === u.name);
  const totalPoints = Number(currentUser?.points) || 0;
  const hasPoints = totalPoints > 0;

  const handleStart = () => {
    const vars = {
      name: currentUser.name,
      points: String(points),
      multi: String(multi),
      speed: String(speed),
    };
    startRound({ variables: vars });
  };
  const updateMulti = (prev, val) => {
    if (val <= 1) return 1;
    if (val >= 10) return 10;
    return val;
  };
  const updatePoints = (prev, val) => {
    if (val <= 1) return 1;
    if (val >= totalPoints) return totalPoints;
    return val;
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <InputField
          name="points"
          value={points}
          disabled={status}
          onChange={(v) => {
            setPoints((prev) => updatePoints(prev, Math.round(Number(v))));
          }}
          onDown={() => {
            setPoints((prev) => updatePoints(prev, prev - 25));
          }}
          onUp={() => {
            setPoints((prev) => updatePoints(prev, prev + 25));
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <InputField
          name="multiplier"
          value={multi}
          disabled={status}
          onChange={(v) => {
            setMulti((prev) => updateMulti(prev, Number(v)));
          }}
          onDown={() => {
            setMulti((prev) => updateMulti(prev, prev - 0.25));
          }}
          onUp={() => {
            setMulti((prev) => updateMulti(prev, prev + 0.25));
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={() => handleStart()}
          disabled={status || !hasPoints}
          fullWidth
          variant="contained"
        >
          Start
        </Button>
      </Grid>
      <Grid item xs={12}>
        <InputSlider
          disabled={status}
          name="Speed"
          value={speed}
          onChange={(e) => {
            setSpeed(e.target.value);
          }}
        />
      </Grid>
    </Grid>
  );
}
