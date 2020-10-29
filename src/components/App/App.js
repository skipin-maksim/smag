import React from 'react';
// import { Beforeunload } from 'react-beforeunload';

import PrivatBankComponent from '../PrivatBankComponent/PrivatBankComponent';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import AsideComponent from '../AsideComponent/AsideComponent';
import Layout from '../Layout/Layout';
import MainComponent from '../MainComponent/MainComponent';

//TODO нужно сделать Redirect на "/" при обновлении страницы
const App = () => {
  return (
    // <Beforeunload onBeforeunload={() => "You'll lose your data!"}>
    <Layout>
      <AsideComponent />
      <div className="headerMainWrapper">
        <HeaderComponent />
        <MainComponent />
      </div>
      <PrivatBankComponent />
    </Layout>
    // </Beforeunload>
  );
};

export default App;
