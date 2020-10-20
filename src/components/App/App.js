import React, { Component } from 'react';
import NavMenu from '../NavMenu/NavMenu';
import PrivatComponent from '../PrivatComponent/PrivatBankComponent';

// import s from './App.module.scss';

class App extends Component {
  state = {};

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {}

  render() {
    return (
      <div className="main-wrapper">
        <aside className="main-aside">
          <div className="company-block">
            <img
              className="logo"
              src="http://eferretti.com/files/geoportal/admin/e6361e70-fb2c-11e9-acb9-87ef29151474.svg"
              alt="logo"
            />
            <h2 className="company-name">Emanuela Ferretti</h2>
          </div>
          <NavMenu />
        </aside>
        <main className="main-content">
          <header className="header-line-tabs">
            <ul className="line-list-tabs">
              <li className="tab active">
                Главная
                <button className="btn tab-btn" type="button">
                  <span className="visually-hidden">close button</span>
                </button>
              </li>
              <li className="tab">
                Еще другая таба
                <button className="btn tab-btn" type="button">
                  <span className="visually-hidden">close button</span>
                </button>
              </li>
            </ul>
          </header>
          <PrivatComponent />
        </main>
      </div>
    );
  }
}

export default App;
