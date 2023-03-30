import React from 'react';
import {
  RankingComponent,
  RankingComponentSkeleton,
} from '../components/RankingComponent';
import AccessLayout from '../layouts/AccessLayout';

export default function Ranking() {
  return (
    <AccessLayout skeleton={<RankingComponentSkeleton />}>
      <RankingComponent />
    </AccessLayout>
  );
}
