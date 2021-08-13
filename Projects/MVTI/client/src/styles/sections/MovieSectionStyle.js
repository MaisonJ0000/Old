import ThemeStyle from '../ThemeStyle';
import { ButtonStyle } from '../CommonStyle';

const MovieSectionStyle = {
  textAlign: 'center',
  button: {
    color: ThemeStyle.colors.robinsEgg,
    borderColor: ThemeStyle.colors.robinsEgg,
    borderWidth: '2px',
    marginTop: '8px',
    ':hover': {
      color: ThemeStyle.colors.deepSea,
      borderColor: ThemeStyle.colors.deepSea,
    },
    ...ButtonStyle,
  },
};

export { MovieSectionStyle as default };
