import React from 'react';

import PrivatBankComponent from '../../components/PrivatBankComponent/PrivatBankComponent';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AsideComponent from '../../components/AsideComponent/AsideComponent';
import MainComponent from '../../components/MainComponent/MainComponent';
import Layout from '../../components/Layout/Layout';

export default function RootPage() {
  return (
    <Layout>
      <AsideComponent />
      <div className="headerMainWrapper">
        <HeaderComponent />
        <MainComponent />
      </div>
      <PrivatBankComponent />
    </Layout>
  );
}
