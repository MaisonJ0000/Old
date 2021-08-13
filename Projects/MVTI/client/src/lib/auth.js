import Cookies from 'js-cookie';

const getToken = () => Cookies.get('token');

const authLib = {
  getToken,
};

export default authLib;
