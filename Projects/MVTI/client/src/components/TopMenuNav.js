import React from 'react';
import { NavLink } from 'react-router-dom';

export default function TopMenuNav({ className }) {
  return (
    <ul className={className}>
      <li>
        <NavLink to="/calendar" activeClassName="active">
          Calendar
        </NavLink>
      </li>
      <li>
        <NavLink to="/club" activeClassName="active">
          Club
        </NavLink>
      </li>
      <li>
        <NavLink to="/data" activeClassName="active">
          Data
        </NavLink>
      </li>
      <li>
        <NavLink to="/tmp" activeClassName="active">
          Tmp
        </NavLink>
      </li>
    </ul>
  );
}
