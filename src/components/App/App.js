import React from 'react';
import { connect } from 'react-redux';
// import { Beforeunload } from 'react-beforeunload';

import { ordersOperations } from '../../redux/orders/';
import { contactsOperations } from '../../redux/contacts';
import { numOrderOperations } from '../../redux/numOrder';

import PrivatBankComponent from '../PrivatBankComponent/PrivatBankComponent';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import AsideComponent from '../AsideComponent/AsideComponent';
import Layout from '../Layout/Layout';
import MainComponent from '../MainComponent/MainComponent';

class App extends React.Component {
  componentDidMount() {
    this.props.allOrders();
    this.props.allContacts();
    this.props.getCurrentNumOrder();
  }

  render() {
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
  }
}

const mDTP = {
  allContacts: contactsOperations.getContacts,
  allOrders: ordersOperations.getAllOrders,
  getCurrentNumOrder: numOrderOperations.getCurrentNumOrder,
};

export default connect(null, mDTP)(App);
