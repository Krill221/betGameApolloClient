import React from 'react';
import ActionComponent from '../components/ActionComponent';
import RoundTableComponent from '../components/RoundTableComponent';
import LoginComponent from '../components/LoginComponent';
import AccessLayout from '../layouts/AccessLayout';

export default function User() {
  return (
    <AccessLayout skeleton={<LoginComponent />}>
      <ActionComponent />
      <RoundTableComponent />
    </AccessLayout>
  );
}
