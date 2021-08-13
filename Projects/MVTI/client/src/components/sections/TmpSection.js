import React from 'react';
import axios from 'axios';
import Button from '../primitives/Button';
import authLib from '../../lib/auth';

const TmpSection = () => {
  const users = [];
  const handleRequestFriend = async () => {
    const token = await authLib.getToken();
    const url = 'https://mvti.herokuapp.com/';
    const payload = {
      query: 'mutation{requestFriend(friend: {id: 1}) {id}}',
    };
    const config = {
      method: 'post',
      url,
      data: payload,
      headers: {
        authorization: token ? `Bearer ${token}` : '',
      },
    };
    const res = await axios(config);
    console.log('[JONGMAN_LOG] res', res, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  };
  const handleFetchUsers = async () => {
    const url = 'https://mvti.herokuapp.com/';
    const payload = {
      query: '{users {id name email}}',
    };
    const res = await axios.post(url, payload);
    console.log('[JONGMAN_LOG] res', res, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  };
  return (
    <div>
      <Button
        className="col__6"
        themeColor="secondary"
        onClick={handleRequestFriend}
      >
        친구 신청
      </Button>
      <Button
        className="col__6"
        themeColor="secondary"
        onClick={handleFetchUsers}
      >
        유저 목록
      </Button>
    </div>
  );
};

export default TmpSection;
