import React from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core';
import KeyVisualStyle from '../../styles/primitives/KeyVisualStyle';

const KeyVisualSection = () => (
  <div className="kv__section--wrapper" css={KeyVisualStyle}>
    <h2 className="title--main">
      <span>MV</span>
      TI
      <b>나의 영화 유형</b>
    </h2>
    <button type="button">TEST my MVTI</button>
  </div>
);

export { KeyVisualSection as default };
