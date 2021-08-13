const NavSectionStyle = {
  backgroundColor: ThemeStyle.colors.deepSea,
  color: ThemeStyle.colors.robinsEgg,
  display: 'flex',
  height: '40px',
  '& > .data-area': {
    flexGrow: 5,
    display: 'flex',
    alignItem: 'center',
    '.test-item': {
      flex: '0 1 100px',
      ...CommonStyle.verticalAlign,
    },
  },
  '& > .login-area': {
    flexGrow: 1,
    display: 'flex',
    alignItem: 'center',
    justifyContent: 'flex-end',
    '.login-area__login': {
      flex: '0 1 100px',
      ...CommonStyle.verticalAlign,
    },
    '.login-area__signup': {
      flex: '0 1 100px',
      ...CommonStyle.verticalAlign,
    },
  },
};
