import ThemeStyle from '../ThemeStyle';
import { ButtonStyle } from '../CommonStyle';

const KeyVisualStyle = {
  textAlign: 'center',
  padding: '96px 0 108px',
  boxSizing: 'border-box',
  background: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAALklEQVQYV2NMqL7tu6BVdTMDGgCJM4LE0BXA+GBJZAXICuGS2EwgrBOnnfhcCwDnezAOCec6CQAAAABJRU5ErkJggg==) repeat',
  h2: {
    fontFamily: 'Montserrat, Noto Sans KR, sans-serif',
    fontSize: '80px',
    color: ThemeStyle.colors.robinsEgg,
    lineHeight: '1.2',
    span: {
      color: ThemeStyle.colors.watermelon,
    },
    b: {
      display: 'block',
      fontSize: '30px',
      color: '#333',
      letterSpacing: '-1px',
    },
  },
  button: {
    ...ButtonStyle,
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
  },
};

export { KeyVisualStyle as default };
