import React from 'react';
import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Main from '../pages/Main';
import CreateEstablishment from '../pages/CreateEstablishment';

import 'react-toastify/dist/ReactToastify.css';
import Clients from '../pages/Clients';
import Leads from '../pages/Leads';
import ListLeads from '../pages/ListLeads';
import ClientsList from '../pages/ClientsList';

const AppRoutes: React.FC = () => {
  return (
    <>
      <Route path="/" exact component={Main} />
      <Route path="/establishment" exact component={CreateEstablishment} />
      <Route path="/client/:establishment_id" component={Clients} />
      <Route path="/lead/:establishment_id" component={Leads} />
      <Route path="/leads" component={ListLeads} />
      <Route path="/clients" component={ClientsList} />
      <ToastContainer />
    </>
  );
};

export default AppRoutes;
