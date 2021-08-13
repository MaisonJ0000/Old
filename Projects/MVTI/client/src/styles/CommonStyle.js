const CommonStyle = {
  verticalAlign: {
    display: 'flex',
    alignItems: 'center',
  },
  inherit: {
    color: 'inherit',
    textDecoration: 'inherit',
  },
};

const ButtonStyle = {
  display: 'inline-block',
  fontSize: '14px',
  padding: '8px 48px',
  borderRadius: '4px',
  '&:hover': {
    transition: 'all .2s ease-out',
  },
};

export { CommonStyle as default, ButtonStyle };
