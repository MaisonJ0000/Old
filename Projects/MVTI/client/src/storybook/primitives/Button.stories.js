import React from 'react';

import Button from '../../components/primitives/Button';

export default {
  component: Button,
  title: 'Button',
};

export const Default = () => (
  <Button
    title="Default"
    className="button button--shape-default"
    Hover="{action('hover')}"
  />
);

export const Outline = () => (
  <Button
    title="Outline"
    className="button button--shape-outline"
    Hover="{action('hover')}"
  />
);
