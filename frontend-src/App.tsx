import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './src/pages/LoginPage';
import ChannelPage from './src/pages/ChannelPage';
import DmPage from './src/pages/DmPage';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/channels" element={<ChannelPage />} />
      <Route path="/dm/:userId" element={<DmPage />} />
    </Routes>
  );
};

export default App;
