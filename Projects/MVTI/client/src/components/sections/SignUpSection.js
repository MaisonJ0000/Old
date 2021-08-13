import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import SignUpSectionStyle from '../../styles/sections/SignUpSectionStyle';
import { signUp } from '../../redux/modules/user';

const SignUpSection = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const dispatch = useDispatch();
  const newUser = useSelector((store) => store.user.get('newUser') && store.user.get('newUser').toJS());

  useEffect(() => {
    if (newUser) {
      alert(`${newUser.name} 이 생성되었습니다.`);
      window.location.replace('/login');
    }
  });

  const handleSubmit = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const opts = { name, email, password };

    dispatch(signUp(opts));
  };

  return (
    <div className="login-section--wrapper" css={SignUpSectionStyle}>
      <div className="auth-form">
        <label>
          Name
          <input
            type="text"
            className="input-block"
            ref={nameRef}
          />
        </label>
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
        <button type="button" onClick={handleSubmit}> Submit</button>
      </div>
    </div>
  );
};

export default React.memo(SignUpSection);
