import React from 'react';

const Home = () => {
  return (
    <div>
      <div> I'm the home component </div>
      <button onClick={() => console.log("[JONGMAN_LOG]  hi", new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1))}>
        Press me!
      </button>
    </div>
  )
};

export default Home;