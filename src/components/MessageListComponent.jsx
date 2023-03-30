import React, { useContext, useEffect, useRef } from 'react';
import { List, ListItem, ListItemText } from '@mui/material';
import { useSubscription } from '@apollo/client';
import { S_MESSAGES } from '../gql/shema';
import { AuthContext } from '../helpers/auth';

export default function MessageListComponent() {
  const context = useContext(AuthContext);
  const { data } = useSubscription(S_MESSAGES);
  const messagesEndRef = useRef();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <List dense sx={{ height: 150, maxHeight: 150, overflow: 'auto' }}>
      {data?.messages?.map(({ id, name, text }) => (
        <ListItem key={id}>
          <ListItemText
            primary={`${context?.user?.name === name ? 'You' : name}: ${text}`}
          />
        </ListItem>
      ))}
      <div style={{ float: 'left', clear: 'both' }} ref={messagesEndRef} />
    </List>
  );
}
