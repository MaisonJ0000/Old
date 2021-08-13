import ThemeStyle from '../ThemeStyle';
import CommonStyle from '../CommonStyle';

const SignUpSectionStyle = {
  backgroundColor: ThemeStyle.colors.robinsEgg,
  color: ThemeStyle.colors.deepSea,
  width: '400px',
  margin: '0 auto',
  marginTop: '200px',
  ...CommonStyle.verticalAlign,
  '& > .auth-form': {
    display: 'flex',
    flexDirection: 'column',
    label: {
      color: 'black',
    },
  },
};

export { SignUpSectionStyle as default };
