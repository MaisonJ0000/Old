import React from 'react';
import StyledButton from '../../styles/primitives/ButtonStyle';

const Button = ({
  children, className, themeColor, onClick,
}) => (
  <StyledButton
    className={className}
    themeColor={themeColor}
    onClick={onClick}
  >
    {children}
  </StyledButton>
);

export default React.memo(Button);
