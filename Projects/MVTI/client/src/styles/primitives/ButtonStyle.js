import styled from '@emotion/styled';
import ThemeStyle from '../ThemeStyle';

const StyledButton = styled.button(
  (props) => {
    if (props.themeColor) {
      if (props.themeColor === 'primary') {
        return {
          fontSize: '16px',
          color: '#fff',
          background: ThemeStyle.colors.deepSea,
          borderWidth: '2px',
          borderColor: ThemeStyle.colors.deepSea,
          marginTop: '24px',
          ':hover': {
            borderStyle: 'dashed',
            borderColor: ThemeStyle.colors.canary,
          },
        };
      }
      if (props.themeColor === 'secondary') {
        return {
          color: ThemeStyle.colors.robinsEgg,
          borderColor: ThemeStyle.colors.robinsEgg,
          borderWidth: '2px',
          marginTop: '8px',
          ':hover': {
            color: ThemeStyle.colors.deepSea,
            borderColor: ThemeStyle.colors.deepSea,
          },
        };
      }
      return {};
    }
    return {};
  },
);

export default StyledButton;
