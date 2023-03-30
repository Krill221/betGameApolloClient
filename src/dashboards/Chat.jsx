import React from 'react';
import {
  ChatComponent,
  ChatComponentSkeleton,
} from '../components/ChatComponent';
import AccessLayout from '../layouts/AccessLayout';

export default function Chat() {
  return (
    <AccessLayout skeleton={<ChatComponentSkeleton />}>
      <ChatComponent />
    </AccessLayout>
  );
}
