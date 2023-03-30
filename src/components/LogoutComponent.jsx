import React, { useContext } from 'react';
import { Button } from '@mui/material';
import { AuthContext } from '../helpers/auth';

export default function LogoutComponent() {
  const { logout } = useContext(AuthContext);
  return (
    <Button onClick={() => logout()} size="small" fullWidth variant="contained">
      Logout
    </Button>
  );
}
