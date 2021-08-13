import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import TopMenuNav from './TopMenuNav';
import TopMenuUtil from './TopMenuUtil';

export default function TopMenu({ className, me }) {
  const match = useRouteMatch('/login');

  if (match) return '';
  return (
    <div className={className}>
      <TopMenuNav className="menu__list menu-nav" />
      <TopMenuUtil className="menu__list menu-util" me={me} />
    </div>
  );
}
