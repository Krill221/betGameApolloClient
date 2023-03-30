import React from 'react';
import {
  LineChartComponent,
  LineChartComponentSkeleton,
} from '../components/LineChartComponent';
import AccessLayout from '../layouts/AccessLayout';

export default function Chart() {
  return (
    <AccessLayout skeleton={<LineChartComponentSkeleton />}>
      <LineChartComponent />
    </AccessLayout>
  );
}
