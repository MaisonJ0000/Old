import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import TopMenu from '../components/TopMenu';

export default {
  component: TopMenu,
  title: 'TopMenu',
};

export const Default = () => (
  <MemoryRouter>
    <TopMenu className="menu" Hover="{action('hover')}" />
  </MemoryRouter>
);
