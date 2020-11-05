import React from 'react';
import { connect } from 'react-redux';
// import { Beforeunload } from 'react-beforeunload';

import { ordersOperations } from '../../redux/orders/';

// import PrivatBankComponent from '../PrivatBankComponent/PrivatBankComponent';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import AsideComponent from '../AsideComponent/AsideComponent';
import Layout from '../Layout/Layout';
import MainComponent from '../MainComponent/MainComponent';

//TODO нужно сделать Redirect на "/" при обновлении страницы
class App extends React.Component {
  componentDidMount() {
    this.props.getCerrentNumOrder();
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
        {/* <PrivatBankComponent /> */}
      </Layout>
      // </Beforeunload>
    );
  }
}

const mDTP = {
  getCerrentNumOrder: ordersOperations.getCurrentNumOrder,
};

export default connect(null, mDTP)(App);
