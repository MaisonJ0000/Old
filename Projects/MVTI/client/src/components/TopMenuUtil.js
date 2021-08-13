import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import { GoogleLogout } from 'react-google-login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandshake } from '@fortawesome/free-regular-svg-icons';
import { jsx } from '@emotion/core'; /** @jsx jsx */
import { Alert } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import _ from 'lodash';
import InputSearch from './primitives/InputSearch';
import { logout } from '../redux/modules/user';
import config from '../../.config';
import TopMenuUtilStyle from '../styles/TopMenuUtilStyle';

export default function TopMenuUtil({ className, me }) {
  const [opensNewFriendRequest, setOpensNewFriendRequest] = useState(false);

  const dispatch = useDispatch();

  const friendRequestAddedMap = useSelector((store) => store.friend.get('friendRequestAdded'));

  useEffect(() => {
    const friendRequestAdded = friendRequestAddedMap.toJS();
    if (!_.isEmpty(friendRequestAdded)) {
      setOpensNewFriendRequest(true);
    }
  }, [friendRequestAddedMap]);

  const handleLogout = () => {
    Cookies.remove('user_email');
    Cookies.remove('token');

    try {
      dispatch(logout());
      window.location.replace('/login');
    } catch (e) {
      console.error(e);
    }
  };

  const onResetNewFriendRequest = () => {
    setOpensNewFriendRequest(false);
  };

  return (
    <div>
      <ul className={className} css={TopMenuUtilStyle}>
        <li className={`friend-request${(!_.isEmpty(friendRequestAddedMap.toJS())) ? ' active' : ''}`}>
          <FontAwesomeIcon icon={faHandshake} />
        </li>
        <li>
          <InputSearch />
        </li>
        <li>
          {!me.isLogged ? <Link to="/login">Login</Link>
            : (
              <div>
                <GoogleLogout
                  clientId={config.auth.clientId}
                  onLogoutSuccess={handleLogout}
                >
                  <img
                    src={me.googleProfileObj.imageUrl}
                    alt=""
                    style={{ width: '20px' }}
                  />
                  <span> Logout </span>
                </GoogleLogout>
                <button type="button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
      <Snackbar
        open={opensNewFriendRequest}
        autoHideDuration={6000}
        onClose={onResetNewFriendRequest}
      >
        <Alert onClose={onResetNewFriendRequest} severity="success">
          {`${_.get(friendRequestAddedMap.toJS(), 'requestUser.name')
            ? friendRequestAddedMap.toJS().requestUser.name
            : '알 수 없음'}
            님이 친구신청을 하였습니다.`}
        </Alert>
      </Snackbar>
    </div>
  );
}
