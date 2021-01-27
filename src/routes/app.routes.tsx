import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from '../pages/Main';
import CreateEstablishment from '../pages/CreateEstablishment';

import 'react-toastify/dist/ReactToastify.css';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={Main} />
      <Route path="/establishment" exact component={CreateEstablishment} />
      <ToastContainer />
    </>
  );
};

export default AppRoutes;
