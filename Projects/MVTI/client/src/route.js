import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Cookies from 'js-cookie';
import { fetchUsers } from './redux/modules/user';
import { subscribeFriendRequestToMe } from './redux/modules/friend';

import Home from './components/Home';
import LoginSection from './components/sections/LoginSection';
import UserSection from './components/sections/UsersSection';
import SignUpSection from './components/sections/SignUpSection';
import Calendar from './components/Calendar';
import TopMenu from './components/TopMenu';
import TmpSection from './components/sections/TmpSection';

const cookie = Cookies.get();
const me = {
  email: cookie.user_email,
  token: cookie.token,
  isLogged: !!cookie.token,
  googleProfileObj: JSON.parse(cookie.googleProfileObj || '{}'),
};

const route = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(subscribeFriendRequestToMe());
  }, []);

  return (
    <BrowserRouter>
      <TopMenu className="menu" me={me} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginSection} />
        <Route path="/signup" component={SignUpSection} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/user" component={UserSection} />
        <Route path="/tmp" component={TmpSection} />
      </Switch>
    </BrowserRouter>
  );
};

export { route as default };
