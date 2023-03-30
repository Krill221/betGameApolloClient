import React from 'react';
import { Paper, Skeleton } from '@mui/material';
import MessageListComponent from './MessageListComponent';
import ChatActionComponent from './ChatActionComponent';
import Header from '../elements/Header';

export function ChatComponent() {
  // console.log('ChatComponent');

  return (
    <>
      <Header text="Chat" />
      <Paper sx={{ p: 1 }}>
        <MessageListComponent />
        <ChatActionComponent />
      </Paper>
    </>
  );
}

export function ChatComponentSkeleton() {
  return (
    <>
      <Header text="Chat" />
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
