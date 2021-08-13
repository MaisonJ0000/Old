import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import Cookies from 'js-cookie';
import config from '../../../.config';

import { login } from '../../redux/modules/user';

const LoginSection = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const me = useSelector((store) => store.user.get('me') && store.user.get('me').toJS());

  useEffect(() => {
    if (me.isLogged) {
      window.location.replace('/');
    }
  });

  const handleSubmit = () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const opts = { email, password };

    dispatch(login(opts));
  };

  const handleSuccessLogin = (res) => {
    const { accessToken, tokenId, profileObj } = res;
    Cookies.set('googleProfileObj', profileObj, { expires: 7 });
    Cookies.set('googleAccessToken', accessToken, { expires: 7 });
    Cookies.set('googleTokenId', tokenId, { expires: 7 });

    const opts = {
      name: profileObj.name,
      email: profileObj.email,
      isSuccessGoogleLogin: true,
    };
    dispatch(login(opts));
  };

  const handleFailureLogin = (res) => {
    console.error(res);
  };

  return (
    <div className="login-section--wrapper">
      <div className="auth-form">
        <label>
          Email
          <input
            type="text"
            className="input-block"
            ref={emailRef}
          />
        </label>
        <label>
          Password
          <input
            type="text"
            className="input-block"
            ref={passwordRef}
          />
        </label>
        <button type="button" onClick={handleSubmit}> login</button>
        <GoogleLogin
          className="login-section__google-login"
          clientId={config.auth.clientId}
          // scope="" calendar 나중에 추가
          onSuccess={handleSuccessLogin}
          onFailure={handleFailureLogin}
        >
          <span>Google 로그인</span>
        </GoogleLogin>
      </div>
    </div>
  );
};

export default React.memo(LoginSection);
