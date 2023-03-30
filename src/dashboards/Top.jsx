import React from 'react';
import { TopComponent, TopComponentSkeleton } from '../components/TopComponent';
import AccessLayout from '../layouts/AccessLayout';

export default function Top() {
  return (
    <AccessLayout skeleton={<TopComponentSkeleton />}>
      <TopComponent />
    </AccessLayout>
  );
}
